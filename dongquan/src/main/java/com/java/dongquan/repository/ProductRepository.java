package com.java.dongquan.repository;

import com.java.dongquan.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Sau này chúng ta sẽ thêm các phương thức tìm kiếm nâng cao (giống TGDĐ) tại đây
    // Ví dụ: Page<Product> findByNameContaining(String name, Pageable pageable);
    // Hoặc dùng Specification
}