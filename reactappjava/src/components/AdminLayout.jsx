import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import styles from '@/styles.js'; // Import CSS

function AdminLayout({ setAdmin }) {
    const navigate = useNavigate();

    const handleLogout = () => { 
        localStorage.removeItem('adminToken'); 
        setAdmin(false); 
        navigate('/login'); 
    };

    const navLinkStyles = ({ isActive }) => ({ 
        ...styles.navLink, 
        ...(isActive ? styles.navLinkActive : {}) 
    });

    return ( 
        <div style={styles.adminWrapper}> 
            <aside style={styles.sidebar}> 
                <div style={styles.sidebarHeader}><i className="bi bi-phone-vibrate-fill me-2"></i>MobileHub</div> 
                <ul style={styles.navList}> 
                    <li><NavLink to="/admin" end style={navLinkStyles}><i className="bi bi-grid-1x2-fill me-2"></i>Dashboard</NavLink></li> 
                    <li><NavLink to="/admin/products" style={navLinkStyles}><i className="bi bi-box-seam-fill me-2"></i>Quản lý Sản phẩm</NavLink></li> 
                    <li><NavLink to="/admin/categories" style={navLinkStyles}><i className="bi bi-tag-fill me-2"></i>Quản lý Danh mục</NavLink></li> 
                    <li><NavLink to="/admin/users" style={navLinkStyles}><i className="bi bi-people-fill me-2"></i>Quản lý User</NavLink></li> 
                    <li><NavLink to="/admin/orders" style={navLinkStyles}><i className="bi bi-cart-check-fill me-2"></i>Quản lý Đơn hàng</NavLink></li> 
                </ul> 
                <button onClick={handleLogout} className="btn btn-danger" style={styles.logoutButton}><i className="bi bi-box-arrow-left me-2"></i>Đăng xuất</button> 
            </aside> 
            <main style={styles.content}><Outlet /></main> 
        </div> 
    );
}

export default AdminLayout;
