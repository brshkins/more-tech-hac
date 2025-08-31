from backend.core.repositories.vacancy_repository import VacancyRepository
from backend.core.dto.vacancy_dto import VacancyCreateDTO

class VacancyService:
    def __init__(self, repository: VacancyRepository):
        self.repository = repository

    async def create_vacancy(self, data: VacancyCreateDTO):
        return await self.repository.create(data.dict(exclude_unset=True))

    async def get_vacancies(self, filters: dict = None):
        return await self.repository.get_all(filters)

    async def get_vacancy(self, vacancy_id: str):
        return await self.repository.get_by_id(vacancy_id)