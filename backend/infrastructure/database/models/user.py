from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.infrastructure.database.models.base import Base


class User(Base):
    __tablename__ = "users" 

    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    username: Mapped[str] = mapped_column(String, nullable=True)
    image_url: Mapped[str] = mapped_column(String, nullable=True)
    cv_file: Mapped[str] = mapped_column(String, nullable=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)