/* 1. Tạo database */
CREATE DATABASE mobilehub
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

/* 2. Tạo user (Bạn có thể dùng user 'root' có sẵn nếu đang ở local, nhưng tạo user riêng sẽ bảo mật hơn) */
CREATE USER 'mobilehub'@'localhost' IDENTIFIED BY 'mobilehub123';

/* 3. Cấp quyền cho user trên database */
GRANT ALL PRIVILEGES ON mobilehub.* TO 'mobilehub'@'localhost';

/* 4. Refresh lại quyền */
FLUSH PRIVILEGES;

/* 5. Chọn database để bắt đầu tạo bảng */
USE mobilehub;
/* --- Bảng Danh mục (category) --- */
CREATE TABLE category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* --- Bảng Sản phẩm (product) --- */
CREATE TABLE product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    color VARCHAR(50),
    ram VARCHAR(50),
    storage VARCHAR(50),
    screen_size VARCHAR(50),
    description TEXT,
    image_url VARCHAR(1000), /* Thêm trường ảnh */
    stock_quantity INT DEFAULT 0, /* Thêm số lượng tồn kho */
    
    category_id BIGINT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES category(id)
);

/* --- Bảng Người dùng (app_user) --- */
CREATE TABLE app_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, /* Sẽ là 'ROLE_USER' hoặc 'ROLE_ADMIN' */
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/* --- (Chúng ta sẽ thêm bảng cart, order, order_detail ở giai đoạn sau) --- */