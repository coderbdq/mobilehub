// path: reactapp-client/src/components/ProductCard.jsx

import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="text-decoration-none">
      <div className="card product-card shadow-sm">

        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-img"
        />

        <div className="card-body">
          <h6 className="product-name">{product.name}</h6>
          <p className="product-price">{product.price.toLocaleString("vi-VN")}₫</p>
          <p className="product-info text-muted">
            {product.ram} / {product.storage}
          </p>
        </div>

      </div>
    </Link>
  );
}
