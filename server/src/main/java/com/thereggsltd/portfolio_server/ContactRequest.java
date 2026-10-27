package com.thereggsltd.portfolioserver;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        String subject,

        @NotBlank(message = "Message is required")
        @Size(min = 10, message = "Message must be at least 10 characters")
        String message
) {}