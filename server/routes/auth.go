package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	a := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(a)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check", middleware.Auth(h.CheckAuth))
}
