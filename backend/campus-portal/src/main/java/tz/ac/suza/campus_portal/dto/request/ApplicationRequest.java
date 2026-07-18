package tz.ac.suza.campus_portal.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ApplicationRequest {
    @NotNull(message = "Training ID is required")
    private Long trainingId;

    private String notes;
}