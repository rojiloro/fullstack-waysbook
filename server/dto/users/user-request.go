package usersdto

type CreateUserRequest struct {
	Fullname string `json:"fullname" form:"fullname" validate:"required"`
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}

type UpdateUserRequest struct {
	Email   string `json:"email" form:"email" validate:"required"`
	Gender  string `json:"gender" form:"gender" validate:"required"`
	Address string `json:"address" form:"address" validate:"required"`
	Phone   string `json:"phone" form:"phone" validate:"required"`
	Avatar  string `json:"avatar" form:"image"`
}
