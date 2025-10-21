import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import các Components/Pages đã được tách
import LoginPage from '@/pages/LoginPage.jsx';
import AdminLayout from '@/components/AdminLayout.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import DashboardHome from '@/pages/DashboardHome.jsx';
import ProductManagement from '@/pages/ProductManagement.jsx';
import CategoryManagement from '@/pages/CategoryManagement.jsx';
import UserManagement from '@/pages/UserManagement.jsx';
import OrderManagement from '@/pages/OrderManagement.jsx';

function App() {
  const [isAdmin, setAdmin] = useState(!!localStorage.getItem('adminToken'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setAdmin={setAdmin} />} />
        <Route path="/admin" element={<ProtectedRoute isAdmin={isAdmin}><AdminLayout setAdmin={setAdmin} /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<OrderManagement />} />
        </Route>
        <Route path="*" element={<Navigate to={isAdmin ? "/admin" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
