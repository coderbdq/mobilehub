// src/main/java/com/java/dongquan/service/CartService.java
package com.java.dongquan.service;

import com.java.dongquan.dto.cart.AddItemRequest;
import com.java.dongquan.dto.cart.CartDTO;
import com.java.dongquan.dto.cart.CartItemDTO; // Make sure this import exists
import com.java.dongquan.entity.AppUser;
import com.java.dongquan.entity.CartItem;
import com.java.dongquan.entity.Product;
import com.java.dongquan.entity.ShoppingCart;
import com.java.dongquan.repository.AppUserRepository;
import com.java.dongquan.repository.CartItemRepository; // Inject CartItemRepository
import com.java.dongquan.repository.ProductRepository;
import com.java.dongquan.repository.ShoppingCartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException; // Import correct exception
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional; // Import Optional
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final ShoppingCartRepository cartRepository;
    private final CartItemRepository cartItemRepository; // Inject CartItemRepository
    private final ProductRepository productRepository;
    private final AppUserRepository userRepository;

    @Transactional(readOnly = true)
    public CartDTO getCartForUser(String userEmail) {
        AppUser user = findUserByEmail(userEmail);
        ShoppingCart cart = findOrCreateCartForUser(user);
        return mapToCartDTO(cart);
    }

    @Transactional
    public CartDTO addItemToCart(String userEmail, AddItemRequest request) {
        AppUser user = findUserByEmail(userEmail);
        ShoppingCart cart = findOrCreateCartForUser(user);
        Product product = productRepository.findById(request.getProductId()) // Use getter
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Check if item already exists in cart
        Optional<CartItem> existingItemOpt = cart.getItems().stream() // Use getter
                .filter(item -> item.getProduct().getId().equals(request.getProductId())) // Use getter
                .findFirst();

        if (existingItemOpt.isPresent()) {
            // If exists, update quantity
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity()); // Use getter and setter
            cartItemRepository.save(existingItem); // Save the updated item
        } else {
            // If not exists, create new item
            CartItem newItem = new CartItem();
            newItem.setShoppingCart(cart); // Use setter, correct field name
            newItem.setProduct(product);   // Use setter
            newItem.setQuantity(request.getQuantity()); // Use getter
            newItem.setPricePerItem(product.getPrice()); // Use getter for product price
            CartItem savedNewItem = cartItemRepository.save(newItem); // Save the new item first
            cart.getItems().add(savedNewItem); // Add the managed entity to the set
        }

        cart.recalculateTotalPrice(); // Recalculate total price
        ShoppingCart savedCart = cartRepository.save(cart); // Save the updated cart

        return mapToCartDTO(savedCart);
    }

    @Transactional
    public void removeItemFromCart(String userEmail, Long cartItemId) {
        AppUser user = findUserByEmail(userEmail);
        ShoppingCart cart = findOrCreateCartForUser(user);

        CartItem itemToRemove = cart.getItems().stream() // Use getter
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Không tìm thấy món hàng trong giỏ"));

        // Remove from collection before deleting from repository
        cart.getItems().remove(itemToRemove);
        cartItemRepository.delete(itemToRemove);

        cart.recalculateTotalPrice(); // Recalculate total price
        cartRepository.save(cart); // Save the updated cart
    }

    // --- Helper Methods ---

    private AppUser findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với email: " + email)); // Use correct exception
    }

    private ShoppingCart findOrCreateCartForUser(AppUser user) {
        return cartRepository.findByUser(user) // Use the correct method name
                .orElseGet(() -> {
                    ShoppingCart newCart = new ShoppingCart();
                    newCart.setUser(user); // Use setter
                    return cartRepository.save(newCart);
                });
    }

    // mapToCartDTO remains largely the same, but ensure it uses getters
    private CartDTO mapToCartDTO(ShoppingCart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId()); // Use getter
        cartDTO.setTotalPrice(cart.getTotalPrice()); // Use getter
        cartDTO.setItems(cart.getItems().stream().map(this::mapToCartItemDTO).collect(Collectors.toList())); // Use getter
        return cartDTO;
    }

    // mapToCartItemDTO remains largely the same, but ensure it uses getters
    private CartItemDTO mapToCartItemDTO(CartItem cartItem) {
        CartItemDTO itemDTO = new CartItemDTO();
        itemDTO.setId(cartItem.getId()); // Use getter
        itemDTO.setProductId(cartItem.getProduct().getId()); // Use getter
        itemDTO.setProductName(cartItem.getProduct().getName()); // Use getter
        itemDTO.setImageUrl(cartItem.getProduct().getImageUrl()); // Add imageUrl
        itemDTO.setQuantity(cartItem.getQuantity()); // Use getter
        itemDTO.setPricePerItem(cartItem.getPricePerItem()); // Use getter
        return itemDTO;
    }
}