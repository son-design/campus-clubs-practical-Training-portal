package tz.ac.suza.campus_portal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tz.ac.suza.campus_portal.dto.request.LoginRequest;
import tz.ac.suza.campus_portal.dto.request.RegisterRequest;
import tz.ac.suza.campus_portal.dto.response.AuthResponse;
import tz.ac.suza.campus_portal.model.Student;
import tz.ac.suza.campus_portal.model.User;
import tz.ac.suza.campus_portal.repository.StudentRepository;
import tz.ac.suza.campus_portal.repository.UserRepository;
import tz.ac.suza.campus_portal.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole() != null ? request.getRole() : User.Role.STUDENT);
        user.setIsActive(true);

        User savedUser = userRepository.save(user);

        if (user.getRole() == User.Role.STUDENT) {
            Student student = new Student();
            student.setUser(savedUser);
            student.setRegistrationNumber(request.getRegistrationNumber());
            student.setYearOfStudy(request.getYearOfStudy());
            student.setDepartment(request.getDepartment());
            studentRepository.save(student);
        }

        return AuthResponse.builder()
                .userId(savedUser.getId())
                .username(savedUser.getUsername())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .message("User registered successfully")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Login successful")
                .build();
    }
}