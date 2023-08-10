package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type OrderRepositories interface {
	CreateOrder(order models.Order) (models.Order, error)
	FindOrder() ([]models.Order, error)
	GetUserOrder(ID int) ([]models.Order, error)
	DeleteOrder(order models.Order, ID int)(models.Order, error)
	OrderId(ID int)(models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Book").Preload("User").Create(&order).Error

	return order, err
}

func (r *repository) FindOrder() ([]models.Order, error) {
	var orders []models.Order
	err := r.db.Preload("Book").Preload("User").Find(&orders).Error

	return orders, err
}

func (r *repository) GetUserOrder(ID int) ([]models.Order, error) {
	var order []models.Order
	err := r.db.Where("user_id = ?", ID).Preload("User").Preload("Book").Find(&order).Error

	return order, err
}

func (r *repository) DeleteOrder(order models.Order, ID int) (models.Order, error) {
	err := r.db.Delete(&order, ID).Error

	return order, err
}

func (r *repository) OrderId(ID int) (models.Order, error) {
	var order models.Order
	err := r.db.First(&order, ID).Error

	return order, err
}