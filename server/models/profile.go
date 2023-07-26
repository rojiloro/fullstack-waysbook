package models

type Profile struct {
	ID           int                 `json:"id" gorm:"primarykey:autoIncrement"`
	UserId       int                 `json:"user_id"`
	User         UserProfileResponse `json:"User" gorm:"foreignkey:UserId"`
	BooksId       int                 `json:"book_id"`
	PurchaseBook BookProfileResponse `json:"purchase_book" gorm:"foreignkey:BooksId"`
}
