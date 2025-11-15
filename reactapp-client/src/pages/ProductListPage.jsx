// path: reactapp-client/src/pages/ProductListPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/apiClient";
import ProductCard from "../components/ProductCard";
import "./ProductListPage.css";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Filters (đọc từ URL)
  const q = searchParams.get("q") || "";
  const brand = searchParams.get("brand") || "";
  const price = searchParams.get("price") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    loadProducts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [q, brand, price, sort]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products", {
        params: { q, brand, price, sort },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async () => {
    try {
      const res = await api.get("/products/brands");
      setBrands(res.data);
    } catch (err) {
      console.error("Lỗi tải brand:", err);
    }
  };

  // Cập nhật filter vào URL
  const updateFilter = (key, value) => {
    if (value === "") searchParams.delete(key);
    else searchParams.set(key, value);

    setSearchParams(searchParams);
  };

  const clearAll = () => {
    setSearchParams({});
  };

  return (
    <div className="container mt-4">

      <div className="row">

        {/* Sidebar Filters */}
        <div className="col-md-3">
          <div className="filter-box shadow-sm">

            <h5 className="filter-title">Bộ lọc</h5>

            {/* Tìm kiếm */}
            <div className="filter-section">
              <label className="filter-label">Tìm kiếm</label>
              <input
                className="form-control"
                placeholder="Tên sản phẩm..."
                value={q}
                onChange={(e) => updateFilter("q", e.target.value)}
              />
            </div>

            {/* Brand filter */}
            <div className="filter-section">
              <label className="filter-label">Hãng</label>
              {brands.map((b) => (
                <div key={b}>
                  <input
                    type="radio"
                    name="brand"
                    checked={brand === b}
                    onChange={() => updateFilter("brand", b)}
                  />{" "}
                  {b}
                </div>
              ))}

              <button
                className="btn btn-sm btn-secondary mt-2"
                onClick={() => updateFilter("brand", "")}
              >
                Xóa lọc hãng
              </button>
            </div>

            {/* Price filter */}
            <div className="filter-section">
              <label className="filter-label">Khoảng giá</label>

              <div>
                <input
                  type="radio"
                  name="price"
                  checked={price === "0-5000000"}
                  onChange={() => updateFilter("price", "0-5000000")}
                />{" "}
                Dưới 5 triệu
              </div>

              <div>
                <input
                  type="radio"
                  name="price"
                  checked={price === "5000000-15000000"}
                  onChange={() => updateFilter("price", "5000000-15000000")}
                />{" "}
                5 - 15 triệu
              </div>

              <div>
                <input
                  type="radio"
                  name="price"
                  checked={price === "15000000-30000000"}
                  onChange={() => updateFilter("price", "15000000-30000000")}
                />{" "}
                15 - 30 triệu
              </div>

              <button
                className="btn btn-sm btn-secondary mt-2"
                onClick={() => updateFilter("price", "")}
              >
                Xóa lọc giá
              </button>
            </div>

            {/* Sort filter */}
            <div className="filter-section">
              <label className="filter-label">Sắp xếp</label>
              <select
                className="form-control"
                value={sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
              >
                <option value="">Mặc định</option>
                <option value="price_asc">Giá tăng dần</option>
                <option value="price_desc">Giá giảm dần</option>
              </select>
            </div>

            <button
              className="btn btn-danger w-100 mt-3"
              onClick={clearAll}
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="col-md-9">

          <h4 className="mb-3">
            Kết quả tìm kiếm ({products.length} sản phẩm)
          </h4>

          {loading && <p>Đang tải sản phẩm...</p>}

          {!loading && products.length === 0 && (
            <p>❌ Không tìm thấy sản phẩm phù hợp.</p>
          )}

          <div className="row g-3">
            {products.map((p) => (
              <div className="col-6 col-md-4 col-lg-3" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
