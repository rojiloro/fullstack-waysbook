package booksdto

type BookRequest struct {
	Title           string `json:"title" form:"title" validate:"required"`
	PublicationDate string `json:"publication_date" form:"publicationDate" validate:"required"`
	Pages           int    `json:"pages" form:"pages" validate:"required"`
	ISBN            string `json:"ISBN" form:"ISBN" validate:"required"`
	Author          string `json:"author" form:"author" validate:"required"`
	Price           int    `json:"price" form:"price" validate:"required"`
	Description     string `json:"description" form:"description" validate:"required"`
	BookAttachment  string `json:"bookattachment" form:"bookattachment" validate:"required"`
	Thumbnail       string `json:"thumbnail" form:"thumbnail" validate:"required"`
}
