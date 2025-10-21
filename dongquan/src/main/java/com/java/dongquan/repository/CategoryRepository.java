package com.java.dongquan.repository;

import com.java.dongquan.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Spring Data JPA sẽ tự tạo các phương thức CRUD (save, findById, findAll, deleteById,...)
    // Chúng ta có thể thêm các phương thức tìm kiếm tùy chỉnh sau, ví dụ:
    // Optional<Category> findBySlug(String slug);
}