// src/main/java/com/java/dongquan/config/MvcConfig.java
package com.java.dongquan.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // FIX: Cấu hình chuẩn nhất cho Windows và Spring Boot
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
        // Cần sử dụng tiền tố file: và đường dẫn chuẩn cho Windows
        String uploadResourcePath = "file:///" + uploadPath.toString().replace("\\", "/") + "/";
        
        // Cấu hình để khi truy cập /images/**, nó sẽ lấy file từ đường dẫn FILE:
        registry.addResourceHandler("/images/**")
                .addResourceLocations(uploadResourcePath);
    }
}