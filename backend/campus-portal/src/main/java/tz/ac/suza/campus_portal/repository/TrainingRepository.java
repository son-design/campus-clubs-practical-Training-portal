package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
}