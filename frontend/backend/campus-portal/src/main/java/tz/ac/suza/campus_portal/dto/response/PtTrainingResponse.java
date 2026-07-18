package tz.ac.suza.campus_portal.dto.response;

import lombok.Builder;
import lombok.Data;
import tz.ac.suza.campus_portal.model.PtTraining;
import java.util.Date;

@Data
@Builder
public class PtTrainingResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Date startDate;
    private Date endDate;
    private Date applicationDeadline;
    private Integer availableSlots;
    private Integer appliedCount;
    private String status;
    private String mentorName;
    private Date createdAt;

    public static PtTrainingResponse fromEntity(PtTraining training) {
        return PtTrainingResponse.builder()
                .id(training.getId())
                .title(training.getTitle())
                .description(training.getDescription())
                .location(training.getLocation())
                .startDate(training.getStartDate())
                .endDate(training.getEndDate())
                .applicationDeadline(training.getApplicationDeadline())
                .availableSlots(training.getAvailableSlots())
                .appliedCount(training.getApplications() != null ? training.getApplications().size() : 0)
                .status(training.getStatus().name())
                .mentorName(training.getMentor() != null ? training.getMentor().getUser().getFullName() : null)
                .createdAt(training.getCreatedAt())
                .build();
    }
}