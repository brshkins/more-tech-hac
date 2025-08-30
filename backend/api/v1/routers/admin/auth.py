from fastapi import APIRouter
from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import Response

from backend.core import services
from backend.core.dto.auth_dto import LoginAdminForm
from backend.core.dto.user_dto import BaseUserModel

router = APIRouter()


async def set_cookie_tokens(access_token: str, refresh_token: str, response: Response):
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="none")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="none")


@router.post("/login")
@inject
async def login(
    form: LoginAdminForm,
    response: Response,
    auth_service: FromDishka[services.AuthService],
) -> BaseUserModel:
    user, access_token, refresh_token = await auth_service.login_user(form, is_admin=True)
    await set_cookie_tokens(access_token, refresh_token, response)
    return user
    