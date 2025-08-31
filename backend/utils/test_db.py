from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.infrastructure.database.models.user import User
from backend.infrastructure.database.models.vacancy import Company


async def init_tables(session: AsyncSession):
    exist = await session.execute(select(User).where(User.is_admin == True))
    if exist.scalars().first():
        return

    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    user = User(
        username="admin",
        email="admin",
        password=context.hash("admin"),
        is_admin=True,
    )

    company = Company(
        id="vtb-company",
        name="ВТБ",
        icon_url="https://storage.yandexcloud.net/mago-storage/users/3/image/vtb (3).png",
        site_url="https://www.vtb.ru",
        industry="FinTech",
    )
    session.add_all([user, company])
    await session.commit()