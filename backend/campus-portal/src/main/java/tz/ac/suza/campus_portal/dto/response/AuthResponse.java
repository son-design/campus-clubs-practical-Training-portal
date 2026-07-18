package tz.ac.suza.campus_portal.dto.response;

import lombok.Builder;
import lombok.Data;
import tz.ac.suza.campus_portal.model.User;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String username;
    private String fullName;
    private String email;
    private User.Role role;
    private Long userId;
    private String message;
}