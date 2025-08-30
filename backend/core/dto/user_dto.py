from fastapi import Form, UploadFile
from pydantic import BaseModel, EmailStr, field_validator

from backend.infrastructure.config.loads import AWS_STORAGE_CONFIG


class BaseUserModel(BaseModel):
    id: int
    email: str
    username: str   
    image_url: str | None = None
    cv_file: str | None = None
    is_admin: bool

    @field_validator("cv_file", mode="after")
    def validate_cv_file(cls, v):
        if v:
            return f"{AWS_STORAGE_CONFIG.AWS_ENDPOINT_URL}/{AWS_STORAGE_CONFIG.AWS_BUCKET_NAME}/{v}"
        return v

    @field_validator("image_url", mode="after")
    def validate_image_url(cls, v):
        if v:
            return f"{AWS_STORAGE_CONFIG.AWS_ENDPOINT_URL}/{AWS_STORAGE_CONFIG.AWS_BUCKET_NAME}/{v}"
        return v


class UserUpdateForm(BaseModel):
    email: EmailStr | None = Form(None)
    username: str | None = Form(None)
    image_url: UploadFile | None = Form(None)
    cv_file: UploadFile | None = Form(None)