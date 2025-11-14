import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient.js';

function LoginPage({ setAdmin }) {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');
    try {
      const response = await apiClient.post('/auth/signin', { email, password });
      
      localStorage.setItem('adminToken', response.data.token);
      setAdmin(true); 
      
      // FIX: Chuyển hướng về /admin và ÉP TẢI LẠI TRANG
      window.location.href = '/admin'; 
      
    } catch (err) { 
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.'); 
        console.error(err); 
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4">Admin Login</h2>
          <form onSubmit={handleLogin}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3"><label htmlFor="emailInput" className="form-label">Email</label><input type="email" className="form-control" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="mb-4"><label htmlFor="passwordInput" className="form-label">Password</label><input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <div className="d-grid"><button type="submit" className="btn btn-primary btn-lg">Đăng nhập</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
