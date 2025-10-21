// src/main/java/com/java/dongquan/dto/order/PlaceOrderRequestDTO.java
package com.java.dongquan.dto.order;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrderRequestDTO {
    @NotBlank(message = "Tên khách hàng không được để trống")
    private String customerName;

    @NotBlank(message = "Địa chỉ giao hàng không được để trống")
    private String shippingAddress;

    @NotBlank(message = "Số điện thoại không được để trống")
    private String phoneNumber;
}