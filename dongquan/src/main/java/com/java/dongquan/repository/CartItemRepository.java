package com.java.dongquan.repository;

import com.java.dongquan.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Không cần phương thức tùy chỉnh ở đây vì chúng ta sẽ thao tác qua ShoppingCart
}
