package cashe

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/entity"
	"server/settings"
	"sort"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

func InitRedis(ctx context.Context, setting settings.Settings) (*redis.Client, error) {
	rdb := redis.NewClient(setting.Redis.Connect)

	// Проверяем подключение
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		return nil, err
	}
	log.Println("Успешно подключено к Redis!")

	return rdb, nil
}

func PingRedis(ctx context.Context, rdb *redis.Client) bool {
	_, err := rdb.Ping(ctx).Result()

	return !(err != nil)
}

type History struct {
	Ctx context.Context
	Rdb *redis.Client
}

func (h *History) Ping(c *fiber.Ctx) error {
	if PingRedis(h.Ctx, h.Rdb) {
		return c.SendStatus(http.StatusOK)
	}
	return c.SendStatus(http.StatusInternalServerError)
}

func (h *History) Delete(c *fiber.Ctx) error {
	// Удаляем ключ
	err := h.Rdb.Del(h.Ctx, "key").Err()
	if err != nil {
		log.Fatalf("Ошибка при удалении ключа: %v", err)
	}

	return c.SendStatus(http.StatusOK)
}

func (h *History) Get(c *fiber.Ctx) error {
	msgMap, err := h.Rdb.HGetAll(h.Ctx, "key").Result()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve messages from Redis"})
	}

	var messageList []entity.Message

	// Для каждого поля в Hash получаем данные сообщения
	for _, msgJSON := range msgMap {
		var message entity.Message
		if err := json.Unmarshal([]byte(msgJSON), &message); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to decode message"})
		}
		messageList = append(messageList, message)
	}

	// Сортируем сообщения по времени создания
	sort.Slice(messageList, func(i, j int) bool {
		timeI, _ := time.Parse(time.RFC3339, messageList[i].CreatedAt)
		timeJ, _ := time.Parse(time.RFC3339, messageList[j].CreatedAt)
		return timeI.Before(timeJ)
	})
	// Возвращаем список сообщений в формате JSON
	return c.JSON(messageList)
}

func (h *History) Post(c *fiber.Ctx) error {
	var message entity.Message

	// Парсим тело запроса в структуру Message
	if err := c.BodyParser(&message); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input"})
	}

	// Сериализуем объект в JSON
	messageJSON, err := json.Marshal(message)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to serialize message"})
	}

	// Сохраняем сообщение в Redis Hash под фиксированным ключом "key"
	key := "key" // Фиксированный ключ
	if err := h.Rdb.HSet(h.Ctx, key, fmt.Sprintf("message:%d", message.ID), messageJSON).Err(); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save message to Redis"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"status": "Message saved successfully"})
}

func (h *History) Like(c *fiber.Ctx) error {
	// Получаем ID сообщения из URL
	id := c.Params("id")

	// Получаем значение параметра "like" из строки запроса
	like := c.Query("like")

	// Формируем фиксированный ключ для хранения сообщений
	key := "key" // Фиксированный ключ

	// Получаем текущее сообщение из Redis по полю "message:<id>"
	msgJSON, err := h.Rdb.HGet(h.Ctx, key, fmt.Sprintf("message:%s", id)).Result()
	if err != nil {
		return c.Status(http.StatusNotFound).JSON(fiber.Map{"error": "Message not found"})
	}

	var message entity.Message
	if err := json.Unmarshal([]byte(msgJSON), &message); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to decode message"})
	}

	// Обновляем поле liked в зависимости от значения параметра like
	switch like {
	case "true":
		message.Liked = boolPtr(true)
	case "false":
		message.Liked = boolPtr(false)
	case "null":
		message.Liked = nil
	default:
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid value for 'like'"})
	}

	// Сериализуем обновленное сообщение обратно в JSON
	messageJSON, err := json.Marshal(message)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to serialize updated message"})
	}

	// Сохраняем обновленное сообщение обратно в Redis по полю "message:<id>"
	if err := h.Rdb.HSet(h.Ctx, key, fmt.Sprintf("message:%s", id), messageJSON).Err(); err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update message in Redis"})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{"status": "Message updated successfully"})
}

func (h *History) LikeStatistic(c *fiber.Ctx) error {
	msgMap, err := h.Rdb.HGetAll(h.Ctx, "key").Result()
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to retrieve messages from Redis"})
	}

	like := 0
	dislike := 0
	// Для каждого поля в Hash получаем данные сообщения
	for _, msgJSON := range msgMap {
		var message entity.Message
		if err := json.Unmarshal([]byte(msgJSON), &message); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to decode message"})
		}
		if message.Liked != nil {
			if *message.Liked {
				like++
			} else {
				dislike++
			}
		}
	}
	return c.Status(http.StatusOK).JSON(fiber.Map{"like": like, "dislike": dislike})
}

// Утилита для создания указателя на bool
func boolPtr(b bool) *bool {
	return &b
}
