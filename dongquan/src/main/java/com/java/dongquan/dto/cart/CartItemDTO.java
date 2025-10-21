// src/main/java/com/java/dongquan/dto/cart/CartItemDTO.java
package com.java.dongquan.dto.cart;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String imageUrl; // Added imageUrl
    private int quantity;
    private BigDecimal pricePerItem;
}