// path: src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/apiClient";
import Header from "../components/Header";

import { useCart } from "../context/CartContext";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);

      const brand = encodeURIComponent(res.data.brand);
      const relatedRes = await api.get(`/products?brand=${brand}`);

      setRelated(relatedRes.data.filter((p) => p.id !== res.data.id));
    } catch (err) {
      console.error("Lỗi tải chi tiết sản phẩm:", err);
    }
    setLoading(false);
  };

  if (loading || !product) return <p className="text-center mt-4">Đang tải...</p>;

  return (
    <>
      <Header />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-5 text-center">
            <img src={product.imageUrl} className="pd-img shadow-sm" alt={product.name} />
          </div>

          <div className="col-md-7">
            <h2 className="pd-title">{product.name}</h2>

            <p className="pd-price">
              {product.price.toLocaleString("vi-VN")}₫
            </p>

            <button
              className="btn btn-warning btn-lg mt-3"
              onClick={() => {
                addToCart(product);
                alert("Đã thêm vào giỏ hàng!");
              }}
            >
              🛒 Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* RELATED */}
        <h3 className="fw-bold mt-5">🔍 Sản phẩm cùng hãng</h3>

        <div className="row g-3 mt-2">
          {related.map((p) => (
            <div className="col-6 col-md-3" key={p.id}>
              <Link to={`/products/${p.id}`} className="text-decoration-none">
                <div className="card pd-related-card shadow-sm">
                  <img src={p.imageUrl} className="pd-related-img" alt={p.name} />
                  <div className="card-body">
                    <h6 className="pd-related-name">{p.name}</h6>
                    <p className="pd-related-price">
                      {p.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
