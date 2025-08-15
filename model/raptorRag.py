import warnings
warnings.filterwarnings('ignore')

import os
import requests
import pandas as pd
from raptor import RetrievalAugmentation
from raptor import BaseSummarizationModel, BaseQAModel, BaseEmbeddingModel, RetrievalAugmentationConfig
from tenacity import retry, stop_after_attempt, wait_random_exponential
from dotenv import load_dotenv

os.environ["OPENAI_API_KEY"] = "placeholder" #needed for raptor init, not used

class CustomEmbedder(BaseEmbeddingModel):
    def __init__(self, api_key):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/embeddings"

    @retry(wait=wait_random_exponential(min=20, max=50), stop=stop_after_attempt(200))
    def create_embedding(self, text):
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
        
class CustomSummarizationModel(BaseSummarizationModel):
    def __init__(self, api_key):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"

    @retry(wait=wait_random_exponential(min=20, max=50), stop=stop_after_attempt(200))
    def summarize(self, context, max_tokens=500):
        headers = {
            "Authorization": f"Bearer {self.api_key}"
        }
        system_prompt = f"""Ты ассистент для суммаризации информации
Твоя задача - суммаризировать текст, включив в него все необходимые ключевые данные
Не отвечай на вопросы в тексте и не добавляй новую информацию
Суммаризация не должна превышать {max_tokens} токенов"""
        user_prompt = f"Текст: {context}"
        data = {
            "model": 'qwen2.5-72b-instruct',
            "messages" : [
                {"role" : "system", "content" : system_prompt},
                {"role" : "use", "content": user_prompt}
            ],
            "temperature": 0,
            "max_tokens": max_tokens,
            "n": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
        }
        try:
            response = requests.post(self.api_url, headers=headers, json=data)
            return response.json()['choices'][0]['message']['content']
        except Exception as e:
            print(e)
            print(response)
            print(response.json())
            return e

class CustomQAModel(BaseQAModel):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    @retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def answer_question(self, context, question):
        # Make the API call with the prompt
        headers = {
            "Authorization": f"Bearer {self.api_key}"  # Replace YOUR_API_KEY with your actual API key
        }
        system_prompt = f"""Ты ассистент для нахождения ответа на вопрос пользователя
Твоя задача - внимательно проанализировать запрос пользователя и найти информацию в предоставленном тексте
Постарайся отвечать кратко"""
        user_prompt = f"""Информация: {context}
        
Запрос пользователя: {question}"""
        data = {
            "model": 'deepseek-r1-distill-qwen-32b',
            "messages" : [
                {"role" : "system", "content" : system_prompt},
                {"role" : "user", "content": user_prompt}
            ],
            "temperature": 0.1,
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
        
class RaptorRagPipeline:
    def __init__(self, api_key: str, db_path: str):
        custom_emb = CustomEmbedder(api_key)
        custom_qa = CustomQAModel(api_key)
        custom_sum = CustomSummarizationModel(api_key)
        config = RetrievalAugmentationConfig(
            embedding_model=custom_emb,
            summarization_model=custom_sum,
            qa_model=custom_qa
        )
        self.raptor = RetrievalAugmentation(config=config, tree=db_path)
        
    def answer_question(self, user_prompt: str):
        return self.raptor.answer_question(user_prompt, top_k=7)
        