// src/main/java/com/java/dongquan/dto/order/OrderResponseDTO.java
package com.java.dongquan.dto.order;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
public class OrderResponseDTO {
    private Long id;
    private Timestamp orderDate;
    private BigDecimal totalAmount;
    private String status;
    private String customerName;
    private String shippingAddress;
    private String phoneNumber;
    private List<OrderDetailDTO> orderDetails;
}