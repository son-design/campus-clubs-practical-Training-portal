package tz.ac.suza.campus_portal.dto;

import lombok.Data;
import tz.ac.suza.campus_portal.model.enums.MentorFeedbackStatus;

@Data
public class MentorFeedbackRequest {
    private Long applicationId;
    private String mentorNotes;
    private MentorFeedbackStatus status;
}