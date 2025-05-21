# PlanZone - Système de Réservation d'Événements

## Table des matières
1. [Introduction](#introduction)
2. [Fonctionnalités](#fonctionnalités)
3. [Architecture du projet](#architecture-du-projet)
4. [Guide de démarrage](#guide-de-démarrage)
5. [Architecture technique détaillée](#architecture-technique-détaillée)
6. [Concepts Spring Boot](#concepts-spring-boot)
7. [Guide des API](#guide-des-api)
8. [Sécurité](#sécurité)
9. [Tests avec Postman](#tests-avec-postman)
10. [Évolutions possibles](#évolutions-possibles)

## Introduction

PlanZone est une application de réservation d'événements développée avec Spring Boot. Elle permet aux utilisateurs de s'inscrire, de parcourir les événements disponibles et de réserver des places. Les administrateurs peuvent créer, modifier et supprimer des événements.

Pour simuler une base de données, l'application utilise des fichiers JSON stockés localement, ce qui la rend facile à déployer et à tester sans dépendances externes.

## Fonctionnalités

- **Gestion des utilisateurs**
  - Inscription et connexion
  - Profils utilisateur et administrateur

- **Gestion des événements**
  - Création, modification et suppression d'événements (admin)
  - Affichage des détails d'un événement
  - Liste des événements disponibles

- **Gestion des réservations**
  - Réservation de places pour un événement
  - Modification et annulation de réservations
  - Consultation des réservations effectuées

- **Sécurité**
  - Authentification via JWT (JSON Web Token)
  - Autorisation basée sur les rôles (utilisateur/admin)

## Architecture du projet

```
com.planzone.planzone
├── config                  # Configuration Spring (sécurité, initialisation des données)
├── controller              # Points d'entrée API REST
├── dto                     # Objets de transfert de données
├── exception               # Gestion des exceptions
├── model                   # Entités métier
├── repository              # Accès aux données (fichiers JSON)
├── security                # Configuration de sécurité, JWT
├── service                 # Logique métier
└── util                    # Utilitaires (gestion des fichiers JSON)
```

## Guide de démarrage

### Prérequis
- Java 11+ installé
- Maven installé
- Postman (pour tester les API)

### Installation et démarrage
1. Clonez le projet
2. Compilez avec Maven : `mvn clean install`
3. Lancez l'application : `mvn spring-boot:run`
4. L'application sera accessible à l'adresse : http://localhost:8080

### Comptes par défaut
L'application crée automatiquement deux comptes à son démarrage :
- **Admin** : username: `admin`, password: `admin123`
- **Utilisateur** : username: `user`, password: `user123`

## Architecture technique détaillée

### 1. Modèles (model)

Les classes de modèle représentent les entités principales de l'application :

- **User** : Représente un utilisateur (id, username, email, password, role)
- **Event** : Représente un événement (id, title, description, dateTime, location, etc.)
- **Booking** : Représente une réservation (id, userId, eventId, numberOfSeats, status, etc.)

### 2. Couche d'accès aux données (repository)

Les repositories gèrent la persistance et la récupération des données depuis les fichiers JSON :

- **UserRepository** : Opérations CRUD pour les utilisateurs
- **EventRepository** : Opérations CRUD pour les événements
- **BookingRepository** : Opérations CRUD pour les réservations

Le composant `JsonFileHandler` est responsable de la lecture/écriture dans les fichiers JSON.

### 3. Couche service

Les services contiennent la logique métier de l'application :

- **UserService** : Gestion des utilisateurs (création, mise à jour, etc.)
- **EventService** : Gestion des événements
- **BookingService** : Gestion des réservations, y compris la logique de disponibilité des places

### 4. Contrôleurs REST

Les contrôleurs exposent les API REST :

- **AuthController** : API d'authentification (login, register)
- **UserController** : CRUD pour les utilisateurs
- **EventController** : CRUD pour les événements
- **BookingController** : CRUD pour les réservations

### 5. DTO (Data Transfer Objects)

Les DTOs sont utilisés pour encapsuler les données échangées avec les clients :

- **UserDTO** : Données utilisateur (sans mot de passe pour les réponses)
- **EventDTO** : Données d'événement
- **BookingDTO** : Données de réservation
- **LoginRequestDTO/LoginResponseDTO** : Pour l'authentification

## Concepts Spring Boot

### Annotations importantes

- **@SpringBootApplication** : Annotation principale qui combine @Configuration, @EnableAutoConfiguration et @ComponentScan
- **@RestController** : Indique que la classe est un contrôleur REST
- **@RequestMapping** : Définit l'URL de base pour un contrôleur
- **@GetMapping, @PostMapping, etc.** : Définissent les méthodes HTTP pour chaque endpoint
- **@Service** : Marque une classe comme composant de service (logique métier)
- **@Repository** : Marque une classe comme composant d'accès aux données
- **@Component** : Marque une classe comme composant Spring général
- **@Autowired** : Injection de dépendances

### Spring Security

- **Authentification** : Utilise les JWT pour l'authentification sans état
- **Autorisation** : Utilise @PreAuthorize pour sécuriser les endpoints basés sur les rôles
- **Filtres** : JwtFilter intercepte les requêtes pour vérifier et extraire les tokens JWT

## Guide des API

### Authentification

#### Inscription
- **URL** : `/api/auth/register`
- **Méthode** : POST
- **Corps de la requête** :
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Connexion
- **URL** : `/api/auth/login`
- **Méthode** : POST
- **Corps de la requête** :
  ```json
  {
    "username": "john_doe",
    "password": "password123"
  }
  ```
- **Réponse** :
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "userId": "1234-5678-9012",
    "username": "john_doe",
    "role": "ROLE_USER"
  }
  ```

### Événements

#### Liste des événements
- **URL** : `/api/events`
- **Méthode** : GET
- **Accès** : Public

#### Détails d'un événement
- **URL** : `/api/events/{id}`
- **Méthode** : GET
- **Accès** : Public

#### Créer un événement (admin)
- **URL** : `/api/events`
- **Méthode** : POST
- **Accès** : Admin seulement
- **En-tête** : `Authorization: Bearer your_jwt_token`
- **Corps de la requête** :
  ```json
  {
    "title": "Concert de Jazz",
    "description": "Une soirée mémorable avec les meilleurs musiciens de jazz.",
    "dateTime": "2023-12-15T20:00:00",
    "location": "Salle Pleyel, Paris",
    "totalSeats": 200,
    "organizer": "JazzPassion",
    "categories": ["Musique", "Jazz", "Concert"],
    "imageUrl": "https://example.com/images/jazz.jpg"
  }
  ```

### Réservations

#### Créer une réservation
- **URL** : `/api/bookings`
- **Méthode** : POST
- **Accès** : Utilisateurs authentifiés
- **En-tête** : `Authorization: Bearer your_jwt_token`
- **Corps de la requête** :
  ```json
  {
    "userId": "user_id_here",
    "eventId": "event_id_here",
    "numberOfSeats": 2
  }
  ```

#### Liste des réservations d'un utilisateur
- **URL** : `/api/bookings/user/{userId}`
- **Méthode** : GET
- **Accès** : Utilisateur concerné ou admin
- **En-tête** : `Authorization: Bearer your_jwt_token`

## Sécurité

### JWT (JSON Web Token)

L'application utilise JWT pour l'authentification. Quand un utilisateur se connecte, un token JWT est généré et renvoyé au client. Ce token contient :
- Le nom d'utilisateur (sujet)
- Date d'émission
- Date d'expiration
- Une signature pour vérifier l'authenticité

Pour les requêtes nécessitant une authentification, le client doit inclure le token dans l'en-tête HTTP :
```
Authorization: Bearer your_jwt_token
```

### Flux d'authentification
1. L'utilisateur s'inscrit ou se connecte
2. Le serveur valide les identifiants et génère un JWT
3. Le client stocke le JWT (généralement dans le localStorage)
4. Pour les requêtes sécurisées, le client envoie le JWT dans l'en-tête
5. Le serveur valide le JWT avant de traiter la requête

## Tests avec Postman

1. Installez et ouvrez Postman
2. Créez une nouvelle Collection "PlanZone"
3. Ajoutez des requêtes pour tester les différents endpoints

### Exemple de workflow de test
1. Inscription d'un nouvel utilisateur
2. Connexion pour obtenir un token JWT
3. Enregistrez le token JWT dans une variable d'environnement Postman
4. Utilisez ce token pour tester les endpoints sécurisés
