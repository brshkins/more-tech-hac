from dishka import FromDishka
from dishka.integrations.fastapi import inject
from fastapi import APIRouter, Depends, Form, File, UploadFile
from typing import Annotated

from backend.api.dependency.providers.request import get_current_user_dependency
from backend.core import services
from backend.core.dto.user_dto import BaseUserModel, UserUpdateForm


router = APIRouter()


@router.put("/")
@inject
async def update_user(
    current_user: Annotated[BaseUserModel, Depends(get_current_user_dependency)],
    user_service: FromDishka[services.UserService],
    email: str = Form(None),
    username: str = Form(None),
    image_url: UploadFile = File(None),
    cv_file: UploadFile = File(None),
) -> BaseUserModel:
    form = UserUpdateForm(
        id=current_user.id,
        email=email,
        username=username,
        image_url=image_url,
        cv_file=cv_file
    )
    return await user_service.update(current_user, form)