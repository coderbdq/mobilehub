-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2025 lúc 01:00 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `mobilehub`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `app_user`
--

CREATE TABLE `app_user` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `app_user`
--

INSERT INTO `app_user` (`id`, `created_at`, `email`, `first_name`, `last_name`, `password`, `role`, `updated_at`, `username`) VALUES
(1, '2025-10-22 00:30:09.000000', 'test@gmail.com', NULL, NULL, '$2a$10$1wRo.CzC/FhspD3McceIN.Z3blNjO7yWOI.rFrYqMb0sZNcmNwSkK', 'ROLE_USER', '2025-10-22 00:30:09.000000', 'dongquan'),
(2, '2025-10-22 00:35:20.000000', 'admin@gmail.com', 'Admin', 'User', '$2a$10$v9YTyKI/Y/Z9NNCm.6YO4uU9ZdJt1yY/gukwcxPZG.IlT2GTWE4Py', 'ROLE_ADMIN', '2025-10-22 00:35:20.000000', 'admin'),
(3, '2025-10-22 01:12:07.000000', 'user@gmail.com', NULL, NULL, '$2a$10$oUzu73dA1uYJ61FpYNcWwuXmL4krt0KIfMr/wMjJ.O3Wfmt4alCKC', 'ROLE_USER', '2025-10-22 01:12:07.000000', 'nguoidung');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_item`
--

CREATE TABLE `cart_item` (
  `id` bigint(20) NOT NULL,
  `cart_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price_per_item` decimal(38,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_item`
--

INSERT INTO `cart_item` (`id`, `cart_id`, `product_id`, `quantity`, `price_per_item`, `created_at`, `updated_at`) VALUES
(6, 6, 3, 1, 28990000.00, '2025-10-21 19:01:29', '2025-10-21 19:01:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `created_at`, `name`, `slug`, `updated_at`, `image_url`) VALUES
(1, '2025-10-22 00:36:46.000000', 'Apple iPhone', 'apple-iphone', '2025-10-22 05:45:35.000000', 'http://localhost:8080/images/8ffb25e3-b3ae-434c-b2da-33161af10e6c.png'),
(2, '2025-10-22 01:00:23.000000', 'Laptop', 'laptop', '2025-10-22 05:46:13.000000', 'http://localhost:8080/images/f45f6223-ba3b-4282-a0b5-1a13fb41d889.png'),
(3, '2025-10-22 05:46:31.000000', 'Phụ Kiện', 'phu-kien', '2025-10-22 05:46:31.000000', 'http://localhost:8080/images/8867ced0-f4e3-41fe-9e18-8d867d30ff46.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(38,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `total_amount`, `status`, `customer_name`, `shipping_address`, `phone_number`) VALUES
(1, 3, '2025-10-21 18:52:02', 28990000.00, 'PENDING', 'Bạch Đông Quân', '123 Đường Công Nghệ, Phường 1, Quận Gò Vấp, TP.HCM', '0901234567');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(38,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, NULL, 1, 28990000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `screen_size` varchar(255) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL,
  `storage` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `brand`, `color`, `created_at`, `description`, `image_url`, `name`, `price`, `ram`, `screen_size`, `stock_quantity`, `storage`, `updated_at`, `category_id`) VALUES
(3, 'Apple', 'Titan Trắng', '2025-10-22 01:01:18.000000', 'Chip A17 Pro mạnh mẽ.', 'http://localhost:8080/images/a79b525e-5d49-4187-b10e-8927e90b4222.png', 'iPhone 15 Pro', 28990001.00, '8GB', '6.1 inch', 100, '128GB', '2025-10-22 05:43:21.000000', 1),
(4, 'Apple', 'Titan Trắng', '2025-10-22 01:01:31.000000', 'Chip A17 Pro mạnh mẽ.', 'http://localhost:8080/images/779013d9-8b10-4285-8249-72bad226692a.png', 'iPhone 15 Pro', 28990000.00, '8GB', '6.1 inch', 100, '128GB', '2025-10-22 05:43:46.000000', 1),
(5, 'Samsung', 'Titan Xám', '2025-10-22 01:05:53.000000', 'Galaxy AI tích hợp. Camera zoom quang học 10x.', 'http://localhost:8080/images/d63ff84c-f993-4bdd-a29b-889e7c9aca8c.png', 'Samsung Galaxy S24 Ultra', 33990000.00, '12GB', '6.8 inch', 50, '256GB', '2025-10-22 05:44:20.000000', 1),
(8, 'Samsung', 'Titan Trắng', '2025-10-22 05:45:03.000000', 'adasdadas', 'http://localhost:8080/images/e2491fb7-ad46-4e5a-ae2e-eb27783473b3.png', 'Samsung Galaxy S24 Ultraeee', 213231.00, '8GB', '6.1 inch', 0, '128GB', '2025-10-22 05:45:03.000000', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shopping_cart`
--

CREATE TABLE `shopping_cart` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `total_price` decimal(38,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `shopping_cart`
--

INSERT INTO `shopping_cart` (`id`, `user_id`, `total_price`, `created_at`, `updated_at`) VALUES
(6, 3, 28990000.00, '2025-10-21 19:01:28', '2025-10-21 19:01:29');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK1j9d9a06i600gd43uu3km82jw` (`email`),
  ADD UNIQUE KEY `UK3k4cplvh82srueuttfkwnylq0` (`username`);

--
-- Chỉ mục cho bảng `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKhqknmjh5423vchi4xkyhxlhg2` (`slug`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`);

--
-- Chỉ mục cho bảng `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `app_user`
--
ALTER TABLE `app_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `shopping_cart`
--
ALTER TABLE `shopping_cart`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `shopping_cart` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `shopping_cart`
--
ALTER TABLE `shopping_cart`
  ADD CONSTRAINT `shopping_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `app_user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
