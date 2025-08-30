import hashlib
import hmac
import json
from datetime import datetime, timedelta

from h11 import Request
from jwt import InvalidTokenError, encode, decode
from passlib.context import CryptContext

from backend.core.dto.auth_dto import LoginAdminForm, LoginForm, RegisterForm
from backend.core.dto.user_dto import BaseUserModel
from backend.core.repositories.user_repository import UserRepository
from backend.infrastructure.config.loads import JWT_CONFIG
from backend.infrastructure.database.models.user import User
from backend.infrastructure.errors.auth_errors import InvalidLoginData, InvalidToken, UserAlreadyNotRegister, UserAlreadyRegister, UserIsNotAdmin


class AuthService:
    def __init__(self, repository: UserRepository) -> None:
        self.repository = repository
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    async def get_user_by_username(self, username: str) -> User | None:
        user = await self.repository.get_by_attribute("username", username)
        return None if not user else user[0]
    
    async def get_user_by_email(self, email: str) -> User | None:
        user = await self.repository.get_by_attribute("email", email)
        return None if not user else user[0]
    
    async def verify_password(self, password: str, hashed_password: str) -> bool:
        return self.context.verify(password, hashed_password)

    async def authenticate_user(self, form: LoginForm | RegisterForm | LoginAdminForm, is_admin: bool = False) -> User:
        user = await self.get_user_by_email(form.email)
        if not user:
            raise UserAlreadyNotRegister()
        if not await self.verify_password(form.password, user.password):
            raise InvalidLoginData()
        if is_admin and not user.is_admin:
            raise UserIsNotAdmin()
        return BaseUserModel.model_validate(user, from_attributes=True)

    async def create_access_token(self, email: str) -> str:
        expire = datetime.now() + timedelta(minutes=JWT_CONFIG.JWT_ACCESS_TOKEN_TIME)
        data = {"exp": expire, "sub": email}
        token = encode(
            data,
            JWT_CONFIG.JWT_SECRET, 
            algorithm=JWT_CONFIG.JWT_ALGORITHM
        )
        return token
    
    async def create_refresh_token(self, email: str ):
        expire = datetime.now() + timedelta(days=JWT_CONFIG.JWT_REFRESH_TOKEN_TIME)
        data = {"exp": expire, "sub": email}
        return encode(
            data, 
            JWT_CONFIG.JWT_SECRET, 
            algorithm=JWT_CONFIG.JWT_ALGORITHM
        )

    async def verify_token(self, token: str, is_admin: bool = False) -> BaseUserModel:
        if not token:
            raise InvalidToken
        try:
            payload = decode(
                token,
                JWT_CONFIG.JWT_SECRET,
                algorithms=[JWT_CONFIG.JWT_ALGORITHM],
            )
            email = payload.get("sub")
            user = await self.get_user_by_email(email)
            if not email or not user or (is_admin and not user.is_admin):
                raise InvalidToken()
            return BaseUserModel.model_validate(user, from_attributes=True)
        except (InvalidTokenError, AttributeError) as e:
            raise InvalidToken()

    async def check_user_exist(self, email: str) -> BaseUserModel:
        user = await self.get_user_by_email(email)
        if user is None:
            raise InvalidToken()
        return BaseUserModel.model_validate(user, from_attributes=True)

    async def register_user(self, form: RegisterForm) -> BaseUserModel:
        user = await self.get_user_by_email(form.email)
        if user:
            raise UserAlreadyRegister()

        form.password = self.context.hash(form.password)
        new_user = await self.repository.add_item(**form.model_dump())
        access_token = await self.create_access_token(new_user.email)
        refresh_token = await self.create_refresh_token(new_user.email)
        return BaseUserModel.model_validate(new_user, from_attributes=True), access_token, refresh_token

    async def check_user_in_app(self, form: RegisterForm) -> bool:
        user = await self.get_user_by_email(form.email)
        if user:
            raise UserAlreadyRegister()
    
    async def login_user(self, form: LoginForm, is_admin: bool = False) -> BaseUserModel:
        user = await self.authenticate_user(form, is_admin=is_admin)
        access_token = await self.create_access_token(user.email)
        refresh_token = await self.create_refresh_token(user.email)
        return user, access_token, refresh_token