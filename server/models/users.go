package models

import "time"

type User struct {
	ID        int    `json:"id" gorm:"primarykey:autoIncrement"`
	Fullname  string `json:"fullname" gorm:"type: varchar(255)"`
	Email     string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" gorm:"type: varchar(255)"`
	Role string `json:"role" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" gorm:"type: varchar(255)"`
	Avatar    string `json:"avatar" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type UserProfileResponse struct {
	ID        int    `json:"id" form:"id"`
	Fullname  string `json:"fullname" form:"fullname"`
	Email     string `json:"email" form:"email"`
	Gender    string `json:"gender" form:"gender"`
	Role string `json:"role" form:"role"`
	Phone     string `json:"phone" form:"phone"`
	Avatar    string `json:"avatar" form:"avatar"`
}

type UserTransactionResponse struct {
	ID        int    `json:"id" form:"id"`
	Fullname  string `json:"fullname" form:"fullname"`
	Email     string `json:"email" form:"email"`
	Gender    string `json:"gender" form:"gender"`
}

func (UserProfileResponse) TableName() string {
	return "users"
}

func (UserTransactionResponse) TableName() string {
	return "users"
}