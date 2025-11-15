package com.java.dongquan.dto.order;

import lombok.*;
import java.util.List;

@Getter @Setter
public class OrderRequestDTO {
    private Long userId;
    private String customerName;
    private String phone;
    private String address;
    private String paymentMethod;

    private List<OrderItemDTO> items;
}
