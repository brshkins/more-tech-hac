from pathlib import Path
from environs import Env
from pydantic import BaseModel


class DatabaseConfig(BaseModel):
    DB_NAME: str
    DB_USER: str
    DB_PASS: str
    DB_HOST: str
    DB_PORT: str

    def get_postgres_url(self, is_async: bool = True):
        if is_async:
            return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        return f"postgresql://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"


class JwtConfig(BaseModel):
    JWT_SECRET: str
    JWT_ALGORITHM: str
    JWT_ACCESS_TOKEN_TIME: int
    JWT_REFRESH_TOKEN_TIME: int


class RedisConfig(BaseModel):
    REDIS_HOST: str
    REDIS_PORT: int


class AWSStorageConfig(BaseModel):
    AWS_BUCKET_NAME: str
    AWS_ACCESS_KEY: str
    AWS_SECRET_ACCESS_KEY: str
    AWS_REGION: str
    AWS_ENDPOINT_URL: str
