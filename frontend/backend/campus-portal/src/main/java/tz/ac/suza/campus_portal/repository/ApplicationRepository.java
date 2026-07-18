package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByAssignedMentorId(Long mentorId);

    List<Application> findByStudentId(Long studentId);

    List<Application> findByTrainingId(Long trainingId);
}