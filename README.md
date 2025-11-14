# 📱 MobileHub – Hệ thống bán điện thoại trực tuyến

> Đồ án cuối khóa Java Spring Boot – HITC  
> **Sinh viên thực hiện:** Bạch Đông Quân  
> **Lớp:** CNTT K47  
> **Trường:** Cao đẳng Công Thương TP. Hồ Chí Minh (HITC)

---

## 🧩 1️⃣ Giới thiệu đề tài
**MobileHub** là hệ thống thương mại điện tử mini cho phép người dùng mua bán điện thoại và phụ kiện trực tuyến.  
Ứng dụng được xây dựng theo mô hình **RESTful API** sử dụng **Spring Boot**, **JWT Authentication**, và **MySQL**.

---

## ⚙️ 2️⃣ Kiến trúc hệ thống

```
[ React Frontend (Vite, port 5173) ]
              │
              ▼
[ Spring Boot Backend (port 8080) ]
              │
              ▼
[ MySQL Database - mobilehub ]
```

---

## 🧰 3️⃣ Công nghệ sử dụng

| Thành phần | Công nghệ |
|-------------|------------|
| Backend | Spring Boot 3.5.6 (Java 21) |
| Bảo mật | Spring Security + JWT |
| CSDL | MySQL 8.0 / H2 (Dev) |
| API Docs | Springdoc OpenAPI (Swagger UI) |
| Quản lý gói | Maven Wrapper |
| Frontend | React (Vite) – port 5173 |
| IDE | IntelliJ IDEA / VS Code |
| Quản lý dự án | GitHub |

---

## 📂 4️⃣ Cấu trúc thư mục

```
mobilehub/
 ├─ src/
 │   ├─ main/
 │   │   ├─ java/com/java/dongquan/
 │   │   │   ├─ config/
 │   │   │   ├─ controller/
 │   │   │   ├─ entity/
 │   │   │   ├─ repository/
 │   │   │   ├─ security/
 │   │   │   ├─ service/
 │   │   │   └─ util/
 │   │   └─ resources/
 │   │       ├─ application.properties
 │   │       └─ application-dev.properties
 ├─ docs/
 │   └─ mobilehub.sql
 ├─ pom.xml
 └─ README.md
```

---

## 🔐 5️⃣ Cấu hình bảo mật (JWT + ROLE)
| Role | Quyền |
|------|--------|
| `ROLE_USER` | Đăng ký, đăng nhập, xem sản phẩm, thêm giỏ hàng |
| `ROLE_ADMIN` | Quản lý danh mục, CRUD sản phẩm, xem đơn hàng |

---

## 🚀 6️⃣ Cách chạy Backend

### ✅ 1. Clone project
```bash
git clone https://github.com/coderbdq/dajvfinal.git
cd dajvfinal
```

### ✅ 2. Cấu hình MySQL
Tạo database:
```sql
CREATE DATABASE mobilehub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Cập nhật file:
```
src/main/resources/application.properties
```
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mobilehub?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 💾 7️⃣ Import database mẫu

Nếu bạn muốn sử dụng dữ liệu mẫu (đã có sẵn danh mục, sản phẩm, user, admin):

1. Mở **phpMyAdmin** hoặc **MySQL Workbench**  
2. Tạo database:
   ```sql
   CREATE DATABASE mobilehub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Import file:
   ```
   docs/mobilehub.sql
   ```
   hoặc dùng CLI:
   ```bash
   mysql -u root -p mobilehub < docs/mobilehub.sql
   ```

4. Kiểm tra tài khoản:
   ```sql
   SELECT * FROM app_user;
   ```
   → Có sẵn:
   - admin@gmail.com / admin123 → ROLE_ADMIN  
   - user@gmail.com / user123 → ROLE_USER

---

## 🧪 8️⃣ API chính

| Endpoint | Method | Mô tả |
|-----------|---------|-------|
| `/api/auth/register` | POST | Đăng ký tài khoản |
| `/api/auth/login` | POST | Đăng nhập (JWT) |
| `/api/products` | GET | Danh sách sản phẩm |
| `/api/products/{id}` | GET | Chi tiết sản phẩm |
| `/api/products` | POST | Thêm sản phẩm *(Admin)* |
| `/api/products/{id}` | PUT | Cập nhật sản phẩm *(Admin)* |
| `/api/products/{id}` | DELETE | Xóa sản phẩm *(Admin)* |

Swagger UI:  
🔗 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 💡 9️⃣ Tài khoản mặc định

| Email | Mật khẩu | Quyền |
|--------|-----------|--------|
| admin@gmail.com | admin123 | ROLE_ADMIN |
| user@gmail.com | user123 | ROLE_USER |

---

## 🌐 🔟 Frontend (React Vite)
Chạy frontend (port 5173):

```bash
npm install
npm run dev
```

Truy cập tại:  
🔗 [http://localhost:5173](http://localhost:5173)

---

## 🧭 11️⃣ Định hướng phát triển
- Tích hợp thanh toán VNPay / MoMo  
- Thêm module giỏ hàng & đơn hàng chi tiết  
- Tối ưu SEO, responsive UI  
- Triển khai Docker Compose hoặc Render Cloud  

---

## 👨‍💻 12️⃣ Tác giả

**Bạch Đông Quân (coderbdq)**  
📧 Email: [bachdongquan@gmail.com](mailto:admin@mobilehub.dev)  
💻 GitHub: [https://github.com/coderbdq](https://github.com/coderbdq)  
📦 Repo: [https://github.com/coderbdq/dajvfinal](https://github.com/coderbdq/dajvfinal)

---

> 🔥 *Đề tài “MobileHub – Hệ thống bán điện thoại trực tuyến” giúp sinh viên hiểu rõ quy trình phát triển ứng dụng fullstack hiện đại với Spring Boot và React (Vite).*
