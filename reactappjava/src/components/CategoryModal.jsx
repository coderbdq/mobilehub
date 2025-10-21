import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient.js'; 
import styles from '@/styles.js'; // styles.productImage

function CategoryModal({ show, handleClose, category, onSave }) {
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null); // State cho file được chọn

    useEffect(() => {
        if (show) {
            if (category) {
                setFormData({ ...category });
            } else {
                setFormData({ name: '', slug: '', imageUrl: '' }); // Dùng imageUrl
            }
            setSelectedFile(null);
        }
    }, [category, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let finalData = { ...formData };

        // Logic upload ảnh (tương tự ProductModal)
        if (selectedFile) {
            const uploadData = new FormData();
            uploadData.append('file', selectedFile);
            try {
                const res = await apiClient.post('/files/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                finalData.imageUrl = res.data.url;
            } catch (err) {
                alert('Upload hình ảnh thất bại!');
                console.error(err);
                return;
            }
        }
        onSave(finalData);
    };

    if (!show) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">{category ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                           <div className="mb-3">
                               <label className="form-label">Tên danh mục</label>
                               <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleChange} required />
                           </div>
                           <div className="mb-3">
                               <label className="form-label">Slug (đường dẫn)</label>
                               <input type="text" className="form-control" name="slug" value={formData.slug || ''} onChange={handleChange} required />
                           </div>
                           {/* THAY ĐỔI: Chuyển sang Input File */}
                           <div className="mb-3">
                               <label className="form-label">Hình ảnh Danh mục</label>
                               <input type="file" className="form-control" onChange={handleFileChange} />
                               {formData.imageUrl && !selectedFile && <img src={formData.imageUrl} alt="Preview" className="mt-2" style={{ width: '100px' }} />}
                           </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Đóng</button>
                            <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;