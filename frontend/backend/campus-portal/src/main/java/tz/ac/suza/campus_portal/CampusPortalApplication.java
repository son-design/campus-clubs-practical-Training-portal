package tz.ac.suza.campus_portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CampusPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(CampusPortalApplication.class, args);
        System.out.println("🚀 Campus Portal started on http://localhost:8080/api");
    }
}