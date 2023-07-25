package handlers

import (
	"net/http"
	dto "server/dto/result"
	"server/repositories"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handler struct {
	UserRepositories repositories.UserRepositories
}

func HandlerUser(UserRepository repositories.UserRepositories) *handler {
	return &handler{UserRepository}
}

func (h *handler) FindUsers(c echo.Context) error {
	users, err := h.UserRepositories.FindUsers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: users})
}

func (h *handler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepositories.GetUser(id)
	
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}