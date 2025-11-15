package com.java.dongquan.repository;

import com.java.dongquan.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search, brand, category, price có thể null
@Query("""
    SELECT p FROM Product p
    WHERE (:q IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%')))
      AND (:brand IS NULL OR LOWER(p.brand) = LOWER(:brand))
      AND (:categoryId IS NULL OR p.category.id = :categoryId)
      AND (:minPrice IS NULL OR p.price >= :minPrice)
      AND (:maxPrice IS NULL OR p.price <= :maxPrice)
""")
List<Product> filterProducts(
        @org.springframework.lang.Nullable String q,
        @org.springframework.lang.Nullable String brand,
        @org.springframework.lang.Nullable Long categoryId,
        @org.springframework.lang.Nullable BigDecimal minPrice,
        @org.springframework.lang.Nullable BigDecimal maxPrice
);


}
