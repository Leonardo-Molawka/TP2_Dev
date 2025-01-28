# Serveur NodeJS : Personnages Marvel

Ce projet affiche les personnages Marvel grâce à l'API Marvel.

## Fonctionnalités

- Récupération des personnages via l'API Marvel.
- Affichage dynamique (nom, description, image) avec Handlebars.
- Conteneurisation avec Docker.

## Étapes principales

1. **Accès à l'API** : Hachage MD5 et récupération des données avec `crypto`.
2. **Serveur** : Configuration de Fastify et route principale `/`.
3. **Templates** : Utilisation de Handlebars pour le rendu dynamique.
4. **Docker** : Fichiers `.dockerignore` et `Dockerfile` pour le déploiement.

## Instructions

- **Local** : `npm install`, puis `node src/server.js` ([http://localhost:3000](http://localhost:3000)).
- **Docker** : `docker build . -t marvels-app`, puis `docker run -p 3000:3000 marvels-app`.

---

Projet simple et fonctionnel pour explorer l'univers Marvel.
