package main

import (
	"server/database"
	"server/pkg/mysql"
	"server/routes"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	mysql.DatabaseInit()
	database.RunMigration()

	routes.RouteInit(e.Group("/api/v1"))

	e.Static("/uploads", "./uploads")

	e.Logger.Fatal(e.Start("localhost:5000"))
}
