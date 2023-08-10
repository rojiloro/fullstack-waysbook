package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transaction := repositories.RepositoryTransaction(mysql.DB)
	cart := repositories.RepositoryCart(mysql.DB)
	order := repositories.RepositoryOrder(mysql.DB)

	h := handlers.HandlerTransaction(transaction, cart, order)

	e.GET("/user-transaction", middleware.Auth(h.GetBuyerTransaction))
	e.GET("/transactions", h.FindTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.POST("/notification", h.Notification)
}
