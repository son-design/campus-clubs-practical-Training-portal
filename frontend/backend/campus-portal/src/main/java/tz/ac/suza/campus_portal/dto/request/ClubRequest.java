package tz.ac.suza.campus_portal.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ClubRequest {
    @NotBlank(message = "Club name is required")
    private String name;

    private String description;
    private String category;
}