import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient.js'; 
import styles from '@/styles.js'; 

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try { 
                setLoading(true); 
                const response = await apiClient.get('/admin/orders'); 
                setOrders(response.data); 
            } 
            catch (err) { 
                setError('Không thể tải danh sách đơn hàng.'); 
                console.error(err);
            } 
            finally { 
                setLoading(false); 
            } 
        }; 
        fetchOrders(); 
    }, []);

    if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-white py-3"><h3 className="mb-0">Quản lý Đơn hàng</h3></div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr><th>ID</th><th>Khách hàng</th><th>Địa chỉ</th><th>Tổng tiền</th><th>Trạng thái</th><th>Hành động</th></tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td><td>{order.customerName}</td><td>{order.shippingAddress}</td>
                                    <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</td>
                                    <td><span className="badge bg-info">{order.status}</span></td>
                                    <td><button className="btn btn-sm btn-outline-primary"><i className="bi bi-eye-fill"></i> Xem</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderManagement;
