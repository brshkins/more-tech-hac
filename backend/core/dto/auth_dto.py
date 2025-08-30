from pydantic import BaseModel, EmailStr


class RegisterForm(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginForm(BaseModel):
    email: EmailStr
    password: str


class LoginAdminForm(LoginForm):
    email: str