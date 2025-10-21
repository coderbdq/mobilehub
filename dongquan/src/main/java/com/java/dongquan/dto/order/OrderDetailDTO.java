// src/main/java/com/java/dongquan/dto/order/OrderDetailDTO.java
package com.java.dongquan.dto.order;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class OrderDetailDTO {
    private Long productId;
    private String productName;
    private int quantity;
    private BigDecimal price;
}