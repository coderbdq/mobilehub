// src/main/java/com/java/dongquan/entity/AppUser.java
package com.java.dongquan.entity;

import jakarta.persistence.*;
import lombok.*; // Import specific annotations
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

// Replace @Data with specific annotations
@Getter
@Setter
@ToString
@EqualsAndHashCode(exclude = {"createdAt", "updatedAt"}) // Exclude fields that might cause issues with equals/hashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_user")
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ROLE_USER or ROLE_ADMIN

    private String firstName;
    private String lastName;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    // --- Explicit UserDetails methods ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    // Explicitly implement getPassword()
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        // We use email as the username for authentication
        return this.email;
    }

    // Explicitly add these methods for UserDetails contract
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}