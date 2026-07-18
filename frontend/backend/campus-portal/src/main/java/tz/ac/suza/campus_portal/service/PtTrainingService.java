package tz.ac.suza.campus_portal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tz.ac.suza.campus_portal.dto.request.PtTrainingRequest;
import tz.ac.suza.campus_portal.dto.response.PtTrainingResponse;
import tz.ac.suza.campus_portal.model.Mentor;
import tz.ac.suza.campus_portal.model.PtTraining;
import tz.ac.suza.campus_portal.repository.MentorRepository;
import tz.ac.suza.campus_portal.repository.PtTrainingRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PtTrainingService {

    private final PtTrainingRepository trainingRepository;
    private final MentorRepository mentorRepository;

    public List<PtTrainingResponse> getAllTrainings() {
        return trainingRepository.findAll().stream()
                .map(PtTrainingResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public PtTrainingResponse getTrainingById(Long id) {
        PtTraining training = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training not found"));
        return PtTrainingResponse.fromEntity(training);
    }

    @Transactional
    public PtTrainingResponse createTraining(PtTrainingRequest request, Long mentorId) {
        Mentor mentor = mentorRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));

        PtTraining training = new PtTraining();
        training.setTitle(request.getTitle());
        training.setDescription(request.getDescription());
        training.setLocation(request.getLocation());
        training.setStartDate(request.getStartDate());
        training.setEndDate(request.getEndDate());
        training.setApplicationDeadline(request.getApplicationDeadline());
        training.setAvailableSlots(request.getAvailableSlots());
        training.setRequirements(request.getRequirements());
        training.setMentor(mentor);
        training.setStatus(PtTraining.TrainingStatus.OPEN);

        PtTraining saved = trainingRepository.save(training);
        return PtTrainingResponse.fromEntity(saved);
    }

    @Transactional
    public PtTrainingResponse updateTraining(Long id, PtTrainingRequest request) {
        PtTraining training = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training not found"));

        training.setTitle(request.getTitle());
        training.setDescription(request.getDescription());
        training.setLocation(request.getLocation());
        training.setStartDate(request.getStartDate());
        training.setEndDate(request.getEndDate());
        training.setApplicationDeadline(request.getApplicationDeadline());
        training.setAvailableSlots(request.getAvailableSlots());
        training.setRequirements(request.getRequirements());

        return PtTrainingResponse.fromEntity(trainingRepository.save(training));
    }

    public List<PtTrainingResponse> getTrainingsByMentor(Long mentorId) {
        return trainingRepository.findByMentorId(mentorId).stream()
                .map(PtTrainingResponse::fromEntity)
                .collect(Collectors.toList());
    }
}