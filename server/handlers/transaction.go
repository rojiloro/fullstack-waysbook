package handlers

import (
	"net/http"
	dto "server/dto/result"
	transactiondto "server/dto/transaction"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTransaction struct {
	TransactionRepositories repositories.TransactionRepository
	UserRepository          repositories.UserRepositories
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository, UserRepository repositories.UserRepositories) *handlerTransaction {
	return &handlerTransaction{
		TransactionRepositories: TransactionRepository,
		UserRepository:          UserRepository,
	}
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	BooksId, _ := strconv.Atoi(c.FormValue("book_id"))
	total, _ := strconv.Atoi(c.FormValue("total"))

	request := transactiondto.CreateTransactionRequest{
		UserId:     int(userId),
		BooksId:    BooksId,
		Attachment: c.FormValue("attachment"),
		Total:      total,
		Status:     "pending",
	}

	validadation := validator.New()
	err := validadation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transaction := models.Transaction{

		UserId:     request.UserId,
		BooksId:    request.BooksId,
		Attachment: request.Attachment,
		Total:      request.Total,
		Status:     request.Status,
	}

	data, err := h.TransactionRepositories.CreateTransaction(transaction)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})

}

func (h *handlerTransaction) FindTransaction(c echo.Context) error {
	transaction, err := h.TransactionRepositories.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}
