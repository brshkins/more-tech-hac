from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.infrastructure.database.models.base import Base

class Company(Base):
    __tablename__ = "companies"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    icon_url = Column(String)
    industry = Column(String)
    site_url = Column(String)

class Vacancy(Base):
    __tablename__ = "vacancies"
    id = Column(Integer, primary_key=True)
    company_id = Column(String, ForeignKey("companies.id"))
    region = Column(String)
    post = Column(String)
    salary = Column(String)
    tags = Column(JSON)
    is_favorite = Column(Boolean, default=False)
    responsibilities = Column(JSON)
    requirements = Column(JSON)

    company = relationship("Company")