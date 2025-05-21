package com.planzone.planzone.service;

import com.planzone.planzone.dto.EventDTO;
import com.planzone.planzone.exception.ResourceNotFoundException;
import com.planzone.planzone.model.Event;
import com.planzone.planzone.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EventDTO getEventById(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
        return convertToDTO(event);
    }

    public EventDTO createEvent(EventDTO eventDTO) {
        Event event = convertToEntity(eventDTO);
        event.setAvailableSeats(event.getTotalSeats()); // Initially all seats are available
        Event savedEvent = eventRepository.save(event);
        return convertToDTO(savedEvent);
    }

    public EventDTO updateEvent(String id, EventDTO eventDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));

        existingEvent.setTitle(eventDTO.getTitle());
        existingEvent.setDescription(eventDTO.getDescription());
        existingEvent.setDateTime(eventDTO.getDateTime());
        existingEvent.setLocation(eventDTO.getLocation());

        // Calculate available seats based on current bookings
        int bookedSeats = existingEvent.getTotalSeats() - existingEvent.getAvailableSeats();
        existingEvent.setTotalSeats(eventDTO.getTotalSeats());
        existingEvent.setAvailableSeats(eventDTO.getTotalSeats() - bookedSeats);

        existingEvent.setOrganizer(eventDTO.getOrganizer());
        existingEvent.setCategories(eventDTO.getCategories());
        existingEvent.setImageUrl(eventDTO.getImageUrl());

        Event updatedEvent = eventRepository.save(existingEvent);
        return convertToDTO(updatedEvent);
    }

    public void deleteEvent(String id) {
        if (!eventRepository.findById(id).isPresent()) {
            throw new ResourceNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }

    // Méthode interne pour gérer les places disponibles
    public void updateAvailableSeats(String eventId, int seatsChange) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        int newAvailableSeats = event.getAvailableSeats() - seatsChange;

        if (newAvailableSeats < 0) {
            throw new IllegalStateException("Not enough available seats");
        }

        event.setAvailableSeats(newAvailableSeats);
        eventRepository.save(event);
    }

    private EventDTO convertToDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setDateTime(event.getDateTime());
        dto.setLocation(event.getLocation());
        dto.setTotalSeats(event.getTotalSeats());
        dto.setAvailableSeats(event.getAvailableSeats());
        dto.setOrganizer(event.getOrganizer());
        dto.setCategories(event.getCategories());
        dto.setImageUrl(event.getImageUrl());
        return dto;
    }

    private Event convertToEntity(EventDTO dto) {
        Event event = new Event();
        if (dto.getId() != null) {
            event.setId(dto.getId());
        }
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDateTime(dto.getDateTime());
        event.setLocation(dto.getLocation());
        event.setTotalSeats(dto.getTotalSeats());
        event.setAvailableSeats(dto.getAvailableSeats());
        event.setOrganizer(dto.getOrganizer());
        event.setCategories(dto.getCategories());
        event.setImageUrl(dto.getImageUrl());
        return event;
    }
}