package models

import "time"

type Transaction struct {
	ID           int                     `json:"id" gorm:"primarykey:autoIncrement"`
	UserId       int                     `json:"user_id"`
	User         UserTransactionResponse `json:"User" gorm:"foreignkey:UserId"`
	BooksId      int                     `json:"book_id"`
	PurchaseBook BookTransactionResponse `json:"purchase_book" gorm:"foreignkey:BooksId"`
	Attachment   string                  `json:"attachment" gorm:"type : varchar(255)"`
	Total        int                     `json:"total"`
	Status       string                  `json:"status" gorm:"type : varchar(255)"`
	CreatedAt    time.Time               `json:"-"`
	UpdatedAt    time.Time               `json:"-"`
}

type TransactionCartResponse struct {
	ID         int    `json:"id" form:"id"`
	BooksId    int    `json:"book_id" form:"book_id"`
	Attachment string `json:"attachment" form:"attachment"`
	Total      int    `json:"total" form:"total"`
}

func (TransactionCartResponse) TableName() string {
	return "transactions"
}
