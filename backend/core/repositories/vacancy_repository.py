from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from backend.infrastructure.database.models.vacancy import Vacancy

class VacancyRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, vacancy_data: dict) -> Vacancy:
        print("vacancy_data:", vacancy_data) 
        vacancy = Vacancy(**vacancy_data)
        self.session.add(vacancy)
        await self.session.commit()
        await self.session.refresh(vacancy, attribute_names=["company"])
        return vacancy

    async def get_all(self, filters: dict = None) -> list[Vacancy]:
        query = select(Vacancy).options(selectinload(Vacancy.company))
        result = await self.session.execute(query)
        return result.scalars().all()

    async def get_by_id(self, vacancy_id: int) -> Vacancy:
        return await self.session.get(
            Vacancy,
            vacancy_id,
            options=[selectinload(Vacancy.company)]
        )