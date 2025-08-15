package main

import (
	"context"
	"log"
	"server/audio"
	"server/cashe"
	"server/entity"
	"server/fin"
	"server/settings"
	"server/ws"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	ctx := context.Background()
	settings, err := settings.NewSettings()
	if err != nil {
		log.Println(err.Error())
	}
	log.Println(settings)

	rdb, err := cashe.InitRedis(ctx, settings)
	if err != nil {
		log.Fatal(err.Error())
	}
	defer rdb.Close()

	ws.Connections = make(map[*websocket.Conn]entity.Client)

	wsStruct := ws.WS{
		Rdb:      rdb,
		Settings: &settings,
	}

	app := fiber.New()

	app.Use(logger.New())

	app.Static("/", "./front")

	app.Use("/ws", ws.MiddlewareWS)

	app.Get("/ws/", websocket.New(wsStruct.WebSocket))

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",        // Разрешенные источники
		AllowMethods:     "GET,POST,PUT,DELETE",          // Разрешенные методы
		AllowHeaders:     "Origin, Content-Type, Accept", // Разрешенные заголовки
		AllowCredentials: true,
	}))

	audioHandlers, err := audio.NewAudio(settings.Minio.URL, "minio-user", "minio-password", "test-bucket")
	if err != nil {
		panic(err)
	}
	app.Post("/upload_audio", audioHandlers.UploadHandler)

	historyHandler := cashe.History{
		Ctx: ctx,
		Rdb: rdb,
	}

	app.Post("/save_history", historyHandler.Post)

	app.Get("/get_history", historyHandler.Get)

	app.Delete("/delete_history", historyHandler.Delete)

	app.Put("/islike/:id", historyHandler.Like)

	app.Get("/like-statistic",historyHandler.LikeStatistic)

	app.Get("/redis", historyHandler.Ping)

	finishHandler := fin.FinishHandler{}
	app.Get("/finish", finishHandler.Finish)

	// Запускаем сервер на порту 8080
	log.Println("Сервер запущен на http://<host>:8080/")
	if err := app.Listen(":8080"); err != nil {
		log.Fatal(err)
	}
}
