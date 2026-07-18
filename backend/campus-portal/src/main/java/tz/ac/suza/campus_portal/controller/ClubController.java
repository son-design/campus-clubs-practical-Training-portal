package tz.ac.suza.campus_portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tz.ac.suza.campus_portal.dto.request.ClubRequest;
import tz.ac.suza.campus_portal.dto.response.ClubResponse;
import tz.ac.suza.campus_portal.service.ClubService;

import java.util.List;

@RestController
@RequestMapping("/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<List<ClubResponse>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClubResponse> getClubById(@PathVariable Long id) {
        return ResponseEntity.ok(clubService.getClubById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('CLUB_LEADER')")
    public ResponseEntity<ClubResponse> createClub(@Valid @RequestBody ClubRequest request) {
        return ResponseEntity.ok(clubService.createClub(request));
    }

    @PostMapping("/{clubId}/join")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> joinClub(@PathVariable Long clubId, @RequestParam Long studentId) {
        clubService.joinClub(studentId, clubId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{clubId}/leave")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> leaveClub(@PathVariable Long clubId, @RequestParam Long studentId) {
        clubService.leaveClub(studentId, clubId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ClubResponse>> getClubsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(clubService.getClubsByStudent(studentId));
    }
}