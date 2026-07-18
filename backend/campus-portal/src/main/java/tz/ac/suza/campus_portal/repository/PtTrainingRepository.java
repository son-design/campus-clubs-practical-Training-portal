package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.PtTraining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PtTrainingRepository extends JpaRepository<PtTraining, Long> {
    List<PtTraining> findByMentorId(Long mentorId);
}