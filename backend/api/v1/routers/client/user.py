from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter

from backend.api.dependency.providers.request import get_current_user_dependency
from backend.core import services
from backend.core.dto.user_dto import BaseUserModel, UserUpdateForm


router = APIRouter()


@router.put("/")
@inject
async def update_user(
    user: BaseUserModel,
    form: UserUpdateForm,
    user_service: FromDishka[services.UserService],
) -> BaseUserModel:
    return await user_service.update(user, form)