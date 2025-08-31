from typing import AsyncIterable
from dishka import FromDishka, Provider, Scope, provide
from dishka.integrations.fastapi import inject
from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession

from backend.core import repositories, services
from backend.core.clients.aws_client import AWSClient
from backend.core.dto.user_dto import BaseUserModel
from backend.infrastructure.database.connection.postgres_connection import DatabaseConnection


class RequestProvider(Provider):
    @provide(scope=Scope.SESSION)
    async def get_session(self, db_connection: DatabaseConnection) -> AsyncIterable[AsyncSession]:
        session = await db_connection.get_session()
        try:
            yield session
        finally:
            await session.close()

    @provide(scope=Scope.SESSION)
    async def get_auth_service(self, session: AsyncSession) -> services.AuthService:
        return services.AuthService(repository=repositories.UserRepository(session))

    @provide(scope=Scope.REQUEST)
    async def get_user_service(self, session: AsyncSession, aws_client: AWSClient) -> services.UserService:
        return services.UserService(
            user_repository=repositories.UserRepository(session),
            aws_client=aws_client
        )

@inject
async def get_current_user_dependency(
    auth_service: FromDishka[services.AuthService], 
    request: Request,
) -> BaseUserModel:
    token = request.cookies.get("access_token")
    return await auth_service.verify_token(token)


@inject
async def get_admin_user_dependency(
    auth_service: FromDishka[services.AuthService], 
    request: Request,
) -> BaseUserModel:
    token = request.cookies.get("access_token")
    return await auth_service.verify_token(token, is_admin=True)