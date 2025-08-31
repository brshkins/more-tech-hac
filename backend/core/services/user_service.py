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

    async def create(self, *args, **kwargs):
        pass

    async def delete(self, *args, **kwargs):
        pass

    async def delete_many(self, *args, **kwargs):
        pass

    async def get_all(self, *args, **kwargs):
        pass

    async def get_one(self, *args, **kwargs):
        pass

    async def update(self, user: User, form: UserUpdateForm) -> BaseUserModel:
        if form.email and await self.repository.get_by_attribute("email", form.email):
            raise UserAlreadyExists()
        cv_file_url = None
        if form.cv_file:
            await self.aws_client.upload_one_file(form.cv_file, f"users/{user.id}/cv_file/")
            cv_file_url = f"users/{user.id}/cv_file/"
        image_url = None
        if form.image_url:
            await self.aws_client.upload_one_file(form.image_url, f"users/{user.id}/image/")
            image_url = f"users/{user.id}/image/" 

        update_data = form.model_dump()
        if cv_file_url is not None:
            update_data["cv_file"] = cv_file_url
        else:
            update_data.pop("cv_file", None)
        if image_url is not None:
            update_data["image_url"] = image_url
        else:
            update_data.pop("image_url", None)
        update_data = {k: v for k, v in update_data.items() if v is not None}
        return await self.repository.update_item(user.id, **update_data)