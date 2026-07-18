package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    boolean existsByName(String name);
}