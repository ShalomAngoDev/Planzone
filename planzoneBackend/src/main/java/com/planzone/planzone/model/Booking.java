package com.planzone.planzone.model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class Booking {
    private String id;
    private String userId;
    private String eventId;
    private int numberOfSeats;
    private LocalDateTime bookingDate;
    private String status; // CONFIRMED, CANCELLED, PENDING

    public Booking() {
        this.id = UUID.randomUUID().toString();
        this.bookingDate = LocalDateTime.now();
        this.status = "CONFIRMED";
    }
}