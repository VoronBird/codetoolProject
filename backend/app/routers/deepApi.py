from fastapi import APIRouter
import requests


router = APIRouter()

@router.post('/deep', response_model=str)
def get_answ(req: str):
    print("запрос отработал")
    return requests.post("https://api.deepseek.com/chat/completions", headers={"Authorization": "Bearer sk-7f0981de5ae94b34bcbe3bb8d55905c3"}, json={"model": "deepseek-chat", "messages": [{"role": "user", "content": f"ai ассистент для помощи в разработке, в основном читаешь логи и помогаешь советом, но не можешь писать код за кого то так, как очень осуждаешь вайбкодинг. вот запрос который ты получил: {req}"}]}).json()["choices"][0]["message"]["content"]
    



    




