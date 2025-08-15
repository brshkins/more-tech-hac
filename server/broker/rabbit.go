package broker

import (
	"log"
	"server/settings"

	amqp "github.com/rabbitmq/amqp091-go"
)

type RabbitMQ struct {
	Conn  *amqp.Connection
	Chan  *amqp.Channel
	Queue amqp.Queue
}

func InitRabbit(setting settings.Settings, queueName string, conn *amqp.Connection) *RabbitMQ {
	var rmq RabbitMQ
	rmq.Conn = conn
	rmq.InitChan()
	err := rmq.DeclareQueue(queueName)
	if err != nil {
		log.Fatal("Init Rabbit" + err.Error())
	}

	println(rmq.Queue.Name)
	return &rmq
}

func (r *RabbitMQ) InitChan() {
	// Создаем канал
	ch, err := r.Conn.Channel()
	if err != nil {
		log.Fatalf("Ошибка создания канала: %s", err)
	}
	r.Chan = ch
}

func (r *RabbitMQ) Write(msg []byte) error {
	err := r.Chan.Publish(
		"",           // обменник (по умолчанию)
		r.Queue.Name, // имя очереди
		false,        // обязательное сообщение
		false,        // не ждать подтверждения
		amqp.Publishing{
			ContentType: "application/json",
			Body:        msg,
			Priority:    0,
		})
	return err
}

func (r *RabbitMQ) DeclareQueue(queueName string) error {

	var err error

	r.Queue, err = r.Chan.QueueDeclare(
		queueName, // имя очереди
		true,      // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // аргументы
	)

	return err
}

func (r *RabbitMQ) CloseAll() {
	r.Chan.Close()
	r.Conn.Close()
}
