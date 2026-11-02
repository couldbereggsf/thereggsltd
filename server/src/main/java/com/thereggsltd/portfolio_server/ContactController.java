package com.thereggsltd.portfolioserver;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173") // Allows my React dev server to talk to it
public class ContactController {

    @PostMapping
    public ResponseEntity<?> handleContactForm(@Valid @RequestBody ContactRequest request) {

        // For now, I will just print to the console.
        // Later, I will save this to PostgreSQL and send an email via AWS SES/Nodemailer equivalent.
        System.out.println("New message from: " + request.name() + " (" + request.email() + ")");
        System.out.println("Subject: " + request.subject());
        System.out.println("Message: " + request.message());

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Message received successfully!"
        ));
    }
}