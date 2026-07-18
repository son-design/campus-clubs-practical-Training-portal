package tz.ac.suza.campus_portal.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "trainings")
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String organization;
    private String location;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_date")
    private Date endDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "application_deadline", nullable = false)
    private Date applicationDeadline;

    @Column(name = "available_slots")
    private Integer availableSlots;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "created_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    // --- Mahusiano ---
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy; // Training Coordinator aliyeiunda

    // Many-to-Many na Mentors (Mentor wanaohusika na Training hii)
    @ManyToMany
    @JoinTable(name = "training_mentors", joinColumns = @JoinColumn(name = "training_id"), inverseJoinColumns = @JoinColumn(name = "mentor_id"))
    private Set<User> mentors = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}