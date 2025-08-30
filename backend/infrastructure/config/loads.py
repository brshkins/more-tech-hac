from environs import Env

from backend.infrastructure.config.schemas import DatabaseConfig, JwtConfig, RedisConfig, AWSStorageConfig


env = Env()
env.read_env()


DB_CONFIG = DatabaseConfig(**{field: env.str(field.upper()) for field in DatabaseConfig.model_fields})
JWT_CONFIG = JwtConfig(**{field: env.str(field) for field in JwtConfig.model_fields})
REDIS_CONFIG = RedisConfig(**{field: env.str(field) for field in RedisConfig.model_fields})
AWS_STORAGE_CONFIG = AWSStorageConfig(**{field: env.str(field) for field in AWSStorageConfig.model_fields})