package entity

type Message struct {
	CreatedAt string   `json:"created_at"`
	FromUser  bool     `json:"from_user"`
	ID        string   `json:"id"`
	Text      string   `json:"text"`
	Liked     *bool    `json:"liked"`
	Questions []string `json:"questions"`
	Link      string   `json:"link"`
}

type Client struct {
	ClientType string
	ID         string
}
