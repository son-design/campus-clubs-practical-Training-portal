package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.PtApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PtApplicationRepository extends JpaRepository<PtApplication, Long> {
    boolean existsByStudentIdAndTrainingId(Long studentId, Long trainingId);

    List<PtApplication> findByStudentId(Long studentId);

    List<PtApplication> findByTrainingId(Long trainingId);
}