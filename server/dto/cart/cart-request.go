package cartdto

type CartRequest struct {
	ID       int `json:"id"`
	BookID   int `json:"order_id" form:"order_id"`
	Subtotal int `json:"subtotal" form:"subtotal"`
	Qty      int `json:"qty" form:"qty"`
}
