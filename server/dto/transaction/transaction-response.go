package transactiondto

type CreateTransactionResponse struct {
	UserId     int    `json:"user_id" form:"user_id"`
	BooksId    int    `json:"book_id" form:"book_id"`
	Attachment string `json:"attachment" form:"attachment"`
	Total      int    `json:"total" form:"total"`
	Status     string `json:"status" form:"status"`
}
