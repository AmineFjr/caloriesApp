# Calorie App
[CalorieApp](https://github.com/AmineFjr/caloriesApp)

---

- VueJS [3.x]
- NodeJs [19.8.x]
- ExpressJs [x.x]
- Quasar [3.3.x]

---

## Table of contents

- [Calorie App](#calorie-app)
  - [Table of contents](#table-of-contents)
  - [About the project](#about-the-project)
    - [Contributors](#contributors)
    - [Description](#description)
    - [Technical architecture](#technical-architecture)
      - [Express](#express)
      - [API developpement](#api-developpement)
      - [Quasar](#quasar)
    - [Environments](#environments)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Test](#test)
  - [Frequently asked questions](#frequently-asked-questions)
    - [Comment fonctionne les calories](#comment-fonctionne-les-calories)
  - [Fonctionnalité actuel détaillé](#fonctionnalité-actuel-détaillé)
    - [Ajout de recette](#ajout-de-recette)
    - [Analyse d'une recette](#analyse-dune-recette)
    - [Voir les recettes](#voir-les-recettes)
    - [Supression des recettes](#supression-des-recettes)
    - [Modification d'une recette](#modification-dune-recette)
  - [Comment améliorer le site](#comment-améliorer-le-site)
    - [Ajout d'un formulaire par rapport a nos besoins calorique](#ajout-dun-formulaire-par-rapport-a-nos-besoins-calorique)
    - [Ajouter d'autre données que les calories](#ajouter-dautre-données-que-les-calories)
    - [Ajout d'un backoffice admin](#ajout-dun-backoffice-admin)


---


## About the project

### Contributors

 * **Developers Node :** Nalvac Atinhounon <vacna1997@gmail.com> / Amine Fajry <fajry39@gmail.com>
 * **Developer Vue :** Robin Coblentz <robin.coblentz.26@gmail.com> / Nadia Schwaller <nadia1.schwaller@gmail.com>
 * **Project manager :** Nadia Schwaller <nadia1.schwaller@gmail.com>
 
### Description

Welcome to our project, the CalorieApp. This project is a REST API that aims to help you understand how many calories are in your recipes.

Our API is designed to calculate the caloric value of any recipe based on the ingredients used. This feature can be of great help for those following a specific diet or just wanting to understand the nutritional impact of what they eat.

With our API, you can enter the details of your recipe, such as the list of ingredients and their quantity, and you will receive in return the total calorie count of the recipe. The API is capable of recognizing a wide range of ingredients, and we are constantly striving to improve it to include more nutritional data and ingredients.

CalorieApp was created with the goal of making calorie tracking easier and more convenient for everyone. Whether you are a chef, a nutritionist, a fitness app developer, or just someone who loves to cook at home, this API is designed to help you make informed decisions about food.


### Technical architecture

#### Express

Express.js is a minimalistic and flexible web server framework for Node.js. It's commonly used for building APIs.

```sh
/myapp
  /node_modules
  /public
    /images
    /javascripts
    /stylesheets
  /routes
    index.js
    users.js
  app.js
  package.json
```
Explanation of directories and files:

- **node_modules/:** This directory contains all the npm packages that are used in your application.
- **public/:** This is the directory that contains all the static files which can be served directly by the server. It may contain sub-directories for images, JavaScript scripts, and CSS stylesheets.
- **routes/:** This directory contains files for handling different routes in your application. Routes define how the application responds to a client request for a specific URL, or a specific HTTP request type (GET, POST, etc.).
- **app.js:** This is the application's entry file. It creates the Express application, loads necessary modules, sets up routes and errors, and listens for connections on a specific port.
- **package.json:** This file contains various metadata about your project, including the application's dependencies.

Express.js is very flexible and allows developers to structure their projects as they see fit. Thus, this structure can be modified to suit the needs of your specific project.

#### API developpement

#### Quasar

Quasar is a frontend framework based on Vue.js. It offers a rich set of components and features for developing responsive user interfaces.

```sh
/myapp
  /node_modules
  /public
    /images
    /javascripts
    /stylesheets
  /src
    /components
    /layouts
    /pages
    /router
  quasar.conf.js
  package.json
```

Explanation of directories and files:

- **node_modules/:** This directory contains all the npm packages used in your application.
- **public/:** This is the directory that contains all static files that can be served directly by the server. It may contain sub-directories for images, JavaScript scripts, and CSS stylesheets.
- **src/:** This directory contains the source code of your Quasar application. It includes the following sub-directories:
- **components/:** This directory contains reusable Vue.js components of your application.
- **layouts/:** This directory contains layout components, which are reusable "page skeletons".
- **pages/:** This directory contains page components, which are "filled" into layout components.
- **router/:** This directory contains the Vue.js router, which handles navigation between pages.
- **quasar.conf.js:** This is the Quasar configuration file. It defines a variety of settings for your Quasar application.
- **package.json:** This file contains various metadata about your project, including the application's dependencies.
 
### Environments

 * URL: localhost
 * Vue Port: 8080
 * Back-Office:

 * Node: /api
 * Node port: 3000


---

## Getting started
### Prerequisites

* node/express
```sh
$ cd backend
```

* npm
```sh
$ npm install
```

* Create database
* Add .env in backend folder
```TABLE_BDD=""
USER_BDD=""
PASSWORD_BDD=""
PORT="3000"
SOCKET_APP=""
PRIVATE_KEY="calorieApp"
```

* vue/quasar
```sh
$ cd ../frontend
```

* yarn 
```sh
$ yarn
```

### Installation

* node/express
```sh
$ cd backend
```

* node
```sh
$ npm start
```

* vue/quasar
```sh
$ cd ../frontend
```

* quasar
```sh
$ quasar dev
```

* start auto http://localhost:8080


## Test


## Frequently asked questions

### Comment fonctionne les calories

- Actuellement chaque ingrédient a dans la base de données les calories qui correspondent à soit 1g / 1cl / 1 pincée de l'ingrédient
- Si on va sur http://localhost:8080/recipes, on peut apercevoir l'equivalent du nombre de calories * la quantité (calcul fait dans le front)

## Fonctionnalité actuel détaillé

### Ajout de recette

Une personne peut ajouter une recette via un formulaire. Nous sommes passé par un formulaire pour empecher la créeation d'ingrédient par l'utilisateur

### Analyse d'une recette

L'utilisateur peut ajouter ou analyser sa recette, s'il souhaite l'analyser il n'y aura pas de sauvegarde dans la db, cependant il aura la les calories total de sa recette ainsi que la possibilité de récupérer sa recette et toute les données lié sous format json ou csv (fichier csv, les cellules sont séparé par des ;)

### Voir les recettes

Affichage de toutes les recettes avec les calories total par ingrédients ainsi que les calories total de la recette

### Supression des recettes

Possibilité de supprimer une recette existente

### Modification d'une recette

Possibilité d'ajouter un ingrédient a une recette, de supprimer un ingredient ou de modifier la quantité de cette ingrédient. Le bouton reset sur la page d'update d'un ingrédient permet de revenir au données par defaut de la recette tant que les modifications ne sont pas sauvegardé


## Comment améliorer le site

### Ajout d'un formulaire par rapport a nos besoins calorique

Chaque personne a un besoin de calories différent en fonction de: 
- niveau d'activité
- poids
- age
- taille
- sexe
- objectif (perte de gras, rester en forme etc...)

### Ajouter d'autre données que les calories 

Ajout de donnée comme les vitamine importantes etc..

### Ajout d'un backoffice admin

Ajout d'un back office pour ajouter des aliments, modifier leur données, modifier le créateur d'une recette/ modifier une recette etc...

