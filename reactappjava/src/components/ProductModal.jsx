import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient.js'; 
import styles from '@/styles.js'; 

function ProductModal({ show, handleClose, product, categories, onSave }) {
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null); 

    useEffect(() => {
        if (show) {
            if (product) {
                setFormData({ ...product });
            } else {
                setFormData({ name: '', brand: '', price: '', color: '', ram: '', storage: '', screenSize: '', description: '', imageUrl: '', stockQuantity: 0, categoryId: categories[0]?.id || '' });
            }
            setSelectedFile(null); 
        }
    }, [product, show, categories]);

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
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header"><h5 className="modal-title">{product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h5><button type="button" className="btn-close" onClick={handleClose}></button></div>
                        <div className="modal-body">
                           <div className="row">
                               <div className="col-md-6 mb-3"><label className="form-label">Tên sản phẩm</label><input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleChange} required /></div>
                               <div className="col-md-6 mb-3"><label className="form-label">Thương hiệu</label><input type="text" className="form-control" name="brand" value={formData.brand || ''} onChange={handleChange} /></div>
                           </div>
                           <div className="row">
                               <div className="col-md-6 mb-3"><label className="form-label">Giá</label><input type="number" className="form-control" name="price" value={formData.price || ''} onChange={handleChange} required /></div>
                               <div className="col-md-6 mb-3"><label className="form-label">Danh mục</label>
                                    <select className="form-select" name="categoryId" value={formData.categoryId || ''} onChange={handleChange} required>
                                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                    </select>
                               </div>
                           </div>
                           <div className="mb-3"><label className="form-label">Mô tả</label><textarea className="form-control" name="description" value={formData.description || ''} onChange={handleChange}></textarea></div>
                           <div className="mb-3">
                               <label className="form-label">Hình ảnh</label>
                               <input type="file" className="form-control" onChange={handleFileChange} />
                               {formData.imageUrl && !selectedFile && <img src={formData.imageUrl} alt="Preview" className="mt-2" style={{ width: '100px' }} />}
                           </div>
                           <div className="row">
                               <div className="col-md-6 mb-3"><label className="form-label">Màu sắc</label><input type="text" className="form-control" name="color" value={formData.color || ''} onChange={handleChange} /></div>
                               <div className="col-md-6 mb-3"><label className="form-label">Số lượng</label><input type="number" className="form-control" name="stockQuantity" value={formData.stockQuantity || 0} onChange={handleChange} /></div>
                           </div>
                           <div className="row">
                               <div className="col-md-4 mb-3"><label className="form-label">RAM</label><input type="text" className="form-control" name="ram" value={formData.ram || ''} onChange={handleChange} /></div>
                               <div className="col-md-4 mb-3"><label className="form-label">Bộ nhớ</label><input type="text" className="form-control" name="storage" value={formData.storage || ''} onChange={handleChange} /></div>
                               <div className="col-md-4 mb-3"><label className="form-label">Màn hình</label><input type="text" className="form-control" name="screenSize" value={formData.screenSize || ''} onChange={handleChange} /></div>
                           </div>
                        </div>
                        <div className="modal-footer"><button type="button" className="btn btn-secondary" onClick={handleClose}>Đóng</button><button type="submit" className="btn btn-primary">Lưu thay đổi</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductModal;
