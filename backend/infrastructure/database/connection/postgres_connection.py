from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from backend.infrastructure.config.loads import DB_CONFIG
from backend.infrastructure.database.models.base import Base
from backend.utils.test_db import init_tables

class DatabaseConnection:
    __engine = create_async_engine(
        url=DB_CONFIG.get_postgres_url(),
        poolclass=NullPool,
    )

    async def get_session(self) -> AsyncSession:
        return AsyncSession(bind=self.__engine)

    @classmethod
    async def create_tables(cls, refresh: bool = False):
        async with cls.__engine.begin() as conn:
            if refresh:
                await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

        async with AsyncSession(bind=cls.__engine) as session:
            await init_tables(session)
            await session.commit()
        