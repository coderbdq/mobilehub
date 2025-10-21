import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient.js'; 
import ProductModal from '@/components/ProductModal.jsx'; 
import styles from '@/styles.js'; 

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // FIX: CHỈ TẢI SẢN PHẨM Ở ĐÂY, VÀ TẢI CATEGORY KHI MỞ MODAL
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productsRes = await apiClient.get('/products');
            setProducts(productsRes.data);
            // Tải Categories chỉ một lần khi cần
            const categoriesRes = await apiClient.get('/categories');
            setCategories(categoriesRes.data); 
        } catch (err) {
            setError('Không thể tải dữ liệu.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleOpenAddModal = () => { setEditingProduct(null); setShowModal(true); };
    const handleOpenEditModal = (product) => { setEditingProduct(product); setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false); setEditingProduct(null); };

    const handleSave = async (productData) => {
        try {
            if (editingProduct) {
                await apiClient.put(`/products/${editingProduct.id}`, productData);
            } else {
                await apiClient.post('/products', productData);
            }
            handleCloseModal();
            fetchProducts();
        } catch (err) { alert('Lưu thất bại!'); console.error(err); }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await apiClient.delete(`/products/${productId}`);
                fetchProducts(); 
            } catch (err) { alert('Xóa sản phẩm thất bại!'); console.error(err); }
        }
    };

    if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
  
    return (
      <>
        <div className="card shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Quản lý Sản phẩm</h3>
            <button className="btn btn-primary" onClick={handleOpenAddModal}><i className="bi bi-plus-circle me-2"></i>Thêm mới</button>
            </div>
            <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr><th>Hình ảnh</th><th>ID</th><th>Tên sản phẩm</th><th>Thương hiệu</th><th>Giá</th><th className="text-end">Hành động</th></tr>
                </thead>
                <tbody>
                    {products.map(prod => (
                    <tr key={prod.id}>
                        <td><img src={prod.imageUrl} alt={prod.name} style={styles.productImage} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60?text=SP"; }} /></td>
                        <td>{prod.id}</td><td>{prod.name}</td><td>{prod.brand}</td><td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}</td>
                        <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenEditModal(prod)}><i className="bi bi-pencil-square"></i> Sửa</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(prod.id)}><i className="bi bi-trash"></i> Xóa</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        <ProductModal show={showModal} handleClose={handleCloseModal} product={editingProduct} categories={categories} onSave={handleSave} />
      </>
    );
}

export default ProductManagement;