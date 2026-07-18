package tz.ac.suza.campus_portal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tz.ac.suza.campus_portal.dto.request.ClubRequest;
import tz.ac.suza.campus_portal.dto.response.ClubResponse;
import tz.ac.suza.campus_portal.model.Club;
import tz.ac.suza.campus_portal.model.ClubMembership;
import tz.ac.suza.campus_portal.model.Student;
import tz.ac.suza.campus_portal.repository.ClubMembershipRepository;
import tz.ac.suza.campus_portal.repository.ClubRepository;
import tz.ac.suza.campus_portal.repository.StudentRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMembershipRepository membershipRepository;
    private final StudentRepository studentRepository;

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll().stream()
                .map(ClubResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public ClubResponse getClubById(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        return ClubResponse.fromEntity(club);
    }

    @Transactional
    public ClubResponse createClub(ClubRequest request) {
        if (clubRepository.existsByName(request.getName())) {
            throw new RuntimeException("Club with this name already exists");
        }

        Club club = new Club();
        club.setName(request.getName());
        club.setDescription(request.getDescription());
        club.setCategory(request.getCategory());

        Club savedClub = clubRepository.save(club);
        return ClubResponse.fromEntity(savedClub);
    }

    @Transactional
    public void joinClub(Long studentId, Long clubId) {
        if (membershipRepository.existsByStudentIdAndClubId(studentId, clubId)) {
            throw new RuntimeException("Already a member of this club");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        ClubMembership membership = new ClubMembership();
        membership.setStudent(student);
        membership.setClub(club);
        membership.setIsActive(true);

        membershipRepository.save(membership);
    }

    @Transactional
    public void leaveClub(Long studentId, Long clubId) {
        ClubMembership membership = membershipRepository.findByStudentIdAndClubId(studentId, clubId)
                .orElseThrow(() -> new RuntimeException("Not a member of this club"));

        membership.setIsActive(false);
        membershipRepository.save(membership);
    }

    public List<ClubResponse> getClubsByStudent(Long studentId) {
        List<ClubMembership> memberships = membershipRepository.findByStudentId(studentId);
        return memberships.stream()
                .filter(ClubMembership::getIsActive)
                .map(membership -> ClubResponse.fromEntity(membership.getClub()))
                .collect(Collectors.toList());
    }
}