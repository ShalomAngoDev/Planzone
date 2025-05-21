package com.planzone.planzone.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.planzone.planzone.model.User;
import com.planzone.planzone.util.JsonFileHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class UserRepository {
    private final JsonFileHandler<User> fileHandler;
    private final String filePath;

    public UserRepository(JsonFileHandler<User> fileHandler,
            @Value("${data.folder:./data}") String dataFolder) {
        this.fileHandler = fileHandler;
        this.filePath = dataFolder + "/users.json";
    }

    public List<User> findAll() {
        return fileHandler.readFromFile(filePath, new TypeReference<List<User>>() {
        });
    }

    public Optional<User> findById(String id) {
        return findAll().stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    public Optional<User> findByUsername(String username) {
        return findAll().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }

    public Optional<User> findByEmail(String email) {
        return findAll().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst();
    }

    public User save(User user) {
        List<User> users = findAll();

        List<User> updatedUsers = users.stream()
                .filter(u -> !u.getId().equals(user.getId()))
                .collect(Collectors.toList());

        updatedUsers.add(user);
        fileHandler.writeToFile(filePath, updatedUsers);

        return user;
    }

    public void deleteById(String id) {
        List<User> users = findAll();
        List<User> updatedUsers = users.stream()
                .filter(user -> !user.getId().equals(id))
                .collect(Collectors.toList());

        fileHandler.writeToFile(filePath, updatedUsers);
    }
}