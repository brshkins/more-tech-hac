# !pip -q install sentence-transformers rank-bm25 rapidfuzz pdfminer.six sklearn numpy

import json, re, math
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer
from rank_bm25 import BM25Okapi
from rapidfuzz import fuzz, process
from pdfminer.high_level import extract_text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler

RUS = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
ENG = "abcdefghijklmnopqrstuvwxyz"
DIG = "0123456789"

def normalize(s: str) -> str:
    s = s.lower()
    s = re.sub(r"\s+", " ", s)
    s = re.sub(rf"[^ {RUS}{ENG}{DIG}\-+#_/\.]", " ", s)
    return s.strip()

SKILL_CANON = {
    "python","r","java","kotlin","javascript","typescript","go","rust","c","c++","c#","sql","bash",
    "react","redux","redux-saga","react query","next.js","vite","webpack","zustand","mobx","antd","material ui","tailwind css","chart.js","d3",
    "android","ios","swift","react native","flutter",
    "node.js","django","flask","fastapi","spring","grpc","rest","graphql",
    "docker","docker-compose","kubernetes","nginx","gitlab ci","github actions","ci/cd",
    "pandas","numpy","scikit-learn","pytorch","tensorflow","xgboost","airflow","spark",
    "геномика","биоинформатика","rna-seq","dna-seq","single-cell","aligners","gatk","samtools","plink",
    "аналитика данных","etl","sql","bi","tableau","power bi",
}

SKILL_CANON_NORM = sorted({normalize(x) for x in SKILL_CANON})

def extract_skills(text: str, extra_tokens=None):
    text_n = normalize(text)
    tokens = set(re.split(r"[,\s/|]+", text_n))
    raw = set()
    for t in tokens:
        if not t or len(t) < 2: 
            continue
        if t in SKILL_CANON_NORM:
            raw.add(t)
    candidates = set()
    toks = [t for t in tokens if t]
    phrases = set()
    for n in (2,3):
        for i in range(max(0,len(toks)-n+1)):
            phrases.add(" ".join(toks[i:i+n]))
    phrases |= tokens
    for p in phrases:
        match, score, _ = process.extractOne(p, SKILL_CANON_NORM, scorer=fuzz.token_set_ratio)
        if score >= 88:
            candidates.add(match)
    return sorted(raw | candidates)

def job_doc(v):
    parts = []
    push = parts.append
    push(("title: " + v.get("post","")) * 3)
    push(("tags: " + " ".join(v.get("tags",[]))) * 3)
    req = " ".join(v.get("requirements",{}).get("description",[]))
    resp = " ".join(v.get("responsibilities",{}).get("description",[]))
    push(("requirements: " + req) * 2)
    push(("responsibilities: " + resp) * 2)
    push("industry: " + v.get("company",{}).get("industry",""))
    push("region: " + v.get("region",""))
    push("company: " + v.get("company",{}).get("name",""))
    push("salary: " + v.get("salary",""))
    return normalize(" \n".join(parts))

EMB_MODEL_NAME = "intfloat/multilingual-e5-base"
embedder = SentenceTransformer(EMB_MODEL_NAME, device="cpu")

def emb_query(text: str):
    return embedder.encode(f"query: {text}", normalize_embeddings=True, show_progress_bar=False)

def emb_passage(text: str):
    return embedder.encode(f"passage: {text}", normalize_embeddings=True, show_progress_bar=False)

def jaccard(a:set,b:set):
    if not a and not b: return 0.0
    return len(a&b)/max(1,len(a|b))

LEVEL_MAP = {
    "junior": 0, "младший": 0, "стажер": 0, "интерн": 0,
    "middle": 1, "мидл": 1, "средний": 1,
    "senior": 2, "сеньор": 2, "ведущий": 2, "lead": 2, "тимлид": 2,
}

def infer_level(text: str):
    t = normalize(text)
    best = None
    for k, val in LEVEL_MAP.items():
        if re.search(rf"\b{k}\b", t):
            best = max(best, val) if best is not None else val
    return best

def level_score(resume_text, job_text):
    r = infer_level(resume_text)
    j = infer_level(job_text)
    if j is None or r is None:
        return 0.5
    return 1.0 if r==j else (0.7 if abs(r-j)==1 else 0.3)

def region_score(resume_text, job_region):
    t = normalize(resume_text)
    willing = any(w in t for w in ["готов переезду","готов к переезду","готов командировкам","готов к командировкам","relocate","переезд"])
    if not job_region: 
        return 0.5
    if job_region and willing:
        return 0.8
    if job_region.lower() in t:
        return 1.0
    return 0.5


vacancy = json.load(open('/kaggle/input/vacancies/vacancy.json', 'r', encoding='utf-8'))

job_text = job_doc(vacancy)
if not job_text.strip():
    bm_norm = 0.0
else:
    bm25 = BM25Okapi([job_text.split()])
    bm25_score = bm25.get_scores(resume_text.split())[0]
    self_score = bm25.get_scores(job_text.split())[0] or 1e-9
    bm_norm = min(max(bm25_score / self_score, 0.0), 1.0)

resume_pdf_path = '/kaggle/input/vacancies/_Python_____25_07_2025_10_09.pdf'
resume_text_raw = extract_text(resume_pdf_path) or ""
resume_text = normalize(resume_text_raw)

resume_emb = emb_query(resume_text)
resume_skills = set(extract_skills(resume_text))

job_emb = emb_passage(job_text)
job_skill = set(extract_skills(" ".join([
    vacancy.get("post",""),
    " ".join(vacancy.get("tags",[])),
    " ".join(vacancy.get("requirements",{}).get("description",[])),
    " ".join(vacancy.get("responsibilities",{}).get("description",[])),
])))

job_title = normalize(vacancy.get("post",""))

ROLE_TERMS = ["frontend","front-end","фронтенд","backend","бекенд","full-stack","фулстек","биоинформатика","data","ml","ios","android","devops"]
resume_role = " ".join([t for t in ROLE_TERMS if t in resume_text])

vec = TfidfVectorizer(min_df=1, max_df=0.9, ngram_range=(1,2))
X = vec.fit_transform([resume_role, job_title])
tfidf_resume = X[0]
tfidf_job = X[1]
title_sim = (tfidf_job @ tfidf_resume.T).toarray().ravel()[0]

def cos(u,v): 
    return float(np.dot(u,v))

emb_sim = cos(resume_emb, job_emb)
emb_norm = emb_sim

skill_sim = jaccard(resume_skills, job_skill)
level_sim = level_score(resume_text, job_text)
region_sim = region_score(resume_text, vacancy.get("region",""))

W_EMB   = 0.50
W_SKILL = 0.25
W_BM25  = 0.10
W_TITLE = 0.08
W_LEVEL = 0.04
W_REGION= 0.03

final_score = (
    W_EMB   * emb_norm +
    W_SKILL * skill_sim +
    W_BM25  * bm_norm +
    W_TITLE * title_sim +
    W_LEVEL * level_sim +
    W_REGION* region_sim
)

def pretty_pct(x): 
    return f"{100*x:.1f}%"

print("Вакансия (энсамбль сигналов):")
v = vacancy
id = v['id']
print(f"{v['company']['name']} — {v['post']} [{v.get('region','')}]  | score={final_score:.3f}")
print(f"   • emb={pretty_pct(emb_norm)} | skills={pretty_pct(skill_sim)} | bm25={pretty_pct(bm_norm)} | title={pretty_pct(title_sim)} | level={pretty_pct(level_sim)} | region={pretty_pct(region_sim)}")
if final_score > 0.56:
    print('Вы допущены дальше на устный собес')
else:
    print('Удачи!')