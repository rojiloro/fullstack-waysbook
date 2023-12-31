package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type UserRepositories interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.UserProfileResponse, error)
	CreateUser(user models.User) (models.User, error)
	UpdateUser(user models.UserProfileResponse) (models.UserProfileResponse, error)
	DeleteUser(user models.User, ID int) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}
func (r *repository) GetUser(ID int) (models.UserProfileResponse, error) {
	var user models.UserProfileResponse
	err := r.db.First(&user, ID).Error

	return user, err
}

func (r *repository) CreateUser(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) UpdateUser(user models.UserProfileResponse) (models.UserProfileResponse, error) {
	err := r.db.Save(&user).Error

	return user, err
}
func (r *repository) DeleteUser(user models.User, ID int) (models.User, error) {
	err := r.db.Delete(&user).Scan(&user).Error

	return user, err
}
