# planZone - Plateforme de Réservation d'Événements

planZone est une application web fullstack permettant aux utilisateurs de découvrir et réserver des places pour divers événements (conférences, concerts, ateliers), et aux organisateurs de gérer ces événements facilement.

## 📑 Table des matières

- [planZone - Plateforme de Réservation d'Événements](#planzone---plateforme-de-réservation-dévénements)
  - [📑 Table des matières](#-table-des-matières)
  - [🎯 Présentation](#-présentation)
  - [🏗 Architecture](#-architecture)
  - [✨ Fonctionnalités clés](#-fonctionnalités-clés)
    - [Pour les utilisateurs](#pour-les-utilisateurs)
    - [Pour les administrateurs](#pour-les-administrateurs)
  - [🛠 Technologies utilisées](#-technologies-utilisées)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Outils de développement](#outils-de-développement)
  - [🚀 Démarrage rapide](#-démarrage-rapide)
    - [Prérequis](#prérequis)
    - [1. Démarrer le backend](#1-démarrer-le-backend)
    - [2. Démarrer le frontend](#2-démarrer-le-frontend)
  - [📂 Structure du projet](#-structure-du-projet)
  - [📚 Documentation avancée](#-documentation-avancée)
  - [📸 Screenshots](#-screenshots)
    - [Interface utilisateur](#interface-utilisateur)
    - [Interface administrateur](#interface-administrateur)
  - [📝 Licence](#-licence)
  - [Contact](#contact)

## 🎯 Présentation

planZone a été conçu pour simplifier l'organisation et la participation à des événements. L'application offre une expérience utilisateur fluide et intuitive, avec une interface moderne côté client et une API robuste et sécurisée côté serveur.

Le projet est divisé en deux parties principales :
- **Frontend** : Application Angular avec une interface utilisateur responsive et interactive
- **Backend** : API REST Spring Boot fournissant toutes les fonctionnalités métier et la persistance des données

## 🏗 Architecture

L'application suit une architecture client-serveur classique :

**Frontend (Angular)**
- Interface utilisateur responsive
- Gestion d'état côté client
- Routage et navigation
- Communication avec le backend via HTTP

**Backend (Spring Boot)**
- API REST sécurisée
- Logique métier
- Persistance des données
- Authentification et autorisation

La communication entre le frontend et le backend se fait via des requêtes HTTP et l'authentification est gérée par des tokens JWT.

## ✨ Fonctionnalités clés

### Pour les utilisateurs
- Parcourir et rechercher des événements
- Filtrer par catégories, dates ou lieu
- Consulter les détails des événements
- Créer un compte et se connecter
- Réserver des places pour un événement
- Gérer ses réservations existantes
- Voir l'historique des réservations
- Profil utilisateur personnalisable

### Pour les administrateurs
- Tableau de bord avec statistiques
- Création et gestion complète des événements
- Suivi des réservations
- Gestion des utilisateurs
- Rapports et analyses

## 🛠 Technologies utilisées

### Frontend
- **Angular 18**
- **TypeScript**
- **Angular Material**
- **RxJS**
- **SCSS**

### Backend
- **Java 17**
- **Spring Boot 3**
- **Spring Security**
- **Spring Data JPA**
- **PostgreSQL/MySQL**
- **JWT Authentication**

### Outils de développement
- **Git**
- **Maven/Gradle**
- **npm**
- **Docker** (optionnel)

## 🚀 Démarrage rapide

Pour lancer le projet complet, vous devez démarrer à la fois le backend et le frontend.

### Prérequis
- Java 17+
- Node.js 18+
- npm 9+
- PostgreSQL/MySQL

### 1. Démarrer le backend

```bash
# Accéder au dossier backend
cd planzoneBackend

# Compiler et lancer le projet
./mvnw spring-boot:run
```

Le backend sera accessible à l'adresse : `http://localhost:8080`

### 2. Démarrer le frontend

```bash
# Accéder au dossier frontend
cd planZone

# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

Le frontend sera accessible à l'adresse : `http://localhost:4200`

Pour des instructions plus détaillées, consultez les README spécifiques dans chaque dossier :
- [Documentation du Frontend](./planZone/README.md)
- [Documentation du Backend](./planzoneBackend/README.md)

## 📂 Structure du projet

```
planZone-project/
├── planZone/                # Application frontend Angular
│   ├── src/                 # Code source du frontend
│   ├── README.md            # Documentation spécifique au frontend
│   └── ...
│
├── planzoneBackend/         # API backend Spring Boot
│   ├── src/                 # Code source du backend
│   ├── README.md            # Documentation spécifique au backend
│   └── ...
│
└── README.md                # Ce fichier (documentation générale)
```

## 📚 Documentation avancée

Pour des informations plus détaillées sur chaque partie du projet, consultez :

- **Frontend** : [Documentation frontend complète](./planZone/README.md)
  - Composants et services
  - Gestion d'état
  - Routing
  - Styles et thème

- **Backend** : [Documentation backend complète](./planzoneBackend/README.md)
  - Modèles de données
  - Controllers et services
  - Sécurité et authentification
  - Configuration

## 📸 Screenshots

### Interface utilisateur
![Page d'accueil](./Capture%20d'écran2.png)
![Liste des événements](./Capture%20d'écran3.png)
![Détail d'un événement](./Capture%20d'écran4.png)

### Interface administrateur
![Tableau de bord admin](./Capture%20d'écran7.png)
![Gestion des événements](./Capture%20d'écran8.png)


## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Contact

[ANGO Shalom] - [angoshalom@gmail.com]
