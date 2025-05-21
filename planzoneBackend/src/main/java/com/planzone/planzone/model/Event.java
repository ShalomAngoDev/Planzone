package com.planzone.planzone.model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
public class Event {
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

    public Event() {
        this.id = UUID.randomUUID().toString();
        this.categories = new ArrayList<>();
    }
}