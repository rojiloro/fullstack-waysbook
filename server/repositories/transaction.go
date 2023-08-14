package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	GetUserTransaction(UserID int) ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	UpdateTransaction(status string, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Cart.Book").Preload("User").Create(&transaction).Error

	return transaction, err
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Cart.Book").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetUserTransaction(UserID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Where("user_id=?", UserID).Preload("Cart.Book").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transactions models.Transaction
	err := r.db.Preload("User").First(&transactions, ID).Error

	return transactions, err
}

func (r *repository) UpdateTransaction(status string, ID int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("User").First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		r.db.First(&transaction, ID)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}