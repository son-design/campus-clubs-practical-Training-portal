package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {
    Optional<Mentor> findByUserId(Long userId);
}