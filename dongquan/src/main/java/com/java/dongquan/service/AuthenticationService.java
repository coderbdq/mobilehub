// src/main/java/com/java/dongquan/service/AuthenticationService.java
package com.java.dongquan.service;

import com.java.dongquan.dto.auth.SignInRequest;
import com.java.dongquan.dto.auth.SignUpRequest;
import com.java.dongquan.dto.auth.JwtAuthenticationResponse;
import com.java.dongquan.entity.AppUser;
import com.java.dongquan.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        if(userRepository.existsByUsername(request.getUsername())){ // Use getter
            throw new IllegalArgumentException("Username đã tồn tại.");
        }
        if(userRepository.existsByEmail(request.getEmail())){ // Use getter
            throw new IllegalArgumentException("Email đã tồn tại.");
        }

        AppUser user = new AppUser();
        user.setUsername(request.getUsername()); // Use getter
        user.setEmail(request.getEmail()); // Use getter
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Use getter
        user.setRole("ROLE_USER"); // Use setter

        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        // Use Builder correctly
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Transactional(readOnly = true)
    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())); // Use getters

        var user = userRepository.findByEmail(request.getEmail()) // Use getter
                .orElseThrow(() -> new IllegalArgumentException("Email hoặc mật khẩu không hợp lệ."));
        var jwt = jwtService.generateToken(user);
        // Use Builder correctly
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}