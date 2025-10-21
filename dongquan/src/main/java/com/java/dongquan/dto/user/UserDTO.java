package com.java.dongquan.dto.user;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
}
