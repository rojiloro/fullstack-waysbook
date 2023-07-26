package database

import (
	"fmt"
	"server/models"
	"server/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Book{},
	)

	if err != nil {
		fmt.Println(err)
		panic("migration failed")
	}

	fmt.Println("migration success!!!")
}
