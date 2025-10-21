package com.java.dongquan.repository;

import com.java.dongquan.entity.AppUser;
import com.java.dongquan.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    // Thêm phương thức này để tìm giỏ hàng theo user
    Optional<ShoppingCart> findByUser(AppUser user);
}