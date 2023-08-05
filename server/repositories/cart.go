package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type CartRepositories interface {
	CreateCart(cart models.Cart) (models.Cart, error)
	FindBookCart(BookID []int) ([]models.BookOrderResponse, error)
	GetCart(ID int) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Preload("Order").Preload("Book").Create(&cart).Error

	return cart, err
}

func (r *repository) FindBookCart(BookID []int) ([]models.BookOrderResponse, error) {
	var books []models.BookOrderResponse
	err := r.db.Find(&books, BookID).Error

	return books, err
}

func (r* repository) GetCart(ID int) (models.Cart, error){
	var cart models.Cart
	err := r.db.First(&cart, ID).Error

	return cart, err
}
