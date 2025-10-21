// src/main/java/com/java/dongquan/dto/product/ProductRequestDTO.java
package com.java.dongquan.dto.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequestDTO {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    private String brand;

    @NotNull(message = "Giá không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá phải lớn hơn 0")
    private BigDecimal price;

    private String color;
    private String ram;
    private String storage;
    private String screenSize;
    private String description;
    private String imageUrl;
    private int stockQuantity;

    @NotNull(message = "ID danh mục không được để trống")
    private Long categoryId;
}