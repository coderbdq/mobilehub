// src/main/java/com/java/dongquan/service/OrderService.java
package com.java.dongquan.service;

import com.java.dongquan.dto.order.OrderDetailDTO;
import com.java.dongquan.dto.order.OrderResponseDTO;
import com.java.dongquan.dto.order.PlaceOrderRequestDTO;
import com.java.dongquan.entity.*;
import com.java.dongquan.repository.AppUserRepository;
import com.java.dongquan.repository.OrderRepository;
import com.java.dongquan.repository.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set; // <--- SỬA LỖI: Thêm dòng import này
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final AppUserRepository userRepository;
    private final ShoppingCartRepository cartRepository;

    @Transactional
    public OrderResponseDTO placeOrder(String userEmail, PlaceOrderRequestDTO requestDTO) {
        AppUser user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));

        ShoppingCart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng của người dùng"));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Giỏ hàng trống, không thể đặt hàng");
        }

        // Tạo đơn hàng mới
        Order order = new Order();
        order.setUser(user);
        order.setCustomerName(requestDTO.getCustomerName());
        order.setShippingAddress(requestDTO.getShippingAddress());
        order.setPhoneNumber(requestDTO.getPhoneNumber());
        order.setTotalAmount(cart.getTotalPrice());

        // Chuyển các món hàng từ giỏ hàng sang chi tiết đơn hàng
        Set<OrderDetail> orderDetails = cart.getItems().stream().map(cartItem -> {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(cartItem.getProduct());
            detail.setQuantity(cartItem.getQuantity());
            detail.setPrice(cartItem.getPricePerItem()); // Lưu lại giá tại thời điểm mua
            return detail;
        }).collect(Collectors.toSet());

        order.setOrderDetails(orderDetails);

        // Xóa giỏ hàng sau khi đã đặt hàng
        cartRepository.delete(cart);

        Order savedOrder = orderRepository.save(order);
        return mapToOrderResponseDTO(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrderHistory(String userEmail) {
        AppUser user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng"));

        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);
        return orders.stream()
                .map(this::mapToOrderResponseDTO)
                .collect(Collectors.toList());
    }

    // --- Helper Method ---
    public OrderResponseDTO mapToOrderResponseDTO(Order order) {
        List<OrderDetailDTO> detailDTOs = order.getOrderDetails().stream()
                .map(detail -> OrderDetailDTO.builder()
                        .productId(detail.getProduct() != null ? detail.getProduct().getId() : null)
                        .productName(detail.getProduct() != null ? detail.getProduct().getName() : "Sản phẩm đã bị xóa")
                        .quantity(detail.getQuantity())
                        .price(detail.getPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderResponseDTO.builder()
                .id(order.getId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .customerName(order.getCustomerName())
                .shippingAddress(order.getShippingAddress())
                .phoneNumber(order.getPhoneNumber())
                .orderDetails(detailDTOs)
                .build();
    }
}