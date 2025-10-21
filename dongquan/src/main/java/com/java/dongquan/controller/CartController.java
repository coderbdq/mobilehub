// src/main/java/com/java/dongquan/controller/CartController.java
package com.java.dongquan.controller;

import com.java.dongquan.dto.cart.AddItemRequest;
import com.java.dongquan.dto.cart.CartDTO;
import com.java.dongquan.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDTO> getMyCart(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // 401 Unauthorized
        }
        return ResponseEntity.ok(cartService.getCartForUser(userDetails.getUsername()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartDTO> addItemToMyCart(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AddItemRequest addItemRequest) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // 401 Unauthorized
        }
        return ResponseEntity.ok(cartService.addItemToCart(userDetails.getUsername(), addItemRequest));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeItemFromMyCart(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long cartItemId) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build(); // 401 Unauthorized
        }
        cartService.removeItemFromCart(userDetails.getUsername(), cartItemId);
        return ResponseEntity.noContent().build();
    }
}