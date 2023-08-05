package handlers

import (
	"net/http"
	dto "server/dto/result"
	transactiondto "server/dto/transaction"
	"server/models"
	"server/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
	OrderRepository       repositories.OrderRepositories
	CartRepository        repositories.CartRepositories
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository, OrderRepository repositories.OrderRepositories, CartRepository repositories.CartRepositories) *handlerTransaction {
	return &handlerTransaction{
		TransactionRepository,
		OrderRepository,
		CartRepository,
	}
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(transactiondto.TransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// var transactionIsMatch = false
	// var transactionId int
	// for !transactionIsMatch {
	// 	transactionId = int(time.Now().Unix())
	// 	transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
	// 	if transactionData.ID == 0 {
	// 		transactionIsMatch = true
	// 	}
	// }

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	transaction := models.Transaction{
		Status: "pending",
		UserId: int(userId),
		Total:  request.Total,
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	orders, err := h.OrderRepository.GetUserOrder(int(userId))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	for _, order := range orders {
		cart := models.Cart{
			TransactionId: data.ID,
			Qty:           order.Qty,
			BookId:        order.BookId,
		}
		h.CartRepository.CreateCart(cart)
	}

	// var s = snap.Client{}
	// s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// just change the environment into midtrans.Production if you want to change it into Production

	// 2. initiate snap request param
	// req := &snap.Request{
	// 	TransactionDetails: midtrans.TransactionDetails{
	// 		OrderID:  strconv.Itoa(data.ID),
	// 		GrossAmt: int64(request.TotalPrice),
	// 	},
	// 	CreditCard: &snap.CreditCardDetails{
	// 		Secure: true,
	// 	},
	// 	CustomerDetail: &midtrans.CustomerDetails{
	// 		FName: data.Buyer.FullName,
	// 		Email: data.Buyer.Email,
	// 	},
	// }
	// snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *handlerTransaction) FindTransaction(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}

func (h *handlerTransaction) GetBuyerTransaction(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	transactions, err := h.TransactionRepository.GetUserTransaction(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}
