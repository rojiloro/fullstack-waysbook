package transactiondto

type CreateTransactionRequest struct {
	UserId     int    `json:"user_id" form:"user_id"  validate:"required"`
	BooksId    int    `json:"book_id" form:"book_id" validate:"required"`
	Attachment string `json:"attachment" form:"attachment" validate:"required"`
	Total      int    `json:"total" form:"total" validate:"required"`
	Status     string `json:"status" form:"status" validate:"required"`
}
