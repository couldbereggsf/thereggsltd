package com.thereggsltd.portfolioserver;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository repository;

    public ContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> handleContactForm(@Valid @RequestBody ContactRequest request) {
        
        // Save to PostgreSQL database
        ContactMessage message = new ContactMessage(
            request.name(), 
            request.email(), 
            request.subject(), 
            request.message()
        );
        repository.save(message);

        System.out.println("Saved to DB: " + message.getId());

        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Message received successfully!"
        ));
    }
}