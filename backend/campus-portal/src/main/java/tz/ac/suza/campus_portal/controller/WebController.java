package tz.ac.suza.campus_portal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    // ============================================
    // VIEW PAGES - Zote zimebadilishwa kuwa /view/
    // Ili zisigongane na REST APIs
    // ============================================
    
    @GetMapping("/view/clubs")
    public String clubs() {
        return "clubs";
    }

    @GetMapping("/view/trainings")
    public String trainings() {
        return "trainings";
    }
    
    @GetMapping("/view/applications")
    public String applications() {
        return "applications";
    }
}