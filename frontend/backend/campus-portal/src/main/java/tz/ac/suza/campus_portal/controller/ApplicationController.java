package tz.ac.suza.campus_portal.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tz.ac.suza.campus_portal.dto.request.ApplicationRequest;
import tz.ac.suza.campus_portal.dto.response.ApplicationResponse;
import tz.ac.suza.campus_portal.model.PtApplication;
import tz.ac.suza.campus_portal.service.ApplicationService;
import java.util.List;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationResponse> applyForTraining(
            @RequestParam Long studentId,
            @Valid @RequestBody ApplicationRequest request) {
        return ResponseEntity.ok(applicationService.applyForTraining(studentId, request));
    }

    @PutMapping("/{id}/review")
    @PreAuthorize("hasRole('MENTOR') or hasRole('ADMIN')")
    public ResponseEntity<ApplicationResponse> reviewApplication(
            @PathVariable Long id,
            @RequestParam PtApplication.ApplicationStatus status,
            @RequestParam(required = false) String feedback) {
        return ResponseEntity.ok(applicationService.reviewApplication(id, status, feedback));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByStudent(studentId));
    }

    @GetMapping("/training/{trainingId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByTraining(@PathVariable Long trainingId) {
        return ResponseEntity.ok(applicationService.getApplicationsByTraining(trainingId));
    }
}