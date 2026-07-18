package tz.ac.suza.campus_portal.repository;

import tz.ac.suza.campus_portal.model.ClubMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClubMembershipRepository extends JpaRepository<ClubMembership, Long> {
    boolean existsByStudentIdAndClubId(Long studentId, Long clubId);

    List<ClubMembership> findByStudentId(Long studentId);

    Optional<ClubMembership> findByStudentIdAndClubId(Long studentId, Long clubId);
}