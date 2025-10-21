import axios from 'axios'; 

// Cấu hình Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Danh sách các API công khai KHÔNG NÊN gửi token
const PUBLIC_API_PATHS = ['/products', '/categories']; 

// Interceptor để tự động đính kèm token vào mỗi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    const url = config.url.split('?')[0]; // Lấy phần đường dẫn chính

    // FIX LỖI 403: KHÔNG gửi token nếu API là public
    const isPublicApi = PUBLIC_API_PATHS.some(path => url.includes(path));

    if (token && isPublicApi) {
        // RẤT QUAN TRỌNG: Nếu là API Public, xóa header Authorization
        delete config.headers['Authorization'];
    } else if (token) {
        // Nếu là API cần bảo mật, gửi token
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
