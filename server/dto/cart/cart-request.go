package cartdto

type CartRequest struct {
	TransactionId int `json:"transaction_id" form:"transaction_id"`
	SubTotal      int `json:"subtotal" form:"subtotal"`
	Qty           int `json:"qty" form:"qty"`
}
