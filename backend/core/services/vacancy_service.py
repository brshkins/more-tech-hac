from backend.core.repositories.vacancy_repository import VacancyRepository
from backend.core.dto.vacancy_dto import VacancyCreateDTO

class VacancyService:
    def __init__(self, vacancy_repository: VacancyRepository):
        self.vacancy_repository = vacancy_repository

    async def create_vacancy(self, data: VacancyCreateDTO):
        return await self.vacancy_repository.create(data.dict(exclude_unset=True))

    async def get_vacancies(self, filters: dict = None):
        return await self.vacancy_repository.get_all(filters)

    async def get_vacancy(self, vacancy_id: int):
        return await self.vacancy_repository.get_by_id(vacancy_id)