package authdto

type LoginResponse struct {
	Email    string `json:"email" form:"email" validate:"required"`
	Fullname string `json:"fullname" form:"email" validate:"required"`
	Role     string `json:"role" form:"role" validate:"required"`
	Token    string `json:"token" form:"token"`
	Avatar   string `json:"avatar" form:"avatar"`
}

type RegisterResponse struct {
	Email    string `json:"email" form:"email" validate:"required"`
	Fullname string `json:"fullname" form:"email" validate:"required"`
	Role     string `json:"role" form:"role" validate:"required"`
}
