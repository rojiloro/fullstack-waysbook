package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User").Create(&transaction).Error

	return transaction, err
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Find(&transactions).Error

	return transactions, err
}