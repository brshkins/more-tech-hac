from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.infrastructure.database.models.user import User

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
    session.add(user)
    await session.commit()