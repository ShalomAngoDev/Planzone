package com.planzone.planzone.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.planzone.planzone.model.Event;
import com.planzone.planzone.util.JsonFileHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class EventRepository {
    private final JsonFileHandler<Event> fileHandler;
    private final String filePath;

    public EventRepository(JsonFileHandler<Event> fileHandler,
            @Value("${data.folder:./data}") String dataFolder) {
        this.fileHandler = fileHandler;
        this.filePath = dataFolder + "/events.json";
    }

    public List<Event> findAll() {
        return fileHandler.readFromFile(filePath, new TypeReference<List<Event>>() {
        });
    }

    public Optional<Event> findById(String id) {
        return findAll().stream()
                .filter(event -> event.getId().equals(id))
                .findFirst();
    }

    public Event save(Event event) {
        List<Event> events = findAll();

        List<Event> updatedEvents = events.stream()
                .filter(e -> !e.getId().equals(event.getId()))
                .collect(Collectors.toList());

        updatedEvents.add(event);
        fileHandler.writeToFile(filePath, updatedEvents);

        return event;
    }

    public void deleteById(String id) {
        List<Event> events = findAll();
        List<Event> updatedEvents = events.stream()
                .filter(event -> !event.getId().equals(id))
                .collect(Collectors.toList());

        fileHandler.writeToFile(filePath, updatedEvents);
    }
}