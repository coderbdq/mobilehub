package com.java.dongquan.service;

import com.java.dongquan.dto.order.OrderResponseDTO;
import com.java.dongquan.dto.user.UserDTO;
import com.java.dongquan.entity.AppUser;
import com.java.dongquan.entity.Order;
import com.java.dongquan.repository.AppUserRepository;
import com.java.dongquan.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AppUserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderService orderService; // Dùng lại mapper từ OrderService

    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderService::mapToOrderResponseDTO) // Tận dụng lại phương thức đã có
                .collect(Collectors.toList());
    }

    private UserDTO mapToUserDTO(AppUser user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
}
