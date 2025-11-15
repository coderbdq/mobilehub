// path: reactapp-client/src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          MobileHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Điện thoại
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <NavLink className="nav-link" to="/cart">
                Giỏ hàng
              </NavLink>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Đăng ký
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center text-white me-2">
                  <small className="text-light">
                    {localStorage.getItem("userEmail") || "User"}
                  </small>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
