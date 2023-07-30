package routes

import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func CartRoutes(e *echo.Group) {
	cart := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cart)

	e.GET("/carts", h.FindCart)
	e.DELETE("/cart/:id", h.DeleteCart)
	e.GET("/cart/:id", h.GetCart)
}
