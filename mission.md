# Découverte des microservices

## Objectifs

- Faire fonctionner différents services de langages différents ensemble
- Déployer des services sur différentes machines
- Comprendre les problématiques de communication entre services
- Comprendre les problématiques de stockage de données
- Comprendre les problématiques de sécurité
- Comprendre les problématiques de déploiement
- Comprendre les problématiques de scalabilité

## Contexte

Vous êtes un développeur de backend junior dans une entreprise qui a décidé de passer à une architecture microservices. Vous avez été désigné pour comprendre les bases de cette architecture et de la mettre en place.

## Projet

0. Créer un monorepo où vous mettrez en place les différents services.

Versionnez votre code avec Git et reliez votre dépôt à Github.

1. API Python - Flask - Redis

A l'aide du TP de Docker sur Docker Compose, vous allez devoir mettre en place une API Flask en 
Python. Cette API devra être capable de communiquer avec une base de données Redis. 
https://docs.docker.com/compose/gettingstarted/

2. API NodeJS - Express - Neon

Vous devrez également mettre en place une API en NodeJS qui communiquera avec la même base de données.
CRUD pour stocker des voitures (marque, modèle, année, couleur).

3. API Gateway - http-proxy-middleware

A l'aide du paquet `http-proxy-middleware`, vous devrez mettre en place un API Gateway qui permettra de rediriger les requêtes vers les différents services.

4. Authentification - JWT

Vous devrez mettre en place un système d'authentification pour les différentes API. Vous pourrez utiliser le paquet `jsonwebtoken` pour cela.

Créez des routes pour la création d'un utilisateur, la connexion d'un utilisateur et la récupération des informations de l'utilisateur connecté.
Tout ça dans l'API Gateway.

Créer et ajoutez un middleware pour valider la bonne authentification 
Si le token n'est pas fourni ou non valide, renvoyez une erreur 401 (via un middleware).

## Livrables

Un dépôt git par développeur, mettant en place une architecture microservices.

## Ressources

https://www.linkedin.com/advice/0/what-benefits-drawbacks-using-shared-database-microservices#:~:text=Using%20a%20shared%20database%20for%20microservices%20can%20present%20some%20challenges,schema%20and%20coordinate%20any%20changes

https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/modify-post.md