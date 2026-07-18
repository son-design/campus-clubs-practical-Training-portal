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
@Table(name = "club_memberships", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "student_id", "club_id" })
})
public class ClubMembership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "club_id", nullable = false)
    private Club club;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "joined_at")
    private Date joinedAt;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @PrePersist
    protected void onCreate() {
        joinedAt = new Date();
    }
}