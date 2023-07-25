package main

import (
	"server/database"
	"server/pkg/mysql"

	"github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()
    
    mysql.DatabaseInit()
    database.RunMigration()

    e.Logger.Fatal(e.Start("localhost:5000"))
}