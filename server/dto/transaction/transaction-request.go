package transactiondto

type TransactionRequest struct {
	UserId     int    `json:"user_id" form:"user_id"`
	Attachment string `json:"attachment" form:"attachment"`
	Total      int    `json:"total" form:"total"`
	OrderID    int    `json:"order_id" form:"order_id"`
}
