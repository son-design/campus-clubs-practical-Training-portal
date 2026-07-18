package tz.ac.suza.campus_portal.service;

import tz.ac.suza.campus_portal.model.Training;
import tz.ac.suza.campus_portal.model.User;
import tz.ac.suza.campus_portal.repository.TrainingRepository;
import tz.ac.suza.campus_portal.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingService {

    private final TrainingRepository trainingRepository;
    private final UserRepository userRepository;

    public TrainingService(TrainingRepository trainingRepository, UserRepository userRepository) {
        this.trainingRepository = trainingRepository;
        this.userRepository = userRepository;
    }

    public Training createTraining(Training training, Long coordinatorId) {
        User coordinator = userRepository.findById(coordinatorId)
                .orElseThrow(() -> new RuntimeException("Coordinator not found"));
        training.setCreatedBy(coordinator);
        return trainingRepository.save(training);
    }

    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    public Training getTrainingById(Long id) {
        return trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Training not found with id: " + id));
    }

    public Training updateTraining(Long id, Training updated) {
        Training existing = getTrainingById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setOrganization(updated.getOrganization());
        existing.setLocation(updated.getLocation());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setApplicationDeadline(updated.getApplicationDeadline());
        existing.setAvailableSlots(updated.getAvailableSlots());
        existing.setRequirements(updated.getRequirements());
        return trainingRepository.save(existing);
    }

    public void deleteTraining(Long id) {
        trainingRepository.deleteById(id);
    }

    // Assign Mentor to Training (Many-to-Many)
    public Training assignMentorToTraining(Long trainingId, Long mentorId) {
        Training training = getTrainingById(trainingId);
        User mentor = userRepository.findById(mentorId)
                .orElseThrow(() -> new RuntimeException("Mentor not found"));
        training.getMentors().add(mentor);
        return trainingRepository.save(training);
    }
}