// path: src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  const handleOrder = () => {
    if (!info.name || !info.phone || !info.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    clearCart();
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="container checkout-container">

      <h3 className="fw-bold mb-4">📦 Thanh toán đơn hàng</h3>

      <div className="row">

        {/* LEFT — FORM */}
        <div className="col-md-7">
          <div className="checkout-box shadow-sm">

            <h5 className="fw-bold mb-3">Thông tin nhận hàng</h5>

            <input
              className="form-control mb-3"
              placeholder="Họ và tên"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />

            <input
              className="form-control mb-3"
              placeholder="Số điện thoại"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Địa chỉ giao hàng"
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
            />

            <h5 className="fw-bold mt-4">Phương thức thanh toán</h5>

            <label className="pay-option">
              <input
                type="radio"
                name="payment"
                checked={info.payment === "cod"}
                onChange={() => setInfo({ ...info, payment: "cod" })}
              />
              Thanh toán khi nhận hàng (COD)
            </label>

            <label className="pay-option">
              <input
                type="radio"
                name="payment"
                checked={info.payment === "bank"}
                onChange={() => setInfo({ ...info, payment: "bank" })}
              />
              Chuyển khoản ngân hàng
            </label>
          </div>
        </div>

        {/* RIGHT — SUMMARY */}
        <div className="col-md-5">
          <div className="checkout-summary shadow-sm">

            <h5 className="fw-bold">Tóm tắt đơn hàng</h5>

            {cart.map((p) => (
              <div key={p.id} className="checkout-item">
                <span>
                  {p.name} × {p.qty}
                </span>
                <span>{(p.price * p.qty).toLocaleString("vi-VN")}₫</span>
              </div>
            ))}

            <hr />

            <h4 className="text-danger fw-bold">
              Tổng cộng: {total.toLocaleString("vi-VN")}₫
            </h4>

            <button
              className="btn btn-warning btn-lg w-100 mt-3"
              onClick={handleOrder}
            >
              Xác nhận đặt hàng »
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
