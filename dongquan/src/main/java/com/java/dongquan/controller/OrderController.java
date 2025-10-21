// src/main/java/com/java/dongquan/controller/OrderController.java
package com.java.dongquan.controller;

import com.java.dongquan.dto.order.OrderResponseDTO;
import com.java.dongquan.dto.order.PlaceOrderRequestDTO;
import com.java.dongquan.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> placeOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody PlaceOrderRequestDTO requestDTO) {
        OrderResponseDTO newOrder = orderService.placeOrder(userDetails.getUsername(), requestDTO);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getMyOrderHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<OrderResponseDTO> orderHistory = orderService.getOrderHistory(userDetails.getUsername());
        return ResponseEntity.ok(orderHistory);
    }
}