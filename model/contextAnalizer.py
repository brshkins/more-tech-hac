from langchain.vectorstores import FAISS
from langchain.embeddings.base import Embeddings
import requests
from typing import List
from tenacity import retry, stop_after_attempt, wait_random_exponential

class MTS_Embeddings(Embeddings):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/embeddings"
        
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return [self._get_embedding(text) for text in texts]
    
    def embed_query(self, text: str) -> List[float]:
        return self._get_embedding(text)
        
    @retry(wait=wait_random_exponential(min=20, max=50), stop=stop_after_attempt(200))
    def _get_embedding(self, text: str) -> List[float]:
        headers = {'Authorization': f'Bearer {self.api_key}'}
        data = {
                "model": "bge-m3",
                "input": text
            }
        try:
            response = requests.post(self.api_url, json=data, headers=headers)
            return response.json()['data'][0]['embedding']    
        except Exception as e:
            print(f'{e}: embedding error')
            return e
        
class IntentClassifier:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def intent_classifier(self, user_input: str):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        system_prompt = f"""Ты эксперт в области анализа данных. 
Твоя задача внимательно проанализировать запрос пользователя и определить его смысловую нагрузку(намерение)
Не отвечай на сам вопрос.
Итоговый ответ должен быть на английском языке.
Итоговый ответ должен состоять из ОДНОГО слова ИЗ ЭТОГО СПИСКА (billing | technical | complaint)"""
        user_prompt = f"Запрос пользователя: {user_input}"
        data = {
            "model": 'deepseek-r1-distill-qwen-32b',
            "messages" : [
                {"role" : "system", "content" : system_prompt},
                {"role" : "user", "content": user_prompt}
            ],
            "temperature": 0.0,
            "n": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
        }
                
        try:
            response = requests.post(self.api_url, headers=headers, json=data)
            text = response.json()['choices'][0]['message']['content']
            think_end = text.index('</think>')
            start = think_end + len('</think>')
            return text[start:].strip()
        except Exception as e:
            print(e)
            return e


class Alignmnet:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def alignment_classifier(self, question):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        system_prompt = f"""Ты эксперт в области инженерии данных.
Твоя задача внимательно проанализировать запрос пользователя и определить его эмоциональную окраску.
Не отвечай на сам вопрос.
Итоговый ответ должен быть на английском языке.
Итоговый ответ должен состоять из ОДНОГО слова (anger | neutral | happy)"""
        user_prompt = f"Запрос пользователя: {question}"
        data = {
            "model": 'deepseek-r1-distill-qwen-32b',
            "messages" : [
                {"role" : "system", "content" : system_prompt},
                {"role" : "user", "content": user_prompt}
            ],
            "temperature": 0.0,
            "n": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,        
        }
        try:
            response = requests.post(self.api_url, headers=headers, json=data)
            text = response.json()['choices'][0]['message']['content']
            think_end = text.index('</think>')
            start = think_end + len('</think>')
            return text[start:].strip()
        except Exception as e:
            print(e)
            return e


class ContextRAG:
    def __init__(self, api_key: str, save_path: str):
        self.api_key = api_key
        self.embedder = MTS_Embeddings(api_key)
        self.vector_store = FAISS.load_local(save_path, 
                                            embeddings=self.embedder, 
                                            allow_dangerous_deserialization=True)
        
    def get_top_3(self, input_question: str) -> List[str]:
        similar_docs = self.vector_store.similarity_search(input_question, k=3)
        top_questions = [doc.page_content for doc in similar_docs]
        return top_questions
    