package tz.ac.suza.campus_portal.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pt_applications", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "student_id", "training_id" })
})
public class PtApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "training_id", nullable = false)
    private PtTraining training;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String feedback;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "applied_at", updatable = false)
    private Date appliedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reviewed_at")
    private Date reviewedAt;

    public enum ApplicationStatus {
        PENDING, APPROVED, REJECTED, COMPLETED
    }

    @PrePersist
    protected void onCreate() {
        appliedAt = new Date();
    }
}