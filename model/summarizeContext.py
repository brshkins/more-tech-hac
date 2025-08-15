import os
import requests
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_random_exponential
import contextAnalizer


class ContextSummarizer:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.schec = 3
    @retry(wait=wait_random_exponential(min=20, max=50), stop=stop_after_attempt(200))
    def summarize_dialogue(self, chat_history: list[dict]):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        url = "https://api.gpt.mws.ru/v1/chat/completions"
        model_name = 'deepseek-r1-distill-qwen-32b'
        system_prompt = """Ты - русскоязычный ассистент для суммаризации диалога.
История этого диалога - это история чата между другим ассистентом и оператором колл-центра.
Твоя задача - резюмировать всю информацию, которая есть у тебя в распоряжении.
Не отвечай на вопросы заного и не добавляй новую информацию
Отвечай на русском языке"""

        user_prompt = """Внимательно рассмотри историю и для кажтого ответа определи, 
с какими вопросами обращался оператор и удалось ли ассистенту выдать корректный ответ.
Выведи свою суммаризацию и в конце сделай вердикт по всему диалогу в одном предложении.
Отвечай на русском языке"""
        chat_history.extend([
            {"role":"system", "content": system_prompt},
            {"role":"user", "content": user_prompt}
        ])
        data = {
            "model" : model_name,
            "messages" : chat_history,
            "temperature" : 0,
            "n" : 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
        }
        try:
            response = requests.post(url, headers=headers, json=data)
            text = response.json()['choices'][0]['message']['content']
            think_end = text.index('</think>')
            start = think_end + len('</think>')
            return text[start:].strip()
        except Exception as e:
            print(f'{e}: error in summarize_dialogue function')
            return e
        

    def resolution(self, chat_history: list[dict]):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        url = "https://api.gpt.mws.ru/v1/chat/completions"
        system_prompt = f"""Ты эксперт в области анализа данных. 
Твоя задача внимательно проанализировать запрос пользователя и определить его смысловую нагрузку и определить как решилась ситуация
НЕ ОТВЕЧАЙ НА САМ ВОПРОС
ИТОГОВЫЙ ОТВЕТ ДОЛЖЕН СОДЕРЖАТЬ ТОЛЬКО АНГЛИЙСКИЙ ЯЗЫК.
Итоговый ответ должен состоять из ОДНОГО слова (compensation | escalation | info_provided)"""
        question = ''
        for i in range(max(len(chat_history)//self.schec-(len(chat_history)//self.schec)%self.schec, len(chat_history)-9), len(chat_history)):
            question += chat_history[i]['content']
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
            response = requests.post(url, headers=headers, json=data)
            text = response.json()['choices'][0]['message']['content']
            think_end = text.index('</think>')
            start = think_end + len('</think>')
            return text[start:].strip()
        except Exception as e:
            print(e)
            return e


    def fill(self, chat_history: list[dict]):
        biba = contextAnalizer.Alignmnet(api_key=self.api_key)
        boba = contextAnalizer.IntentClassifier(api_key=self.api_key)
        emotions = []
        intent_content = ''
        for i in range(max(len(chat_history)//self.schec-(len(chat_history)//self.schec)%self.schec, len(chat_history)-15), len(chat_history), self.schec):
            emotions.append(biba.alignment_classifier(chat_history[i]['content']))
        for i in range(min(len(chat_history)//self.schec-(len(chat_history)//self.schec)%self.schec, len(chat_history)-15), self.schec):
            intent_content += chat_history[i]['content']
        return {
            "issue_type": boba.intent_classifier(intent_content),  
            "client_sentiment": max(set(emotions), key=emotions.count),  
            "resolution": self.resolution(chat_history)
        }
    

class QualityAssurance:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.api_url = "https://api.gpt.mws.ru/v1/chat/completions"
        
    #@retry(wait=wait_random_exponential(min=1, max=20), stop=stop_after_attempt(200))
    def suggestion(self, chat_history):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        system_prompt = f"""Ты эксперт в области психологии и коммуникаций с клиентами, твоя задача внимательно проанализировать запрос выделить ответы пользователя и определить ключевые моменты для каждого из них, которые ему стоит исправить чтобы быть более дружелюбным и не выходить за политику общения с клиентами
#Строй свой ответ будто бы ты вживую даёшь рекомендации, т.е. с использованием местоимений второго лица и других аспектов
#Внутри запроса ответы пользователя разделены: они начинаются с ключевого слова 'start' и заканчиваются ключевым словом 'end' чтобы ты их мог для себя разделить
#В СВОЙ ОТВЕТ НЕ ВНОСИ СЛОВА 'start' и 'end'
#НЕ ОТВЕЧАЙ НА САМ ВОПРОС
#СВОЙ ОТВЕТ НАЧНИ С РЕКОМЕНДАЦИЙ И ТОЛЬКО ЗАТЕМ ВЫДАЙ ОБРАЗЦОВЫЕ ОТВЕТЫ
#Так же можешь исправить ответы чтобы они были в том стиле, который ты считаешь наиболее подходящим этим критерием и вывести их, ОБОЗНАЧИВ ИХ КАК ОБРАЗЦОВЫЕ ОТВЕТЫ, также пронумеруй образцовые ответы согласано поступлению их тебе, т.е. первый поступивший ответ будет 1, второй - 2 и так далее
#ИТОГОВЫЙ ОТВЕТ ДОЛЖЕН СОДЕРЖАТЬ ТОЛЬКО РУССКИЙ ЯЗЫК И СИМВОЛЫ, НИКАКИХ БУКВ ДРУГИХ ЯЗЫКОВ(КРИТИЧЕСКОЕ ТРЕБОВАНИЕ)"""
        question = ''
        for i in range(1, len(chat_history), 3):
            question += 'start' + ' ' + chat_history[i]['content'] + ' end'
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
        