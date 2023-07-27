package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	t := repositories.RepositoryTransaction(mysql.DB)
	u := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerTransaction(t, u)

	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transactions", h.FindTransaction)
}
