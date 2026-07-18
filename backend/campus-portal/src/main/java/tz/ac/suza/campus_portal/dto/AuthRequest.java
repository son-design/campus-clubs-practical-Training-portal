package tz.ac.suza.campus_portal.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}