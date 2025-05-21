package com.planzone.planzone.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BookingDTO {
    private String id;
    private String userId;
    private String eventId;
    private int numberOfSeats;
    private LocalDateTime bookingDate;
    private String status;
}