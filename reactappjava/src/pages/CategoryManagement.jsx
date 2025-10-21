import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient.js'; 
import styles from '@/styles.js'; 
import CategoryModal from '@/components/CategoryModal.jsx'; 

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try { 
      setLoading(true); 
      // FIX LỖI 403: API này được gọi mà không có token (nhờ apiClient.js đã fix)
      const response = await apiClient.get('/categories'); 
      setCategories(response.data); 
    } 
    catch (err) { 
      setError('Không thể tải danh sách danh mục.'); 
      console.error(err);
    } 
    finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchCategories(); }, []);
  
  const handleOpenAddModal = () => { setEditingCategory(null); setShowModal(true); };
  const handleOpenEditModal = (category) => { setEditingCategory(category); setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); setEditingCategory(null); };

  const handleSave = async (categoryData) => {
    try {
        if (editingCategory) {
            await apiClient.put(`/categories/${editingCategory.id}`, categoryData);
        } else {
            await apiClient.post('/categories', categoryData);
        }
        handleCloseModal();
        fetchCategories();
    } catch (err) {
        alert('Lưu thất bại!');
        console.error(err);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
        try {
            await apiClient.delete(`/categories/${categoryId}`);
            fetchCategories(); 
        } catch (err) {
            alert('Xóa danh mục thất bại!');
            console.error(err);
        }
    }
  };

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
    <div className="card shadow-sm">
      <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Quản lý Danh mục</h3>
        <button className="btn btn-primary" onClick={handleOpenAddModal}><i className="bi bi-plus-circle me-2"></i>Thêm mới</button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Slug</th>
                    <th className="text-end">Hành động</th>
                </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                    <td>
                        <img 
                            src={cat.imageUrl} 
                            alt={cat.name} 
                            style={styles.productImage}
                            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60?text=DM"; }}
                        />
                    </td>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.slug}</td>
                    <td className="text-end">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenEditModal(cat)}><i className="bi bi-pencil-square"></i> Sửa</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(cat.id)}><i className="bi bi-trash"></i> Xóa</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <CategoryModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        category={editingCategory}
        onSave={handleSave}
    />
    </>
  );
}

export default CategoryManagement;