package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type BookRepository interface {
	AddBook(book models.Book) (models.Book, error)
	FindBook() ([]models.Book, error)    //get all
	GetBook(ID int) (models.Book, error) //get by id
}

func RepositoryBook(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) AddBook(book models.Book) (models.Book, error) {
	err := r.db.Create(&book).Error

	return book, err
}

func (r *repository) FindBook() ([]models.Book, error) {
	var books []models.Book
	err := r.db.Find(&books).Error

	return books, err
}

func (r *repository) GetBook(ID int) (models.Book, error) {
	var book models.Book
	err := r.db.First(&book, ID).Error

	return book, err
}


