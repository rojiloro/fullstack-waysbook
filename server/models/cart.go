package models

import "time"

type Cart struct {
	ID            int                     `json:"id" gorm:"primarykey:autoIncrement"`
	TransactionId int                     `json:"transaction_id"`
	Transaction   TransactionCartResponse `json:"transaction" gorm:"foreignkey:TransactionId"`
	Subtotal      int                     `json:"subtotal" gorm:"int"`
	Qty           int                     `json:"qty" gorm:"int"`
	CreatedAt     time.Time               `json:"-"`
	UpdatedAt     time.Time               `json:"-"`
}
