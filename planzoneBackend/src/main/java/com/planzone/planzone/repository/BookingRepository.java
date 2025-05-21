package com.planzone.planzone.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.planzone.planzone.model.Booking;
import com.planzone.planzone.util.JsonFileHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class BookingRepository {
    private final JsonFileHandler<Booking> fileHandler;
    private final String filePath;

    public BookingRepository(JsonFileHandler<Booking> fileHandler,
            @Value("${data.folder:./data}") String dataFolder) {
        this.fileHandler = fileHandler;
        this.filePath = dataFolder + "/bookings.json";
    }

    public List<Booking> findAll() {
        return fileHandler.readFromFile(filePath, new TypeReference<List<Booking>>() {
        });
    }

    public Optional<Booking> findById(String id) {
        return findAll().stream()
                .filter(booking -> booking.getId().equals(id))
                .findFirst();
    }

    public List<Booking> findByUserId(String userId) {
        return findAll().stream()
                .filter(booking -> booking.getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    public List<Booking> findByEventId(String eventId) {
        return findAll().stream()
                .filter(booking -> booking.getEventId().equals(eventId))
                .collect(Collectors.toList());
    }

    public Booking save(Booking booking) {
        List<Booking> bookings = findAll();

        List<Booking> updatedBookings = bookings.stream()
                .filter(b -> !b.getId().equals(booking.getId()))
                .collect(Collectors.toList());

        updatedBookings.add(booking);
        fileHandler.writeToFile(filePath, updatedBookings);

        return booking;
    }

    public void deleteById(String id) {
        List<Booking> bookings = findAll();
        List<Booking> updatedBookings = bookings.stream()
                .filter(booking -> !booking.getId().equals(id))
                .collect(Collectors.toList());

        fileHandler.writeToFile(filePath, updatedBookings);
    }
}