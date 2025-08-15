import datetime
import json
import os
#import time
import requests
import websocket
import whisper
import uuid
from dotenv import load_dotenv
from datetime import datetime
from raptorRag import RaptorRagPipeline
import summarizeContext
import contextAnalizer
from langchain_core.runnables import RunnableLambda, RunnableParallel
from summarizeContext import ContextSummarizer

# Загружаем переменные окружения из файла .env
load_dotenv()
load_dotenv('.env.private', override=True)
api_key = os.getenv('API_KEY')
history_url = os.getenv('HISTORY_URL','http://server:8080/get_history')
pathToRaptor = os.getenv('RAPTOR_PATH','RaptorDB.pickle')
pathToFaiss = os.getenv('FAISS_PATH','ML_Prekoli/faiss_index')

modelRaptor = RaptorRagPipeline(api_key, pathToRaptor)

raptor_runnable = RunnableLambda(lambda text: modelRaptor.answer_question(text))

#/// Добавить в пайп по ходу диалога
intent_class = contextAnalizer.IntentClassifier(api_key=api_key)
intent_runnable = RunnableLambda(lambda text: intent_class.intent_classifier(user_input=text))

alignment_class = contextAnalizer.Alignmnet(api_key=api_key)
aligment_runnable = RunnableLambda(lambda text: alignment_class.alignment_classifier(question=text))

suggestion = contextAnalizer.ContextRAG(api_key=api_key, save_path=pathToFaiss)
suggestion_runnable = RunnableLambda(lambda text: suggestion.get_top_3(input_question=text))

prompt_pipeline = RunnableParallel(
    intent=intent_runnable,
    alignment=aligment_runnable,
    suggestion=suggestion_runnable,
)
#/// Добавить в пайп по ходу диалога



#/// Добавить в пайп в конце диалога
summary_agent = summarizeContext.ContextSummarizer(api_key=api_key)
summary_runnable = RunnableLambda(lambda chat_dict: summary_agent.summarize_dialogue(chat_history=chat_dict))
resolution_runnable = RunnableLambda(lambda chat_dict: summary_agent.resolution(chat_history=chat_dict))
crm_runnable = RunnableLambda(lambda chat_dict: summary_agent.fill(chat_history=chat_dict))

quality_assurance = summarizeContext.QualityAssurance(api_key=api_key)
quality_runnable = RunnableLambda(lambda chat_dict: quality_assurance.suggestion(chat_history=chat_dict))

finish_pipeline = RunnableParallel(
    summary=summary_runnable,
    resolution=resolution_runnable,
    crm=crm_runnable,
    quality=quality_runnable
)

# Использовать так:
#finish_pipeline.invoke(chat_dict) # там всё в одном дикте приедет

#/// Добавить в пайп в конце диалога

# ///
context_summarizer = ContextSummarizer(api_key=api_key)
# Выполнение GET-запроса
print(history_url)
#response = requests.get(history_url)

# Проверка успешности запроса
# if response.status_code == 200:
#     # Получение данных в формате JSON
#     data = response.json()
    
#     # Преобразование данных в нужный формат
#     chat_history = []
#     for item in data:
#         role = "user" if item["from_user"] else "assistant"
#         chat_history.append({"role": role, "content": item["text"]})
#     print(chat_history)
#     print(context_summarizer.summarize_dialogue(chat_history=chat_history))
# else:
#     print("Код ошибки: ", response.status_code)

wsURL = os.getenv('WS_URL', 'ws://server:8080/ws?type=0')
minioADR = os.getenv('MINIO_ADDR','http://minio:9000')
modelWhisper = whisper.load_model("small")

def create_message(text, id, liked, from_user,questions):
    message = {}
    message["text"] = text
    message["id"] = id
    message["liked"] = liked
    message["from_user"] = from_user
    message["questions"] = questions
    return message

# Определяем функцию обработки входящих сообщений
def on_message(ws, message):
    print(f"Получено сообщение от сервера: {message}")
    #result = model.transcribe(message)
    #ws.send(result['text'])
    # Создаем словарь с нужной структурой
    message = json.loads(message)
    print(message["text"])
    print(message["liked"])
    if False == message["liked"]:

        response = requests.get(history_url)

        #Проверка успешности запроса
        if response.status_code == 200:
            # Получение данных в формате JSON
            data = response.json()
            
            # Преобразование данных в нужный формат
            chat_history = []
            for item in data:
                role = "user" if item["from_user"] else "assistant"
                chat_history.append({"role": role, "content": item["text"]})
            print(chat_history)

            now = datetime.now()
            rfc3339_format = now.isoformat() + 'Z'
            fin = finish_pipeline.invoke(chat_history)
            
            message = create_message(text=fin["resolution"], id = str(uuid.uuid4()), liked=None, from_user=False, questions=[])

            response = {
                "type": "textMessage",
                "data": message
            }
            # Сериализуем словарь в JSON-строку
            json_response = json.dumps(response)
            
            # Отправляем JSON-строку обратно на сервер
            ws.send(json_response)

            message = create_message(text=fin["summary"], id = str(uuid.uuid4()), liked=None, from_user=False, questions=[])

            response = {
                "type": "textMessage",
                "data": message
            }
            # Сериализуем словарь в JSON-строку
            json_response = json.dumps(response)
            
            # Отправляем JSON-строку обратно на сервер
            ws.send(json_response)

            message = create_message(text=fin["quality"], id = str(uuid.uuid4()), liked=None, from_user=False, questions=[])

            response = {
                "type": "textMessage",
                "data": message
            }
            # Сериализуем словарь в JSON-строку
            json_response = json.dumps(response)
            
            # Отправляем JSON-строку обратно на сервер
            ws.send(json_response)

            message = create_message(text="\n".join([f"{key} : {value}" for key, value in fin["crm"].items()]), id = str(uuid.uuid4()), liked=None, from_user=False, questions=[])

            response = {
                "type": "textMessage",
                "data": message
            }
            # Сериализуем словарь в JSON-строку
            json_response = json.dumps(response)
            
            # Отправляем JSON-строку обратно на сервер
            ws.send(json_response)
            return
            
        else:
            message["liked"] = None
            message["id"] = str(uuid.uuid4())
            message["from_user"] = True
            now = datetime.now()
            rfc3339_format = now.isoformat() + 'Z'
            message["created_at"] = rfc3339_format
            message["text"] = "Код ошибки"+str(response.status_code)
            message["questions"] = []
            response = {
                "type": "textMessage",
                "data": message
            }
            # Сериализуем словарь в JSON-строку
            json_response = json.dumps(response)
            
            # Отправляем JSON-строку обратно на сервер
            ws.send(json_response)
            print("Код ошибки: ", response.status_code)
            return
            
            

    if message["liked"]:
        message["liked"] = None
        print(minioADR+message["text"])
        message["text"] = modelWhisper.transcribe(minioADR+message["text"])['text']
        print(message["text"])
        message["from_user"] = True
        now = datetime.now()
        rfc3339_format = now.isoformat() + 'Z'
        message["created_at"] = rfc3339_format
        message["questions"] = []
        response = {
            "type": "textMessage",
            "data": message
        }
        # Сериализуем словарь в JSON-строку
        json_response = json.dumps(response)
        
        # Отправляем JSON-строку обратно на сервер
        ws.send(json_response)
    message["link"] = ""
    message["from_user"] = False
    message["id"] = str(uuid.uuid4())

    modelAnswer = raptor_runnable.invoke(message["text"])
    subAnswer = prompt_pipeline.invoke(message["text"])

    print(modelAnswer)
    message["text"] = modelAnswer
    message["from_user"] = False
    # Получаем текущее время
    now = datetime.now()

    # Форматируем его в формате RFC 3339
    rfc3339_format = now.isoformat() + 'Z'

    message["created_at"] = rfc3339_format

    message["questions"] = subAnswer["suggestion"]
   
    response = {
        "type": "textMessage",
        "data": message
    }
    # Сериализуем словарь в JSON-строку
    json_response = json.dumps(response)
    
    # Отправляем JSON-строку обратно на сервер
    ws.send(json_response)

    message["id"] = str(uuid.uuid4())
    message["liked"] = None
    message["text"] = f"Intent: {subAnswer['intent']}\nAlignment: {subAnswer['alignment']}"
    print(message["text"])
    message["from_user"] = False
    now = datetime.now()
    rfc3339_format = now.isoformat() + 'Z'
    message["created_at"] = rfc3339_format
    message["questions"] = []
    response = {
        "type": "textMessage",
        "data": message
    }
    # Сериализуем словарь в JSON-строку
    json_response = json.dumps(response)
    
    # Отправляем JSON-строку обратно на сервер
    ws.send(json_response)

# Определяем функцию для обработки ошибок
def on_error(ws, error):
    print(f"Ошибка: {error}")

# Определяем функцию для обработки закрытия WebSocket соединения
def on_close(ws):
    print("Соединение закрыто")

# Определяем функцию для обработки открытия WebSocket соединения
def on_open(ws):
    print("Соединение установлено")


# Создаем WebSocket приложение
ws = websocket.WebSocketApp(wsURL,
                            on_message=on_message,
                            on_error=on_error,
                            on_close=on_close)

# Устанавливаем обработчик для открытия соединения
ws.on_open = on_open

# Запускаем WebSocket клиент
ws.run_forever()