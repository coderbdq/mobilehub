import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="mh-header shadow-sm">
      <div className="container d-flex align-items-center justify-content-between py-2">

        {/* Logo */}
        <Link to="/" className="mh-logo text-decoration-none fw-bold">
          <span className="text-warning">Mobile</span>Hub
        </Link>

        {/* Search box */}
        <div className="mh-search">
          <input
            type="text"
            placeholder="Bạn muốn tìm gì?"
            className="form-control"
          />
        </div>

        {/* Cart + Login */}
        <div className="d-flex gap-3">
          <Link to="/cart" className="mh-icon">
            🛒
          </Link>
          <Link to="/login" className="mh-icon">
            👤
          </Link>
        </div>
      </div>
    </header>
  );
}
