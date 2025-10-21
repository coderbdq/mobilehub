// src/main/java/com/java/dongquan/entity/ShoppingCart.java
package com.java.dongquan.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"user", "items"})
@EqualsAndHashCode(exclude = {"user", "items", "createdAt", "updatedAt"})
@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @Column(name = "total_price")
    private BigDecimal totalPrice = BigDecimal.ZERO;

    // Use eager fetch if you often need items when loading the cart
    @OneToMany(mappedBy = "shoppingCart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<CartItem> items = new HashSet<>();

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    // Correctly calculate total price
    public void recalculateTotalPrice() {
        if (items == null) {
            this.totalPrice = BigDecimal.ZERO;
            return;
        }
        this.totalPrice = items.stream()
                .map(item -> item.getPricePerItem().multiply(BigDecimal.valueOf(item.getQuantity()))) // Use BigDecimal.valueOf for int
                .reduce(BigDecimal.ZERO, BigDecimal::add); // Correct reduce syntax
    }
}