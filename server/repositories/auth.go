package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User)(models.User, error)
	Login(email string)(models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user models.User)(models.User, error){
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) Login(Email string)(models.User, error){
	var user models.User
	err := r.db.First(&user, "email=?", Email).Error

	return user, err
}