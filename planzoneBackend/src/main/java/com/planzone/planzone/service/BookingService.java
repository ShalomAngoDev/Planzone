package com.planzone.planzone.service;

import com.planzone.planzone.dto.BookingDTO;
import com.planzone.planzone.exception.ResourceNotFoundException;
import com.planzone.planzone.model.Booking;
import com.planzone.planzone.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventService eventService;

    @Autowired
    public BookingService(BookingRepository bookingRepository, EventService eventService) {
        this.bookingRepository = bookingRepository;
        this.eventService = eventService;
    }

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingById(String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return convertToDTO(booking);
    }

    public List<BookingDTO> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookingDTO> getBookingsByEventId(String eventId) {
        return bookingRepository.findByEventId(eventId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking booking = convertToEntity(bookingDTO);
        booking.setBookingDate(LocalDateTime.now());

        // Update available seats in the event
        eventService.updateAvailableSeats(booking.getEventId(), booking.getNumberOfSeats());

        Booking savedBooking = bookingRepository.save(booking);
        return convertToDTO(savedBooking);
    }

    public BookingDTO updateBooking(String id, BookingDTO bookingDTO) {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        // Calculate seats difference
        int seatsDifference = bookingDTO.getNumberOfSeats() - existingBooking.getNumberOfSeats();

        existingBooking.setNumberOfSeats(bookingDTO.getNumberOfSeats());
        existingBooking.setStatus(bookingDTO.getStatus());

        // Adjust available seats in the event
        if (seatsDifference != 0) {
            eventService.updateAvailableSeats(existingBooking.getEventId(), seatsDifference);
        }

        Booking updatedBooking = bookingRepository.save(existingBooking);
        return convertToDTO(updatedBooking);
    }

    public void cancelBooking(String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        booking.setStatus("CANCELLED");

        // Return seats to available pool
        eventService.updateAvailableSeats(booking.getEventId(), -booking.getNumberOfSeats());

        bookingRepository.save(booking);
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUserId());
        dto.setEventId(booking.getEventId());
        dto.setNumberOfSeats(booking.getNumberOfSeats());
        dto.setBookingDate(booking.getBookingDate());
        dto.setStatus(booking.getStatus());
        return dto;
    }

    private Booking convertToEntity(BookingDTO dto) {
        Booking booking = new Booking();
        if (dto.getId() != null) {
            booking.setId(dto.getId());
        }
        booking.setUserId(dto.getUserId());
        booking.setEventId(dto.getEventId());
        booking.setNumberOfSeats(dto.getNumberOfSeats());
        booking.setBookingDate(dto.getBookingDate() != null ? dto.getBookingDate() : LocalDateTime.now());
        booking.setStatus(dto.getStatus() != null ? dto.getStatus() : "CONFIRMED");
        return booking;
    }
}