package tz.ac.suza.campus_portal.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration_number", unique = true, nullable = false)
    private String registrationNumber;

    @Column(name = "year_of_study")
    private Integer yearOfStudy;

    private String department;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<ClubMembership> memberships = new ArrayList<>();

    @OneToMany(mappedBy = "student")
    private List<PtApplication> applications = new ArrayList<>();
}