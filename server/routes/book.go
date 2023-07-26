package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func BookRoutes(e *echo.Group) {
	b := repositories.RepositoryBook(mysql.DB)
	h := handlers.HandlerBook(b)

	e.POST("/addbook", middleware.UploadFile(h.AddBook))
	e.GET("/getbooks", h.FindBooks)
}
