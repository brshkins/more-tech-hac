package audio

import (
	"encoding/json"
	"log"
	"net/http"
	"server/entity"
	"server/ws"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type Audio struct {
	minioClient *minio.Client
	bucketName  string
}

func NewAudio(minioEndpoint, accessKey, secretKey, bucketName string) (*Audio, error) {
	client, err := minio.New(minioEndpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: false,
	})
	if err != nil {
		return nil, err
	}

	return &Audio{
		minioClient: client,
		bucketName:  bucketName,
	}, nil
}

func (a *Audio) UploadHandler(c *fiber.Ctx) error {

	file, err := c.FormFile("audio")
	if err != nil {
		log.Println("Error retrieving the file", err)
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"msg": "Error retrieving the file",
		})
	}

	fileStream, err := file.Open()
	if err != nil {
		log.Println("Error opening the file", err)
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"msg": "Error opening the file",
		})
	}
	defer fileStream.Close()

	objectName := time.Now().Format("15:04:05.000") + ".webm"

	n, err := a.minioClient.PutObject(c.Context(), a.bucketName, objectName, fileStream, file.Size, minio.PutObjectOptions{})
	if err != nil {
		log.Println("Error uploading the file to MinIO", err)
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"msg": "Error uploading the file to MinIO",
			"err": err.Error(),
		})
	}

	log.Printf("Successfully uploaded of size %d\n", n)
	fileURL, err := a.minioClient.PresignedGetObject(c.Context(), a.bucketName, objectName, 24*time.Hour, nil)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"msg": "Error to create URL",
			"err": err.Error(),
		})
	}
	like := true
	voiceMessage := entity.Message{
		ID:        uuid.New().String(),
		CreatedAt: time.Now().Format(time.RFC3339),
		FromUser:  true,
		Text:      fileURL.Path,
		Liked:     &like,
		Link:      "http://localhost:9000" + fileURL.Path,
	}
	jsonVoice, err := json.Marshal(voiceMessage)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"msg": "Error to json.Marshal URL",
			"err": err.Error(),
		})
	}
	for con, client := range ws.Connections {
		if client.ClientType == "0" {
			if err := con.WriteMessage(1, jsonVoice); err != nil {
				log.Println("write to 0 :", err)
			}
		}
	}

	return c.Status(http.StatusOK).JSON(map[string]interface{}{
		"msg": "ok",
	})
}
