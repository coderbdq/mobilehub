// path: src/pages/CartPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  if (cart.length === 0)
    return (
      <div className="container text-center py-5">
        <h3>🛒 Giỏ hàng của bạn đang trống</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Tiếp tục mua sắm
        </Link>
      </div>
    );

  return (
    <div className="container cart-container">

      <h3 className="fw-bold mb-4">🛒 Giỏ hàng của bạn</h3>

      <div className="row">

        {/* LEFT */}
        <div className="col-md-8">
          {cart.map((p) => (
            <div key={p.id} className="cart-item shadow-sm">

              <img src={p.imageUrl} className="cart-img" />

              <div className="cart-info">
                <h5>{p.name}</h5>
                <p className="text-danger fw-bold">
                  {p.price.toLocaleString("vi-VN")}₫
                </p>

                {/* QUANTITY CONTROLS */}
                <div className="qty-controls">
                  <button onClick={() => updateQty(p.id, Math.max(1, p.qty - 1))}>-</button>
                  <span>{p.qty}</span>
                  <button onClick={() => updateQty(p.id, p.qty + 1)}>+</button>
                </div>

                <button
                  className="btn btn-sm btn-outline-danger mt-2"
                  onClick={() => removeItem(p.id)}
                >
                  ❌ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="col-md-4">
          <div className="cart-summary shadow-sm">

            <h4 className="fw-bold">Tổng thanh toán</h4>

            <p className="fs-4 text-danger fw-bold">
              {total.toLocaleString("vi-VN")}₫
            </p>

            <button
              className="btn btn-warning w-100 btn-lg mt-3"
              onClick={() => navigate("/checkout")}
            >
              Tiến hành đặt hàng »
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
