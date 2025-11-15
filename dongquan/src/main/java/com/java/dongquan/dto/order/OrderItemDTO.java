package com.java.dongquan.dto.order;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter
public class OrderItemDTO {
    private Long productId;
    private String productName;
    private String imageUrl;
    private BigDecimal price;
    private int qty;
}
