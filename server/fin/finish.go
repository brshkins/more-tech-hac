package fin

import (
	"encoding/json"
	"log"
	"net/http"
	"server/entity"
	"server/ws"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type FinishHandler struct {
}

func (f *FinishHandler) Finish(c *fiber.Ctx) error {
	like := false
	voiceMessage := entity.Message{
		ID:        uuid.New().String(),
		CreatedAt: time.Now().Format(time.RFC3339),
		FromUser:  true,
		Text:      "",
		Liked:     &like,
	}

	jsonVoice, err := json.Marshal(voiceMessage)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"msg": "Error to json.Marshal Finish",
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

	return c.SendStatus(http.StatusOK)
}