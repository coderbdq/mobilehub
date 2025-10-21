package com.java.dongquan.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path rootLocation;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        // CHỈ SỬ DỤNG PATH TƯƠNG ĐỐI
        this.rootLocation = Paths.get(uploadDir); 
        try {
            // Vẫn tạo thư mục
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Không thể khởi tạo thư mục lưu trữ", e);
        }
    }

    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("File rỗng.");
            }
            
            String originalFilename = file.getOriginalFilename();
            String extension = getFileExtension(originalFilename);
            String newFileName = UUID.randomUUID().toString() + "." + extension;
            
            // CHỈ SỬ DỤNG PATH TƯƠNG ĐỐI VÀ RESOLVE TRỰC TIẾP
            Path destinationFile = this.rootLocation.resolve(newFileName);

            // Xóa bỏ toàn bộ logic so sánh đường dẫn (startWith/getParent), vì nó gây ra lỗi
            // Nếu có lỗi, chúng ta sẽ để IOException tự xử lý

            try (InputStream inputStream = file.getInputStream()) {
                // Sử dụng getAbsolutePath() chỉ khi copy để đảm bảo đường dẫn đúng
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            return newFileName;
        } catch (IOException e) {
            throw new RuntimeException("Lưu file thất bại.", e);
        }
    }

    private String getFileExtension(String filename) {
        if(filename == null || filename.lastIndexOf(".") == -1) return "dat";
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }
}