package handlers

import (
	"net/http"
	cartdto "server/dto/cart"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerCart struct {
	CartRepository  repositories.CartRepositories
	OrderRepository repositories.OrderRepositories
}

func HandlerCart(CartRepository repositories.CartRepositories, OrderRepository repositories.OrderRepositories) *handlerCart {
	return &handlerCart{
		CartRepository:  CartRepository,
		OrderRepository: OrderRepository,
	}
}

func (h *handlerCart) CreateCart(c echo.Context) error {
	request := new(cartdto.CartRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(validation)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	cart := models.Cart{
		ID:       request.ID,
		BookId:   request.BookID,
		Subtotal: request.Subtotal,
		Qty:      request.Qty,
	}

	data, err := h.CartRepository.CreateCart(cart)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerCart) FindCart(c echo.Context) error {
	carts, err := h.OrderRepository.FindOrder()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: carts})
}

func (h *handlerCart) GetCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	cart, err := h.CartRepository.GetCart(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: cart})
}
