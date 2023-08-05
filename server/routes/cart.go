package routes

import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func CartRoutes(e *echo.Group) {
	cart := repositories.RepositoryCart(mysql.DB)
	order := repositories.RepositoryOrder(mysql.DB)
	h := handlers.HandlerCart(cart, order)

	e.POST("/cart", h.CreateCart)
	e.GET("/carts", h.FindCart)
	e.GET("/cart/:id", h.GetCart)
}
