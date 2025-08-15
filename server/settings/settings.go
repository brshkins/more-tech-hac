package settings

import (
	"errors"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

type Settings struct {
	Model modelSettings
	Redis redisSettings
	Minio minioSettings
	CORS  corsSettings
}

func NewSettings() (Settings, error) {
	err := godotenv.Load()
	if err != nil {
		return Settings{
			Model: modelSettings{
				Endpoint: getEnv("ENDPOINT_MODEL", "http://model:5500"),
			},
			Redis: redisSettings{
				Connect: &redis.Options{
					Addr:     getEnv("REDIS_ADDR", "redis:6379"), // Адрес Redis
					Password: getEnv("REDIS_PASS", ""),           // Пароль (если есть)
					DB:       0,                                  // Используемая база данных
				},
			},
			Minio: minioSettings{
				URL: getEnv("MINIO_ADDR", "minio:9000"),
			},
			CORS: corsSettings{
				CORS: getEnv("CORS_ADDR", "http://front:3000"),
			},
		}, errors.New("Ошибка при загрузке .env файла " + err.Error())
	}

	// Инициализация конфигурации с дефолтными значениями
	sett := Settings{
		Model: modelSettings{
			Endpoint: getEnv("ENDPOINT_MODEL", "http://model:5500"),
		},
		Redis: redisSettings{
			Connect: &redis.Options{
				Addr:     getEnv("REDIS_ADDR", "redis:6379"), // Адрес Redis
				Password: getEnv("REDIS_PASS", ""),           // Пароль (если есть)
				DB:       0,                                  // Используемая база данных
			},
		},
		Minio: minioSettings{
			URL: "minio:9000",
		},
		CORS: corsSettings{
			CORS: getEnv("CORS_ADDR", "http://front:3000"),
		},
	}
	return sett, nil
}

// getEnv получает значение переменной окружения или возвращает дефолтное значение
func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

type modelSettings struct {
	Endpoint string
}

type redisSettings struct {
	Connect *redis.Options
}

type rabbitSettins struct {
	URL string
}

type minioSettings struct {
	URL string
}

type corsSettings struct {
	CORS string
}
