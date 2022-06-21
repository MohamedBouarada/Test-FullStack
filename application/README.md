# Test Java - Spring Boot - Hibernate

## Configuration requise

- JDK 11 / Maven
- Docker / Docker compose

## Objectifs

Le but est d'avoir un backend permettant :

- Inscription d'un utilisateur
- Connexion d'un utilisateur
- Création d'un projet de financement
- Récupération des projets liés à un utilisateur

## Démarrage

1. Démarrer le MySQL via `docker-compose up -d`, veillez à ne pas avoir MySQL déjà lancé pour avoir le port 3306 de libre
2. Lancer votre application via votre IDE ou `./mvnw clean install spring-boot:run`, votre API sera disponible sur localhost:8080
3. La base de données MySQL s'initialisera au premier lancement de l'application

## Tâches

Vous pouvez modifier le code à votre guise pour réaliser les tâches

### Partie Spring/Hibernate

Il y a plusieurs TODOs avec des explications de ce qui est attendu dans le projet :

- [ApplicationRouting](src/main/java/com/finalgo/application/api/ApplicationRouting.java)
- [UserDao](src/main/java/com/finalgo/application/dao/UserDao.java)
