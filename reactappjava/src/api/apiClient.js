import axios from 'axios'; 

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Danh sách các API công khai (chỉ áp dụng cho phương thức GET)
const PUBLIC_API_PATHS = ['/products', '/categories']; 

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    const url = config.url.split('?')[0]; 
    const method = config.method.toUpperCase();

    // FIX LỖI: Cần so sánh với URL gốc (baseURL + path)
    const isPublicGetApi = (method === 'GET') && 
                           PUBLIC_API_PATHS.some(path => url.startsWith(path));

    if (token) {
        if (isPublicGetApi) {
            // Đây là API public GET, không gửi token
            delete config.headers['Authorization'];
        } else {
            // Đây là API cần bảo mật (PUT/POST/DELETE), GỬI TOKEN
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
