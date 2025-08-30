from backend.core.clients.aws_client import AWSClient
from backend.core.repositories.user_repository import UserRepository
from backend.core.dto.user_dto import BaseUserModel, UserUpdateForm
from backend.infrastructure.database.models.user import User
from backend.infrastructure.errors.auth_errors import UserAlreadyExists
from backend.infrastructure.interfaces.service import DbModelServiceInterface


class UserService(DbModelServiceInterface[User]):
    def __init__(self, user_repository: UserRepository, aws_client: AWSClient):
        self.repository = user_repository
        self.aws_client = aws_client

    async def update(self, user: User, form: UserUpdateForm) -> BaseUserModel:
        if form.email and await self.repository.get_by_attribute("email", form.email):
            raise UserAlreadyExists()
        if form.cv_file:
            await self.aws_client.upload_one_file(form.cv_file, f"users/{user.id}/cv_file/")
        return await self.repository.update_item(form.id, **form.model_dump())