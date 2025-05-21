# planZone - Frontend

planZone est une application web moderne permettant aux utilisateurs de réserver des places pour divers événements comme des conférences, concerts et ateliers. Cette application comprend à la fois une interface utilisateur intuitive pour les visiteurs et une interface d'administration complète pour la gestion des événements.

## 📑 Table des matières

- [planZone - Frontend](#planzone---frontend)
  - [📑 Table des matières](#-table-des-matières)
  - [🎯 Présentation](#-présentation)
  - [✨ Fonctionnalités](#-fonctionnalités)
    - [Utilisateurs standard](#utilisateurs-standard)
    - [Administrateurs](#administrateurs)
  - [🛠 Technologies utilisées](#-technologies-utilisées)
  - [📦 Installation](#-installation)
    - [Prérequis](#prérequis)
    - [Configuration](#configuration)
  - [📂 Structure du projet](#-structure-du-projet)
  - [🚀 Guide de développement](#-guide-de-développement)
    - [Commandes principales](#commandes-principales)
    - [Conventions de code](#conventions-de-code)
    - [Création de nouveaux composants](#création-de-nouveaux-composants)
  - [🔒 Authentification et sécurité](#-authentification-et-sécurité)
    - [Création d'un compte administrateur](#création-dun-compte-administrateur)
  - [📡 API Backend](#-api-backend)
    - [Authentification](#authentification)
    - [Événements](#événements)
    - [Réservations](#réservations)
  - [📤 Déploiement](#-déploiement)
  - [Licence](#licence)

## 🎯 Présentation

planZone est une plateforme de gestion d'événements complète permettant aux utilisateurs de découvrir et réserver des événements, et aux administrateurs de gérer l'ensemble du processus. L'interface utilisateur est conçue pour être intuitive, responsive et agréable à utiliser.

## ✨ Fonctionnalités

### Utilisateurs standard
- Inscription et connexion sécurisées
- Parcourir et rechercher des événements
- Filtrer les événements par catégorie
- Consulter les détails d'un événement
- Réserver des places pour un événement
- Gérer ses réservations (voir, annuler)
- Profil utilisateur personnalisé

### Administrateurs
- Tableau de bord avec statistiques
- Gestion complète des événements (CRUD)
- Visualisation des réservations par événement
- Gestion des utilisateurs

## 🛠 Technologies utilisées

- **Angular 18** - Framework frontend
- **Angular Material** - Composants UI
- **RxJS** - Programmation réactive
- **TypeScript** - Langage de programmation
- **SCSS** - Styles avancés
- **JWT** - Authentification sécurisée

## 📦 Installation

### Prérequis

- Node.js (v18+)
- npm (v9+)
- Backend planZone fonctionnel (API REST Spring Boot)

### Configuration

1. Clonez le dépôt
```bash
git clone https://github.com/votre-utilisateur/planzone.git
cd planzone
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez l'URL de l'API backend dans `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

4. Lancez l'application en mode développement
```bash
ng serve
```

5. Accédez à l'application
```
http://localhost:4200
```

## 📂 Structure du projet

```
src/
├── app/
│   ├── core/                 # Services, modèles et guards essentiels
│   │   ├── guards/           # Contrôle d'accès aux routes
│   │   ├── interceptors/     # Intercepteurs HTTP
│   │   ├── models/           # Interfaces de données
│   │   └── services/         # Services partagés
│   │
│   ├── features/             # Modules fonctionnels
│   │   ├── admin/            # Gestion admin
│   │   ├── auth/             # Authentification
│   │   ├── bookings/         # Réservations
│   │   ├── events/           # Événements
│   │   ├── home/             # Page d'accueil
│   │   └── user-profile/     # Profil utilisateur
│   │
│   └── shared/               # Composants, directives, pipes partagés
│       └── components/       # Composants réutilisables
│
├── assets/                   # Images, polices, etc.
├── environments/             # Configuration d'environnement
└── styles/                   # Styles globaux
```

## 🚀 Guide de développement

### Commandes principales

- **Démarrer le serveur de développement** : `ng serve`
- **Compiler le projet** : `ng build`
- **Exécuter les tests** : `ng test`
- **Vérifier la qualité du code** : `ng lint`

### Conventions de code

- **Composants** : Utilisez l'approche standalone pour tous les composants
- **Nommage** : Utilisez le kebab-case pour les noms de fichiers et PascalCase pour les classes
- **State Management** : Utilisez les services avec BehaviorSubject pour la gestion d'état
- **Reactive Forms** : Privilégiez les formulaires réactifs pour tous les formulaires

### Création de nouveaux composants

```bash
ng generate component features/mon-feature/mon-composant --standalone
```

## 🔒 Authentification et sécurité

L'application utilise JWT (JSON Web Tokens) pour l'authentification :

1. L'utilisateur s'authentifie via le formulaire de connexion
2. Le backend valide les identifiants et renvoie un token JWT
3. Le token est stocké localement (localStorage)
4. Un intercepteur HTTP ajoute le token à toutes les requêtes API
5. Les guards d'authentification protègent les routes nécessitant une connexion

### Création d'un compte administrateur

Pour tester les fonctionnalités d'administration :

1. Créez un compte utilisateur standard via l'interface
2. Accédez à la base de données ou utilisez l'API backend pour promouvoir l'utilisateur au rôle `ROLE_ADMIN`
3. Reconnectez-vous pour accéder aux fonctionnalités d'administration

## 📡 API Backend

L'application communique avec une API REST développée avec Spring Boot. Les principaux endpoints sont :

### Authentification
- **Inscription** : `POST /api/auth/register`
- **Connexion** : `POST /api/auth/login`

### Événements
- **Liste des événements** : `GET /api/events`
- **Détails d'un événement** : `GET /api/events/{id}`
- **Créer un événement** : `POST /api/events` (admin)
- **Modifier un événement** : `PUT /api/events/{id}` (admin)
- **Supprimer un événement** : `DELETE /api/events/{id}` (admin)

### Réservations
- **Créer une réservation** : `POST /api/bookings`
- **Réservations d'un utilisateur** : `GET /api/bookings/user/{userId}`
- **Annuler une réservation** : `DELETE /api/bookings/{id}`

## 📤 Déploiement

Pour déployer l'application en production :

1. Construisez l'application avec l'environnement de production
```bash
ng build --configuration production
```

2. Le dossier `dist/` contient tous les fichiers nécessaires pour le déploiement
3. Déployez ces fichiers sur un serveur web (Nginx, Apache, etc.)
4. Configurez le serveur pour rediriger toutes les requêtes vers `index.html` (pour le routage Angular)

---

## Licence
Ce projet est sous licence MIT.

---

Développé avec Shalom ANGO
