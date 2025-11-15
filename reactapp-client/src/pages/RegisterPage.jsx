// path: reactapp-client/src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userApiClient from "../api/userApiClient";

function RegisterPage() {
  const [username, setUsername] = useState("user1");
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await userApiClient.post("/auth/signup", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="container py-4 d-flex justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: 400, width: "100%" }}>
        <div className="card-body">
          <h4 className="mb-3 text-center">Đăng ký</h4>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên đăng nhập</label>
              <input
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success w-100" type="submit">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
