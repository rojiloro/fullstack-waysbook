package usersdto

type UserResponse struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}

type UpdateUserResponse struct {
	Email   string `json:"email" form:"email"`
	Gender  string `json:"gender" form:"gender"`
	Address string `json:"address" form:"address"`
	Phone   string `json:"phone" form:"phone"`
	Avatar  string `json:"avatar" form:"image"`
}
