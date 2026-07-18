package tz.ac.suza.campus_portal.controller;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.Date;

@Data
public class PtTrainingRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String location;

    @NotNull(message = "Start date is required")
    @Future(message = "Start date must be in the future")
    private Date startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private Date endDate;

    @NotNull(message = "Application deadline is required")
    @Future(message = "Application deadline must be in the future")
    private Date applicationDeadline;

    private Integer availableSlots;
    private String requirements;
}