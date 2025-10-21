// src/main/java/com/java/dongquan/repository/OrderRepository.java
package com.java.dongquan.repository;

import com.java.dongquan.entity.AppUser;
import com.java.dongquan.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Tìm tất cả đơn hàng của một người dùng, sắp xếp theo ngày gần nhất
    List<Order> findByUserOrderByOrderDateDesc(AppUser user);
}