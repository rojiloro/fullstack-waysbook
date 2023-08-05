package cartdto

type CartResponse struct {
	ID       int `json:"id"`
	OrderID  int `json:"order_id" form:"order_id"`
	Subtotal int `json:"subtotal" form:"subtotal"`
	Qty      int `json:"qty" form:"qty"`
}
