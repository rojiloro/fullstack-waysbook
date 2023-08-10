package models

type Order struct {
	ID     int                 `json:"id" gorm:"primarykey:autoIncrement"`
	BookId int                 `json:"book_id"`
	Book   BookOrderResponse   `json:"Book" gorm:"foreignkey:BookId"`
	UserId int                 `json:"user_id"`
	User   UserProfileResponse `json:"user"`
}
