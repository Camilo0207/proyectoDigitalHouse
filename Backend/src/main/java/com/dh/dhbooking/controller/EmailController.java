package com.dh.dhbooking.controller;

import com.dh.dhbooking.exception.ResourceNotFoundException;
import com.dh.dhbooking.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }



    @PostMapping("/confirmation/{id}")
    public ResponseEntity<?> confirmationBooking(@PathVariable Integer id) throws ResourceNotFoundException {
        emailService.sendMail(id);
        return new ResponseEntity("Confirmación de reserva",HttpStatus.OK);
    }
}
