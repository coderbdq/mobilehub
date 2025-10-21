// src/main/java/com/java/dongquan/service/ProductService.java
package com.java.dongquan.service;

import com.java.dongquan.dto.product.ProductRequestDTO;
import com.java.dongquan.dto.product.ProductResponseDTO;
import com.java.dongquan.entity.Category;
import com.java.dongquan.entity.Product;
import com.java.dongquan.repository.CategoryRepository;
import com.java.dongquan.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));
        return mapToResponseDTO(product);
    }

    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO requestDTO) {
        Category category = categoryRepository.findById(requestDTO.getCategoryId()) // Use getter
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với id: " + requestDTO.getCategoryId())); // Use getter

        Product product = new Product();
        mapRequestToEntity(requestDTO, product, category);

        Product savedProduct = productRepository.save(product);
        return mapToResponseDTO(savedProduct);
    }

    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));
        Category category = categoryRepository.findById(requestDTO.getCategoryId()) // Use getter
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với id: " + requestDTO.getCategoryId())); // Use getter

        mapRequestToEntity(requestDTO, product, category);

        Product updatedProduct = productRepository.save(product);
        return mapToResponseDTO(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));
        productRepository.delete(product);
    }


    // --- Helper methods ---

    private ProductResponseDTO mapToResponseDTO(Product product) {
        if (product == null) {
            return null;
        }
        // Use builder for cleaner mapping
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .brand(product.getBrand())
                .price(product.getPrice())
                .color(product.getColor())
                .ram(product.getRam())
                .storage(product.getStorage())
                .screenSize(product.getScreenSize())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .stockQuantity(product.getStockQuantity())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .build();
    }

    private void mapRequestToEntity(ProductRequestDTO requestDTO, Product product, Category category) {
        product.setName(requestDTO.getName()); // Use getter
        product.setBrand(requestDTO.getBrand()); // Use getter
        product.setPrice(requestDTO.getPrice()); // Use getter
        product.setColor(requestDTO.getColor()); // Use getter
        product.setRam(requestDTO.getRam()); // Use getter
        product.setStorage(requestDTO.getStorage()); // Use getter
        product.setScreenSize(requestDTO.getScreenSize()); // Use getter
        product.setDescription(requestDTO.getDescription()); // Use getter
        product.setImageUrl(requestDTO.getImageUrl()); // Use getter
        product.setStockQuantity(requestDTO.getStockQuantity()); // Use getter
        product.setCategory(category); // Use setter
    }
}