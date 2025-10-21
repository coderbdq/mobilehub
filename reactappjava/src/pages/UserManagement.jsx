import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient.js'; 
import styles from '@/styles.js'; 

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try { 
                setLoading(true); 
                const response = await apiClient.get('/admin/users'); 
                setUsers(response.data); 
            } 
            catch (err) { 
                setError('Không thể tải danh sách người dùng.'); 
                console.error(err);
            } 
            finally { 
                setLoading(false); 
            } 
        }; 
        fetchUsers(); 
    }, []);

    if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return ( 
        <div className="card shadow-sm"> 
            <div className="card-header bg-white py-3"><h3 className="mb-0">Quản lý Người dùng</h3></div> 
            <div className="card-body"> 
                <div className="table-responsive"> 
                    <table className="table table-striped table-hover align-middle"> 
                        <thead className="table-dark"> 
                            <tr><th>ID</th><th>Username</th><th>Email</th><th>Quyền</th><th>Hành động</th></tr> 
                        </thead> 
                        <tbody> 
                            {users.map(user => ( 
                                <tr key={user.id}> 
                                    <td>{user.id}</td><td>{user.username}</td><td>{user.email}</td> 
                                    <td><span className={`badge ${user.role === 'ROLE_ADMIN' ? 'bg-success' : 'bg-secondary'}`}>{user.role}</span></td> 
                                    <td><button className="btn btn-sm btn-outline-primary"><i className="bi bi-pencil-square"></i> Sửa</button></td> 
                                </tr> 
                            ))} 
                        </tbody> 
                    </table> 
                </div> 
            </div> 
        </div> 
    );
}

export default UserManagement;
