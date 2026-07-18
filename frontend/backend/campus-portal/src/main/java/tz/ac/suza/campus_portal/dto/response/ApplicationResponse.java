package tz.ac.suza.campus_portal.dto.response;

import lombok.Builder;
import lombok.Data;
import tz.ac.suza.campus_portal.model.PtApplication;
import java.util.Date;

@Data
@Builder
public class ApplicationResponse {
    private Long id;
    private String studentName;
    private String studentRegistration;
    private String trainingTitle;
    private String status;
    private String notes;
    private String feedback;
    private Date appliedAt;
    private Date reviewedAt;

    public static ApplicationResponse fromEntity(PtApplication app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .studentName(app.getStudent().getUser().getFullName())
                .studentRegistration(app.getStudent().getRegistrationNumber())
                .trainingTitle(app.getTraining().getTitle())
                .status(app.getStatus().name())
                .notes(app.getNotes())
                .feedback(app.getFeedback())
                .appliedAt(app.getAppliedAt())
                .reviewedAt(app.getReviewedAt())
                .build();
    }
}