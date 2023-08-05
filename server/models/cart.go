package models

import "time"

type Cart struct {
	ID            int               `json:"id" gorm:"primarykey:autoIncrement"`
	BookId        int               `json:"book_id"`
	Book          BookOrderResponse `json:"book"`
	Subtotal      int               `json:"subtotal" gorm:"int"`
	Qty           int               `json:"qty" gorm:"int"`
	TransactionId int               `json:"-" gorm:"transaction_id"`
	Transaction   Transaction       `json:"-"`
	CreatedAt     time.Time         `json:"-"`
	UpdatedAt     time.Time         `json:"-"`
}
