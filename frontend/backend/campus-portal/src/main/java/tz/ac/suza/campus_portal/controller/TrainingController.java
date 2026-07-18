package tz.ac.suza.campus_portal.controller;

import tz.ac.suza.campus_portal.model.Training;
import tz.ac.suza.campus_portal.service.TrainingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trainings")
public class TrainingController {

    private final TrainingService trainingService;

    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping
    public ResponseEntity<List<Training>> getAllTrainings() {
        return ResponseEntity.ok(trainingService.getAllTrainings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Training> getTraining(@PathVariable Long id) {
        return ResponseEntity.ok(trainingService.getTrainingById(id));
    }

    @PostMapping
    public ResponseEntity<Training> createTraining(@RequestBody Training training) {
        return ResponseEntity.ok(trainingService.createTraining(training, 1L));
    }

    @PostMapping("/{trainingId}/mentors/{mentorId}")
    public ResponseEntity<Training> assignMentor(@PathVariable Long trainingId, @PathVariable Long mentorId) {
        return ResponseEntity.ok(trainingService.assignMentorToTraining(trainingId, mentorId));
    }
}