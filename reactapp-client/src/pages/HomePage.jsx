// path: src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";      // 👈 BẠN QUÊN CHỖ NÀY
import api from "../utils/apiClient";
import Header from "../components/Header";
import CategoryMenu from "../components/CategoryMenu";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";

export default function HomePage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-3">

        {/* Banner */}
        <div className="mh-banner mb-4">
          <img src="/banner-mobilehub.png" className="img-fluid rounded" />
        </div>

        {/* Category menu */}
        <CategoryMenu />

        {/* Title + link */}
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-bold mt-4 mb-3">🔥 Điện thoại nổi bật</h3>

          <Link
            to="/products"
            className="text-primary fw-semibold text-decoration-none"
            style={{ fontSize: "16px" }}
          >
            Xem tất cả »
          </Link>
        </div>

        {/* Product grid */}
        <div className="row g-3 mt-2">
          {products.map((p) => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
