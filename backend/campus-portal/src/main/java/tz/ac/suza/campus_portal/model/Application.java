package tz.ac.suza.campus_portal.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import tz.ac.suza.campus_portal.model.enums.ApplicationStatus;
import tz.ac.suza.campus_portal.model.enums.MentorFeedbackStatus;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "applications", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "training_id" })
})
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "training_id", nullable = false)
    private Training training;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "application_date", updatable = false)
    private Date applicationDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @ManyToOne
    @JoinColumn(name = "assigned_mentor_id")
    private User assignedMentor;

    @Enumerated(EnumType.STRING)
    @Column(name = "mentor_status")
    private MentorFeedbackStatus mentorStatus = MentorFeedbackStatus.NOT_ASSIGNED;

    @Column(name = "mentor_notes", columnDefinition = "TEXT")
    private String mentorNotes;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "mentor_feedback_date")
    private Date mentorFeedbackDate;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        applicationDate = new Date();
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}