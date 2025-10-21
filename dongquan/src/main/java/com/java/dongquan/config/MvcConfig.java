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
        // FIX LỖI 404: Đảm bảo Spring luôn tìm file bằng tiền tố 'file:///'
        // và sử dụng đường dẫn tuyệt đối để tránh lỗi môi trường.
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
        String uploadResourcePath = "file:///" + uploadPath.toString().replace("\\", "/");
        
        // Cấu hình để khi truy cập /images/**, nó sẽ lấy file từ thư mục upload
        registry.addResourceHandler("/images/**")
                .addResourceLocations(uploadResourcePath);
    }
}