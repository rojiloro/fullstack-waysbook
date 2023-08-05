package models

import "time"

type Transaction struct {
	ID         int                     `json:"id" gorm:"primarykey:autoIncrement"`
	UserId     int                     `json:"user_id"`
	User       UserTransactionResponse `json:"User" gorm:"foreignkey:UserId"`
	Cart       []Cart                  `json:"cart"`
	Attachment string                  `json:"attachment" gorm:"type : varchar(255)"`
	Total      int                     `json:"total"`
	Status     string                  `json:"status" gorm:"type : varchar(255)"`
	CreatedAt  time.Time               `json:"-"`
	UpdatedAt  time.Time               `json:"-"`
}
