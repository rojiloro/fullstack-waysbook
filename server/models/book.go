package models

import "time"

type Book struct {
	ID              int       `json:"id" gorm:"primarykey:autoIncrement"`
	Title           string    `json:"title" gorm:"type : varchar(255)"`
	PublicationDate time.Time `json:"publication_date"`
	Pages           int       `json:"pages" gorm:"type:int"`
	ISBN            string    `json:"isbn" gorm:"type: varchar(255)"`
	Author          string    `json:"author" gorm:"type : varchar(255)"`
	Price           int       `json:"price" gorm:"type: int"`
	Description     string    `json:"description" gorm:"type: varchar(255)"`
	BookAttachment  string    `json:"bookattachment" gorm:"type: varchar(255)"`
	Thumbnail       string    `json:"thumbnail" gorm:"type: varchar(255)"`
}
