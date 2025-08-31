from pydantic import BaseModel
from typing import List, Optional

class CompanyDTO(BaseModel):
    id: str
    name: str
    icon_url: str
    industry: str
    site_url: str

    class Config:
        from_attributes = True

class VacancySectionDTO(BaseModel):
    title: str
    description: List[str]

    class Config:
        from_attributes = True

class VacancyDTO(BaseModel):
    id: str
    company: Optional[CompanyDTO] 
    region: str
    post: str
    salary: str
    tags: List[str]
    is_favorite: bool
    responsibilities: VacancySectionDTO
    requirements: VacancySectionDTO

    class Config:
        from_attributes = True

class VacancyCreateDTO(BaseModel):
    company_id: str
    region: str
    post: str
    salary: str
    tags: List[str]
    is_favorite: bool = False
    responsibilities: VacancySectionDTO
    requirements: VacancySectionDTO