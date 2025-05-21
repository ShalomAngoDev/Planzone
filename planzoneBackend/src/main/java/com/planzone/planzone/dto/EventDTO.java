package com.planzone.planzone.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventDTO {
    private String id;
    private String title;
    private String description;
    private LocalDateTime dateTime;
    private String location;
    private int totalSeats;
    private int availableSeats;
    private String organizer;
    private List<String> categories;
    private String imageUrl;
}