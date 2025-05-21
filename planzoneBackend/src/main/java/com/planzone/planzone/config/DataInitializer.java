package com.planzone.planzone.config;

import com.planzone.planzone.model.Event;
import com.planzone.planzone.model.User;
import com.planzone.planzone.repository.EventRepository;
import com.planzone.planzone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Vérifier si des utilisateurs existent déjà
        if (userRepository.findAll().isEmpty()) {
            // Créer un admin
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@planzone.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);

            // Créer un utilisateur
            User user = new User();
            user.setUsername("user");
            user.setEmail("user@planzone.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole("ROLE_USER");
            userRepository.save(user);

            System.out.println("Utilisateurs initialisés!");
        }

        // Vérifier si des événements existent déjà
        if (eventRepository.findAll().isEmpty()) {
            // Créer des événements de test
            Event concert = new Event();
            concert.setTitle("Concert de Jazz");
            concert.setDescription("Une soirée mémorable avec les meilleurs musiciens de jazz.");
            concert.setDateTime(LocalDateTime.now().plusDays(15));
            concert.setLocation("Salle Pleyel, Paris");
            concert.setTotalSeats(200);
            concert.setAvailableSeats(200);
            concert.setOrganizer("JazzPassion");
            concert.setCategories(Arrays.asList("Musique", "Jazz", "Concert"));
            concert.setImageUrl("https://example.com/images/jazz_concert.jpg");
            eventRepository.save(concert);

            Event conference = new Event();
            conference.setTitle("Conférence sur l'IA");
            conference.setDescription("Découvrez les dernières avancées en intelligence artificielle.");
            conference.setDateTime(LocalDateTime.now().plusDays(7));
            conference.setLocation("Centre de Conférences, Lyon");
            conference.setTotalSeats(150);
            conference.setAvailableSeats(150);
            conference.setOrganizer("TechInnov");
            conference.setCategories(Arrays.asList("Technologie", "IA", "Conférence"));
            conference.setImageUrl("https://example.com/images/ai_conference.jpg");
            eventRepository.save(conference);

            Event workshop = new Event();
            workshop.setTitle("Atelier de peinture");
            workshop.setDescription("Apprenez les techniques de base de la peinture à l'huile.");
            workshop.setDateTime(LocalDateTime.now().plusDays(3));
            workshop.setLocation("Galerie d'Art, Bordeaux");
            workshop.setTotalSeats(20);
            workshop.setAvailableSeats(20);
            workshop.setOrganizer("ArtsVisuels");
            workshop.setCategories(Arrays.asList("Art", "Peinture", "Atelier"));
            workshop.setImageUrl("https://example.com/images/painting_workshop.jpg");
            eventRepository.save(workshop);

            System.out.println("Événements initialisés!");
        }
    }
}