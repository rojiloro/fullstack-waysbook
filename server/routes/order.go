package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func OrderRoutes(e *echo.Group) {
	order := repositories.RepositoryOrder(mysql.DB)
	h := handlers.HandlerOrder(order)

	e.POST("/order", middleware.Auth(h.CreateOrder))
	e.GET("/orders", h.FindOrder)
	e.GET("/order-user", middleware.Auth(h.GetOrderbyUser))
}
