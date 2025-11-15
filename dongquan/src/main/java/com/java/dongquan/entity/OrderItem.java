package com.java.dongquan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String productName;
    private String imageUrl;

    private BigDecimal price;
    private int qty;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
