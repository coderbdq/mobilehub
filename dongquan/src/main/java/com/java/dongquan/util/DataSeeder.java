// src/main/java/com/java/dongquan/util/DataSeeder.java
package com.java.dongquan.util;

import com.java.dongquan.entity.AppUser;
import com.java.dongquan.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional // Add transactional to ensure data is saved
    public void run(String... args) throws Exception {
        // Check if admin user already exists
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            AppUser admin = new AppUser();
            admin.setUsername("admin");       // Use setter
            admin.setEmail("admin@gmail.com"); // Use setter
            admin.setPassword(passwordEncoder.encode("admin123")); // Use setter
            admin.setRole("ROLE_ADMIN");    // Use setter
            admin.setFirstName("Admin");      // Use setter
            admin.setLastName("User");       // Use setter
            userRepository.save(admin);
        }
    }
}