package tz.ac.suza.campus_portal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tz.ac.suza.campus_portal.dto.request.ApplicationRequest;
import tz.ac.suza.campus_portal.dto.response.ApplicationResponse;
import tz.ac.suza.campus_portal.model.PtApplication;
import tz.ac.suza.campus_portal.model.PtTraining;
import tz.ac.suza.campus_portal.model.Student;
import tz.ac.suza.campus_portal.repository.PtApplicationRepository;
import tz.ac.suza.campus_portal.repository.PtTrainingRepository;
import tz.ac.suza.campus_portal.repository.StudentRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final PtApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final PtTrainingRepository trainingRepository;

    @Transactional
    public ApplicationResponse applyForTraining(Long studentId, ApplicationRequest request) {
        if (applicationRepository.existsByStudentIdAndTrainingId(studentId, request.getTrainingId())) {
            throw new RuntimeException("Already applied for this training");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        PtTraining training = trainingRepository.findById(request.getTrainingId())
                .orElseThrow(() -> new RuntimeException("Training not found"));

        int appliedCount = applicationRepository.findByTrainingId(request.getTrainingId()).size();
        if (training.getAvailableSlots() != null && appliedCount >= training.getAvailableSlots()) {
            throw new RuntimeException("No available slots for this training");
        }

        PtApplication application = new PtApplication();
        application.setStudent(student);
        application.setTraining(training);
        application.setNotes(request.getNotes());
        application.setStatus(PtApplication.ApplicationStatus.PENDING);

        PtApplication saved = applicationRepository.save(application);
        return ApplicationResponse.fromEntity(saved);
    }

    @Transactional
    public ApplicationResponse reviewApplication(Long applicationId, PtApplication.ApplicationStatus status,
            String feedback) {
        PtApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);
        application.setFeedback(feedback);
        application.setReviewedAt(new Date());

        return ApplicationResponse.fromEntity(applicationRepository.save(application));
    }

    public List<ApplicationResponse> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId).stream()
                .map(ApplicationResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getApplicationsByTraining(Long trainingId) {
        return applicationRepository.findByTrainingId(trainingId).stream()
                .map(ApplicationResponse::fromEntity)
                .collect(Collectors.toList());
    }
}