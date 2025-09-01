from fastapi import APIRouter, Depends, HTTPException
from dishka import FromDishka
from dishka.integrations.fastapi import inject 
from backend.core.dto.vacancy_dto import VacancyDTO, VacancyCreateDTO, CompanyDTO, VacancySectionDTO
from backend.core.services.vacancy_service import VacancyService

router = APIRouter()

def to_company_dto(company):
    if not company:
        return None
    return CompanyDTO(
        id=company.id,
        name=company.name,
        icon_url=company.icon_url,
        industry=company.industry,
        site_url=company.site_url,
    )

def to_section_dto(section):
    if not section:
        return VacancySectionDTO(title="", description=[])
    if isinstance(section, dict):
        return VacancySectionDTO(
            title=section.get("title", ""),
            description=section.get("description", [])
        )
    return VacancySectionDTO(
        title=section.title,
        description=section.description,
    )

def to_vacancy_dto(vacancy):
    return VacancyDTO(
        id=vacancy.id,
        company=to_company_dto(vacancy.company),
        region=vacancy.region,
        post=vacancy.post,
        salary=vacancy.salary,
        tags=vacancy.tags if isinstance(vacancy.tags, list) else [],
        is_favorite=vacancy.is_favorite,
        responsibilities=to_section_dto(vacancy.responsibilities),
        requirements=to_section_dto(vacancy.requirements),
    )

@router.post("/", response_model=VacancyDTO)
@inject
async def create_vacancy(
    data: VacancyCreateDTO,
    service: FromDishka[VacancyService] = Depends(),
):
    vacancy = await service.create_vacancy(data)
    return to_vacancy_dto(vacancy)

@router.get("/", response_model=list[VacancyDTO])
@inject 
async def get_vacancies(service: FromDishka[VacancyService] = Depends()):
    vacancies = await service.get_vacancies()
    return [to_vacancy_dto(v) for v in vacancies]

@router.get("/{vacancy_id}", response_model=VacancyDTO)
@inject  
async def get_vacancy(vacancy_id: int, service: FromDishka[VacancyService] = Depends()):
    vacancy = await service.get_vacancy(vacancy_id)
    if not vacancy:
        raise HTTPException(status_code=404, detail="Vacancy not found")
    return to_vacancy_dto(vacancy)