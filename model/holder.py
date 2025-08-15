import pandas as pd
import numpy as np
import os
import requests
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.schema import Document
#from langchain.docstore import InMemoryDocstore
import faiss
from typing import List
from langchain.embeddings.base import Embeddings
from tenacity import retry, stop_after_attempt, wait_random_exponential



class intent():
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    #@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def intent_classifier(self, question):
        headers = {
            "Authorization": f"Bearer {api_key}"  # Replace YOUR_API_KEY with your actual API key
        }
        system_prompt = f"""
        Ты эксперт в области анализа данных, твоя задача внимательно проанализировать запрос пользователя и определить его смысловую нагрузку(намерение)
        Не отвечай на сам вопрос
        Итоговый ответ должен быть на английском языке
        Итоговый ответ должен состоять из одного слова (billing | technical | complaint)
        """
        user_prompt = f"""
            Запрос пользователя: {question}"""
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

#Emotion Agent
class alignmnet():
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    #@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def alignment_classifier(self, question):
        headers = {
            "Authorization": f"Bearer {api_key}"  # Replace YOUR_API_KEY with your actual API key
        }
        system_prompt = f"""
        Ты эксперт в области инженерии данных, твоя задача внимательно проанализировать запрос пользователя и определить его эмоциональную окраску
        Не отвечай на сам вопрос
        Итоговый ответ должен быть на английском языке
        Итоговый ответ должен состоять из одного слова (anger | neutral | happy)
        """
        user_prompt = f"""
            Запрос пользователя: {question}"""
        data = {
            "model": 'deepseek-r1-distill-qwen-32b',
            "messages" : [
                {"role" : "system", "content" : system_prompt},
                {"role" : "user", "content": user_prompt}
            ],
            "temperature": 0.2,
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

# агент Quality_Assurance
class Quality_Assurance():
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.question = ''
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    #@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def suggestion(self, chat_history):
        headers = {
            "Authorization": f"Bearer {api_key}"  # Replace YOUR_API_KEY with your actual API key
        }
        system_prompt = f"""
        Ты эксперт в области психологии и коммуникаций с клиентами, твоя задача внимательно проанализировать запрос выделить ответы пользователя и определить ключевые моменты для каждого из них, которые ему стоит исправить чтобы быть более дружелюбным и не выходить за политику общения с клиентами
        Строй свой ответ будто бы ты вживую даёшь рекомендации, т.е. с использованием местоимений второго лица и других аспектов
        Внутри запроса ответы пользователя разделены: они начинаются с ключевого слова 'start' и заканчиваются ключевым словом 'end' чтобы ты их мог для себя разделить
        В СВОЙ ОТВЕТ НЕ ВНОСИ СЛОВА 'start' и 'end'
        НЕ ОТВЕЧАЙ НА САМ ВОПРОС
        СВОЙ ОТВЕТ НАЧНИ С РЕКОМЕНДАЦИЙ И ТОЛЬКО ЗАТЕМ ВЫДАЙ ОБРАЗЦОВЫЕ ОТВЕТЫ
        Так же можешь исправить ответы чтобы они были в том стиле, который ты считаешь наиболее подходящим этим критерием и вывести их, ОБОЗНАЧИВ ИХ КАК ОБРАЗЦОВЫЕ ОТВЕТЫ, также пронумеруй образцовые ответы согласано поступлению их тебе, т.е. первый поступивший ответ будет 1, второй - 2 и так далее
        ИТОГОВЫЙ ОТВЕТ ДОЛЖЕН СОДЕРЖАТЬ ТОЛЬКО РУССКИЙ ЯЗЫК И СИМВОЛЫ, НИКАКИХ БУКВ ДРУГИХ ЯЗЫКОВ(КРИТИЧЕСКОЕ ТРЕБОВАНИЕ)
        """
        for i in range(1, len(chat_history), 2):
            self.question += 'start' + ' ' + chat_history[i]['content'] + ' end'
        user_prompt = f"""
            Запрос пользователя: {self.question}"""
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
     