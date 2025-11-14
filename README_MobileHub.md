# 📱 MobileHub – Hệ thống thương mại điện tử bán điện thoại trực tuyến

**MobileHub** là một hệ thống **thương mại điện tử** cho phép người dùng **xem, đặt mua điện thoại trực tuyến**, và **quản trị viên (Admin)** có thể quản lý sản phẩm, đơn hàng, người dùng trong giao diện quản trị riêng.

---

## 🌐 Demo & Cấu trúc hệ thống

```
mobilehub/
│
├── dongquan/           # 🖥️ Backend - Spring Boot (Java 21)
│   ├── src/main/java/com/java/dongquan
│   │   ├── controller/     # Các controller REST API
│   │   ├── dto/            # DTO - truyền dữ liệu giữa frontend/backend
│   │   ├── entity/         # Entity JPA ánh xạ bảng DB
│   │   ├── repository/     # Repository - thao tác database
│   │   ├── service/        # Service - xử lý logic nghiệp vụ
│   │   └── config/         # Cấu hình Spring Security, JWT, CORS,...
│   ├── pom.xml             # File cấu hình Maven
│   └── ...
│
├── webapp/              # 💻 Frontend - React 19 (hoặc React Admin)
│   ├── src/
│   │   ├── pages/        # Giao diện trang chính & admin
│   │   ├── api/          # Cấu hình Axios gọi API backend
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Công nghệ sử dụng

### 🔹 Backend (Java Spring Boot)
- **Spring Boot 3.3.0**
- **Spring Security + JWT Authentication**
- **Spring Data JPA + MySQL**
- **Springdoc OpenAPI (Swagger UI)**
- **Lombok** – giảm boilerplate code
- **BCryptPasswordEncoder** – mã hoá mật khẩu

### 🔹 Frontend (React)
- **React 19 + Vite**
- **Axios** – gọi API từ backend
- **Bootstrap 5 / TailwindCSS**
- **React Router** – điều hướng trang
- **LocalStorage** – lưu token người dùng

---

## 🧠 Mục tiêu đề tài

- Xây dựng hệ thống bán hàng điện thoại trực tuyến (frontend + backend)
- Quản lý sản phẩm, người dùng, đơn hàng dễ dàng
- Sử dụng JWT để đảm bảo **xác thực và phân quyền**
- Áp dụng **mô hình kiến trúc 3 lớp**: Controller → Service → Repository
- Thực hiện **CRUD** đầy đủ cho Admin và User

---

## 🔐 Quy trình đăng nhập & xác thực

1. Người dùng hoặc admin **đăng nhập** qua `/api/auth/signin`
2. Backend (Spring Boot) **xác thực tài khoản** qua `AuthenticationManager`
3. Nếu hợp lệ → sinh **JWT Token** qua `JwtService.java`
4. Token này được gửi về frontend:
   ```json
   { "token": "<JWT_TOKEN>" }
   ```
5. Token được lưu trong `localStorage` và gửi kèm mỗi request:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```
6. Các API có phân quyền:
   - `/api/auth/**` → public
   - `/api/products/**`, `/api/categories/**` → public GET
   - `/api/admin/**` → chỉ dành cho ADMIN
   - `/api/cart/**`, `/api/orders/**` → yêu cầu đăng nhập USER

---

## 💾 Lưu trữ hình ảnh sản phẩm

- Ảnh hiện đang được lưu trong **thư mục backend** (`dongquan/src/main/resources/static/images/`)
- Được truy cập công khai qua URL:
  ```
  http://localhost:8080/images/<tên_ảnh>
  ```
- Nếu muốn đổi sang ảnh mạng (URL ngoài):
  - Cập nhật `imageUrl` trong database thành link online (VD: `https://cdn.tgdd.vn/...jpg`)
  - React sẽ tự hiển thị ảnh theo URL đó.

---

## 🚀 Hướng dẫn chạy dự án

### 🖥️ 1. Chạy Backend (Spring Boot)

**Yêu cầu:** Java 21, Maven, MySQL 8+

```bash
cd dongquan
mvn clean install
mvn spring-boot:run
```

📦 Server chạy tại:  
👉 `http://localhost:8080`

Swagger UI:  
👉 `http://localhost:8080/swagger-ui/index.html`

---

### 💻 2. Chạy Frontend (React)

**Yêu cầu:** Node.js 18+

```bash
cd webapp
npm install
npm run dev
```

🌐 Frontend chạy tại:  
👉 `http://localhost:5173`

---

## 🧩 API Chính

| API Endpoint                | Method | Mô tả                            |
|-----------------------------|--------|----------------------------------|
| `/api/auth/signup`          | POST   | Đăng ký tài khoản mới            |
| `/api/auth/signin`          | POST   | Đăng nhập, trả về JWT Token      |
| `/api/products`             | GET    | Xem danh sách sản phẩm           |
| `/api/categories`           | GET    | Xem danh mục sản phẩm            |
| `/api/cart`                 | GET    | Xem giỏ hàng (USER)              |
| `/api/orders`               | POST   | Tạo đơn hàng mới (USER)          |
| `/api/admin/users`          | GET    | Quản lý người dùng (ADMIN)       |
| `/api/admin/orders`         | GET    | Quản lý đơn hàng (ADMIN)         |

---

## 🧑‍💼 Thành viên thực hiện

**👤 Bạch Đông Quân**  
📘 Ngành: Công nghệ Thông tin – K47  
🏫 Trường Cao đẳng Công Thương TP. Hồ Chí Minh (HITC)

---

## 🌟 Ghi chú thêm

- Có thể mở rộng module thanh toán (VNPay / MoMo)
- Tích hợp REST API cho mobile app React Native
- Dễ dàng deploy lên **Render / Railway / Vercel**

---

## 📷 Giao diện mẫu

| Trang đăng nhập | Trang admin | Trang sản phẩm |
|-----------------|--------------|----------------|
| ![Login](https://i.imgur.com/0VH1yPM.png) | ![Admin](https://i.imgur.com/9WcOdLp.png) | ![Products](https://i.imgur.com/UZ0dU9x.png) |

---

> 📌 *Đồ án được phát triển nhằm mục đích học tập và nghiên cứu tại HITC.  
> Mọi bản quyền thuộc về nhóm sinh viên thực hiện dự án MobileHub.*
