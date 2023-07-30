package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	dto "server/dto/result"
	usersdto "server/dto/users"
	"server/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
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
	userLogin := c.Get("userLogin")
	idUserLogin := userLogin.(jwt.MapClaims)["id"].(float64)
	user, err := h.UserRepositories.GetUser(int(idUserLogin))

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}

func (h *handler) UpdateUser(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	userLogin := c.Get("userLogin")
	idUserLogin := userLogin.(jwt.MapClaims)["id"].(float64)
	userid, _ := h.UserRepositories.GetUser(int(idUserLogin))

	avatar := c.Get("dataFile").(string)

	user, err := h.UserRepositories.UpdateUser(userid)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	resp, err := cld.Upload.Upload(ctx, avatar, uploader.UploadParams{Folder: "waysbooks"})

	if err != nil {
		fmt.Println(err.Error())
	}
	request := usersdto.UpdateUserRequest{
		Email:   c.FormValue("email"),
		Gender:  c.FormValue("gender"),
		Address: c.FormValue("address"),
		Phone:   c.FormValue("phone"),
		Avatar:  resp.SecureURL,
	}

	validation := validator.New()
	err = validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Email != "" {
		user.Email = request.Email
	}
	if request.Gender != "" {
		user.Gender = request.Gender
	}
	if request.Address != "" {
		user.Address = request.Address
	}
	if request.Phone != "" {
		user.Phone = request.Phone
	}
	if avatar != "" {
		user.Avatar = request.Avatar
	}

	updatedProfile, err := h.UserRepositories.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: updatedProfile})
}
