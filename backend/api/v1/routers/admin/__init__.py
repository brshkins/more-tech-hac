from fastapi import APIRouter, Depends

from backend.api.v1.routers.admin.auth import router as auth_router
from backend.api.dependency.providers.request import get_admin_user_dependency


admin_v1_router = APIRouter(prefix='/v1/admin')
PROTECTED = Depends(get_admin_user_dependency)

admin_v1_router.include_router(auth_router, tags=['auth_admin'], prefix='/auth')
