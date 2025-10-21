// src/main/java/com/java/dongquan/dto/product/ProductResponseDTO.java
package com.java.dongquan.dto.product;

import lombok.*; // Add Builder, NoArgsConstructor, AllArgsConstructor
import java.math.BigDecimal;

@Getter
@Setter
@Builder // Add builder
@NoArgsConstructor // Add default constructor
@AllArgsConstructor // Add all args constructor
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String brand;
    private BigDecimal price;
    private String color;
    private String ram;
    private String storage;
    private String screenSize;
    private String description;
    private String imageUrl;
    private int stockQuantity;
    private Long categoryId;
    private String categoryName;
}