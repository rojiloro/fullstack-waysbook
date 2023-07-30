package models

import "time"

type User struct {
	ID           int                 `json:"id" gorm:"primarykey:autoIncrement"`
	Fullname     string              `json:"fullname" gorm:"type: varchar(255)"`
	Email        string              `json:"email" gorm:"type: varchar(255)"`
	Password     string              `json:"password" gorm:"type: varchar(255)"`
	Gender       string              `json:"gender" gorm:"type: varchar(255)"`
	Role         string              `json:"role" gorm:"type: varchar(255)"`
	Phone        string              `json:"phone" gorm:"type: varchar(255)"`
	Avatar       string              `json:"avatar" gorm:"type: varchar(255)"`
	Address      string              `json:"address" gorm:"type: varchar(255)"`
	BooksId      int                 `json:"books_id"`
	PurchaseBook BookProfileResponse `json:"book_id" gorm:"foreignkey:BooksId"`
	CreatedAt    time.Time           `json:"-"`
	UpdatedAt    time.Time           `json:"-"`
}

type UserTransactionResponse struct {
	ID       int    `json:"id" form:"id"`
	Fullname string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"`
	Gender   string `json:"gender" form:"gender"`
}

type UserProfileResponse struct {
	ID      int    `json:"id" form:"id"`
	Email   string `json:"email" form:"email"`
	Gender  string `json:"gender" form:"gender"`
	Address string `json:"address" form:"address"`
	Phone   string `json:"phone" form:"phone"`
	Avatar  string `json:"avatar" form:"avatar"`
}

type UserRegisterResponse struct {
	ID       int    `json:"id" form:"id"`
	Fullname string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
	Role     string `json:"role" form:"role"`
}

func (UserTransactionResponse) TableName() string {
	return "users"
}

func (UserProfileResponse) TableName() string {
	return "users"
}

func (UserRegisterResponse) TableName() string {
	return "users"
}
