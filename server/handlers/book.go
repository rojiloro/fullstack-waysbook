package handlers

import (
	"fmt"
	"net/http"
	"os"
	booksdto "server/dto/books"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"
	"time"

	"context"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerBook struct {
	BookRepositories repositories.BookRepository
}

func HandlerBook(BookRepository repositories.BookRepository) *handlerBook {
	return &handlerBook{BookRepository}
}

func (h *handlerBook) AddBook(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	thumbnail := c.Get("dataFile").(string)
	price, _ := strconv.Atoi(c.FormValue("price"))
	pages, _ := strconv.Atoi(c.FormValue("pages"))

	request := booksdto.BookRequest{
		Title:           c.FormValue("title"),
		PublicationDate: c.FormValue("publication_date"),
		Pages:           pages,
		ISBN:            c.FormValue("ISBN"),
		Author:          c.FormValue("author"),
		Price:           price,
		Description:     c.FormValue("description"),
		BookAttachment:  c.FormValue("bookattachment"),
		Thumbnail:       thumbnail,
	}

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	parsePublicationDate, err := time.Parse("2006-01-02", request.PublicationDate)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, request.Thumbnail, uploader.UploadParams{Folder: "waysbooks"})

	if err != nil {
		fmt.Println(err.Error())
	}

	book := models.Book{
		ID:              0,
		Title:           request.Title,
		PublicationDate: parsePublicationDate,
		Pages:           request.Pages,
		ISBN:            request.ISBN,
		Author:          request.Author,
		Price:           request.Price,
		Description:     request.Description,
		BookAttachment:  request.BookAttachment,
		Thumbnail:       resp.SecureURL,
	}

	data, err := h.BookRepositories.AddBook(book)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})

}

func (h *handlerBook) FindBooks(c echo.Context) error {
	books, err := h.BookRepositories.FindBook()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: books})
}

func (h *handlerBook) GetBook(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	book, err := h.BookRepositories.GetBook(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: book})
}
