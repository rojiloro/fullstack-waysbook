package handlers

import (
	"net/http"
	dto "server/dto/result"
	"server/repositories"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handlerCart struct {
	CartRepository repositories.CartRepository
}

func HandlerCart(CartRepository repositories.CartRepository) *handlerCart {
	return &handlerCart{CartRepository}
}

func (h *handlerCart) FindCart(c echo.Context) error {
	cart, err := h.CartRepository.FindCart()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: cart})
}

func (h *handlerCart) GetCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	cart, err := h.CartRepository.GetCart(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: cart})
}

func (h *handlerCart) DeleteCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.CartRepository.GetCart(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.CartRepository.DeleteCart(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
