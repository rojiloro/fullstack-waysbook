package models

import "time"

type User struct {
	ID        int    `json:"id" gorm:"primarykey:autoIncrement"`
	Fullname  string `json:"fullname" gorm:"type: varchar(255)"`
	Email     string `json:"email" gorm:"type: varchar(255)"`
	Gender    string `json:"gender" gorm:"type: varchar(255)"`
	Role string `json:"role" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" gorm:"type: varchar(255)"`
	Avatar    string `json:"avatar" gorm:"type: varchar(255)"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}