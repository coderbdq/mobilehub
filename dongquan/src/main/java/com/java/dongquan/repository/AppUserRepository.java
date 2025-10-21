package com.java.dongquan.repository;

import com.java.dongquan.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    // Phương thức này rất quan trọng để Spring Security tìm user khi login
    Optional<AppUser> findByEmail(String email);
    
    Optional<AppUser> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}