package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	u := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(u)

	e.GET("/users", h.FindUsers)
	e.GET("/user", middleware.Auth(h.GetUser))
	e.PATCH("/user", middleware.Auth(middleware.UploadFile(h.UpdateUser)))
}
