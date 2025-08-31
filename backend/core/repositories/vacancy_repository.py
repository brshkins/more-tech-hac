from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.infrastructure.database.models.vacancy import Vacancy

class VacancyRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, vacancy_data: dict) -> Vacancy:
        vacancy = Vacancy(**vacancy_data)
        self.session.add(vacancy)
        await self.session.commit()
        await self.session.refresh(vacancy)
        return vacancy

    async def get_all(self, filters: dict = None) -> list[Vacancy]:
        query = select(Vacancy)
        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_by_id(self, vacancy_id: str) -> Vacancy:
        return await self.session.get(Vacancy, vacancy_id)