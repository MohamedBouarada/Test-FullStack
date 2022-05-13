# Test Typescript - Angular 8

## Configuration requise

- [Npm](https://www.npmjs.com/get-npm)
- Angular, installation via `npm install -g @angular/cli`

## Objectifs

Le but est d'avoir un frontend permettant de :

- S'inscrire et se connecter
- Créer et afficher les projets de financement d'un utilisateur

## Démarrage

1. Installer les dépendances via `npm install`
2. Lancer le serveur de développement `ng serve`, la page sera accessible sur `localhost:4200`

## Tâches

Vous pouvez modifier le code à votre guise

### Partie Angular

Il y a plusieurs TODOs avec des explications de ce qui est attendu dans le projet :

1. 1 TODO dans [login.component.ts](src/app/login/login.component.ts)
2. 1 TODO dans [register.component.ts](src/app/register/register.component.ts)
3. 1 TODO dans [application.service.ts](src/app/service/application.service.ts)
4. 2 TODO dans [home.component.ts](src/app/home/home.component.ts)
5. 2 TODO dans [home.component.html](src/app/home/home.component.html)

### Partie tests

Mettre en place un scénario de test automatique avec les étapes suivantes :

1. Créer un compte utilisateur (API `/register`)
2. Consulter ses projets (API `getProjects`)
3. Créer un nouveau projet (API `/saveProject`)
4. Vérifier que le nouveau projet apparaît sur l'écran des projets (API `getProjects`)

Vous pouvez utiliser les technologies de tests de votre choix
