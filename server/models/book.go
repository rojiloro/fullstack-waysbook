package models

import "time"

type Book struct {
	ID              int       `json:"id" gorm:"primarykey:autoIncrement"`
	Title           string    `json:"title" gorm:"type : varchar(255)"`
	PublicationDate time.Time `json:"publication_date"`
	Pages           int       `json:"pages" gorm:"type:int"`
	ISBN            string    `json:"ISBN" gorm:"type: varchar(255)"`
	Author          string    `json:"author" gorm:"type : varchar(255)"`
	Price           int       `json:"price" gorm:"type: int"`
	Description     string    `json:"description" gorm:"type: varchar(255)"`
	BookAttachment  string    `json:"bookattachment" gorm:"type: varchar(255)"`
	Thumbnail       string    `json:"thumbnail" gorm:"type: varchar(255)"`
}

type BookProfileResponse struct {
	ID              int       `json:"id" form:"id"`
	Title           string    `json:"title" form:"title"`
	PublicationDate time.Time `json:"publication_date" form:"publication_date"`
	Pages           int       `json:"pages" form:"pages"`
	ISBN            string    `json:"ISBN" form:"ISBN"`
	Author          string    `json:"author" form:"author"`
	Price           int       `json:"price" form:"price"`
	Description     string    `json:"description" form:"description"`
	BookAttachment  string    `json:"bookattachment" form:"bookattachment"`
	Thumbnail       string    `json:"thumbnail" form:"thumbnail"`
}

type BookTransactionResponse struct {
	ID              int       `json:"id" form:"id"`
	Title           string    `json:"title" form:"title"`
	PublicationDate time.Time `json:"publication_date" form:"publication_date"`
	Pages           int       `json:"pages" form:"pages"`
	ISBN            string    `json:"ISBN" form:"ISBN"`
	Author          string    `json:"author" form:"author"`
	Price           int       `json:"price" form:"price"`
	Description     string    `json:"description" form:"description"`
	BookAttachment  string    `json:"bookattachment" form:"bookattachment"`
	Thumbnail       string    `json:"thumbnail" form:"thumbnail"`
}

func (BookProfileResponse) TableName() string {
	return "books"
}

func (BookTransactionResponse) TableName() string {
	return "books"
}
