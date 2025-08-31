from fastapi import APIRouter, Depends
from backend.api.dependency.providers.request import get_current_user_dependency
from backend.api.v1.routers.client.auth import router as auth_router
from backend.api.v1.routers.client.user import router as users_router
from backend.api.v1.routers.client.vacancy import router as vacancy_router

client_v1_router = APIRouter(prefix='/v1/client')
PROTECTED = Depends(get_current_user_dependency)

client_v1_router.include_router(auth_router, tags=['auth'], prefix='/auth')
client_v1_router.include_router(users_router, tags=['users'], prefix='/user', dependencies=[PROTECTED])
client_v1_router.include_router(vacancy_router, tags=['vacancies'], prefix='/vacancy', dependencies=[PROTECTED])