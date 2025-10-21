// src/main/java/com/java/dongquan/controller/FileController.java
package com.java.dongquan.controller;

import com.java.dongquan.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal; // Import này rất quan trọng
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    // Bỏ @PreAuthorize, thay vào đó kiểm tra token hợp lệ bằng @AuthenticationPrincipal
    public ResponseEntity<?> uploadFile(@AuthenticationPrincipal UserDetails userDetails, @RequestParam("file") MultipartFile file) {
        
        // Kiểm tra xem người dùng có phải Admin không (Kiểm tra thủ công)
        if (userDetails == null || !userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            // Nếu không phải Admin hoặc chưa đăng nhập, trả về 403 Forbidden
            return ResponseEntity.status(403).body(Map.of("message", "Bạn không có quyền upload file."));
        }

        String fileName = fileStorageService.store(file);
        
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(fileName)
                .toUriString();

        return ResponseEntity.ok(Map.of("url", fileDownloadUri));
    }
}