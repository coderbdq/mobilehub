// path: dongquan/src/main/java/com/java/dongquan/service/ProductService.java
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

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // ===================== PRODUCT CRUD ===================== //

    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với id: " + id));
        return mapToResponseDTO(product);
    }

    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO req) {
        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        Product product = new Product();
        mapRequestToEntity(req, product, category);

        return mapToResponseDTO(productRepository.save(product));
    }

    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO req) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        mapRequestToEntity(req, product, category);

        return mapToResponseDTO(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        productRepository.delete(product);
    }

    // ===================== FILTER + SEARCH + SORT ===================== //

    public List<ProductResponseDTO> filterProducts(
            String q,
            String brand,
            String price,
            String sort,
            Long categoryId
    ) {

        // 🔥 FIX: Chuỗi rỗng ("") phải chuyển thành NULL
        if (q != null && q.trim().isEmpty()) q = null;
        if (brand != null && brand.trim().isEmpty()) brand = null;
        if (price != null && price.trim().isEmpty()) price = null;
        if (sort != null && sort.trim().isEmpty()) sort = null;

        BigDecimal min = null;
        BigDecimal max = null;

        // Parse range
        if (price != null && price.contains("-")) {
            String[] parts = price.split("-");
            min = new BigDecimal(parts[0]);
            max = new BigDecimal(parts[1]);
        }

        // Log để debug
        System.out.println("==== PRODUCT FILTER ====");
        System.out.println("q = " + q);
        System.out.println("brand = " + brand);
        System.out.println("price = " + price);
        System.out.println("min = " + min);
        System.out.println("max = " + max);
        System.out.println("sort = " + sort);
        System.out.println("categoryId = " + categoryId);

        // Query DB
        List<Product> products = productRepository.filterProducts(
                q,
                brand,
                categoryId,
                min,
                max
        );

        // Convert to DTO
        List<ProductResponseDTO> dtoList = products.stream()
                .map(this::mapToResponseDTO)
                .toList();

        // Sort
        if ("price_asc".equals(sort)) {
            dtoList = dtoList.stream()
                    .sorted(Comparator.comparing(ProductResponseDTO::getPrice))
                    .toList();
        }

        if ("price_desc".equals(sort)) {
            dtoList = dtoList.stream()
                    .sorted(Comparator.comparing(ProductResponseDTO::getPrice).reversed())
                    .toList();
        }

        return dtoList;
    }

    // ===================== GET BRANDS ===================== //

    public List<String> getAllBrands() {
        return productRepository.findAll().stream()
                .map(Product::getBrand)
                .distinct()
                .toList();
    }

    // ===================== MAPPER ===================== //

    private ProductResponseDTO mapToResponseDTO(Product p) {
        return ProductResponseDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .brand(p.getBrand())
                .price(p.getPrice())
                .color(p.getColor())
                .ram(p.getRam())
                .storage(p.getStorage())
                .screenSize(p.getScreenSize())
                .description(p.getDescription())
                .imageUrl(p.getImageUrl())
                .stockQuantity(p.getStockQuantity())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .build();
    }

    private void mapRequestToEntity(ProductRequestDTO req, Product p, Category category) {
        p.setName(req.getName());
        p.setBrand(req.getBrand());
        p.setPrice(req.getPrice());
        p.setColor(req.getColor());
        p.setRam(req.getRam());
        p.setStorage(req.getStorage());
        p.setScreenSize(req.getScreenSize());
        p.setDescription(req.getDescription());
        p.setImageUrl(req.getImageUrl());
        p.setStockQuantity(req.getStockQuantity());
        p.setCategory(category);
    }
}
