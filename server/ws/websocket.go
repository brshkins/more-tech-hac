package ws

import (
	"log"
	"server/entity"
	"server/settings"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

var Connections map[*websocket.Conn]entity.Client

type WS struct {
	Rdb      *redis.Client
	Settings *settings.Settings
}

func MiddlewareWS(c *fiber.Ctx) error {
	// IsWebSocketUpgrade returns true if the client
	// requested upgrade to the WebSocket protocol.
	if websocket.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired
}

func (ws *WS) WebSocket(c *websocket.Conn) {
	defer c.Close()
	var (
		mt  int = 1
		msg []byte
		err error
	)

	if c.Query("type") != "1" && c.Query("type") != "0" {
		log.Println("в url не указан тип /ws?type=1 или /ws?type=0")
		if err = c.WriteMessage(mt, []byte("в url не указан тип /ws?type=1 или /ws?type=0")); err != nil {
			log.Println("write:", err)
		}
		c.Close()
		return
	}

	Connections[c] = entity.Client{ClientType: c.Query("type")}
	defer delete(Connections, c)

	for {
		if mt, msg, err = c.ReadMessage(); err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", msg)

		if Connections[c].ClientType == "1" {
			for con, client := range Connections {
				if client.ClientType == "0" {
					if err := con.WriteMessage(mt, msg); err != nil {
						log.Println("write to 0 :", err)
					}
				}
			}
		} else {
			for con, client := range Connections {
				if client.ClientType == "1" {
					if err := con.WriteMessage(mt, msg); err != nil {
						log.Println("write to 0 :", err)
					}
				}
			}
		}
	}

}
