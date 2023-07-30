package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCart() ([]models.Cart, error)
	GetCart(ID int) (models.Cart, error)
	DeleteCart(cart models.Cart, ID int) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCart() ([]models.Cart, error) {
	var cart []models.Cart
	err := r.db.Find(&cart).Error

	return cart, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.First(&cart, ID).Error

	return cart, err
}

func (r *repository) DeleteCart(cart models.Cart, ID int) (models.Cart, error) {
	err := r.db.Delete(&cart, ID).Scan(&cart).Error

	return cart, err
}
