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
    - [Database modelisation](#database-modelisation)
    - [Technical architecture](#technical-architecture)
      - [Express](#express)
      - [API Reference](#api-reference)
        - [User](#user)
        - [Recipe](#recipe)
        - [Ingredients](#ingredients)
      - [Quasar](#quasar)
      - [Libray](#libray)
      - [Logic Components](#logic-components)
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
    - [CRUD ingredients](#crud-ingredients)
  - [Comment améliorer le site](#comment-améliorer-le-site)
    - [Ajout d'un formulaire par rapport a nos besoins calorique](#ajout-dun-formulaire-par-rapport-a-nos-besoins-calorique)
    - [Ajouter d'autre données que les calories](#ajouter-dautre-données-que-les-calories)
    - [Ajout d'un backoffice admin (en cours)](#ajout-dun-backoffice-admin-en-cours)
    - [Ajout d'un randomise de recette (en cours)](#ajout-dun-randomise-de-recette-en-cours)


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

### Database modelisation

![BDD](img/bdd.png)

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

#### API Reference

```sh
Host: localhost
Default Port: 3000
Url: http://localhost:3000/
```

##### User 

* SignUp

```http
  GET api/user/signup
```

Request exemple Model

```sh 
{
    "firstName" : "nalvac",
    "lastName": "nalvac",
    "email": "vacna1997@gmail.com",
    "password": "root"

}

```

Response exemple Model 

```sh 
{
    "message": "L'utilisateur nalvac a bien été créé.",
    "data": {
        "id": 2,
        "firstName": "nalvac",
        "lastName": "nalvac",
        "email": "vacna1997@gmail.com",
        "password": "$2b$10$tLXq/DfaHiOr8UGuFVDARuf3NB0NVsVP8HjwEmYrOOMnF4Z2OvDVe",
        "isAdmin": false,
        "updatedAt": "2023-07-13T08:59:10.138Z",
        "createdAt": "2023-07-13T08:59:10.138Z"
    }
}
```

* Login

```http
  POST api/user/login
```

Request exemple Model

```sh 
{
    "email": "vacna1997@gmail.com",
    "password": "root"
}

```

Response exemple Model 

```sh 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTE5NDAyNCwiZXhwIjoxNjg5MjgwNDI0fQ.luzTXIR0CMaeLkOIhS8KHS5oDDdDn7xfP89L6zoDkiA"
}
```

* User update 

*Require auth (token) In request headers*

```sh
headers: {
    "Content-Type": "application/json",                
    Authorization: `Bearer ` + token,
},
```
```http
  PUT api/user/:id_user
```

Request exemple Model

```sh 
{
    "email": "vacna1998@gmail.com",
}
```

Response exemple Model 

```sh 
{
    "message": "Votre profil a été modifié.",
    "data": {
        "firstName": "nalvac",
        "lastName": "nalvac",
        "email": "vacna1998@gmail.com",
        "isAdmin": false,
        "createdAt": "2023-07-13T08:59:10.000Z",
        "updatedAt": "2023-07-13T09:12:03.000Z"
    }
}
```

* Delete User

*Require auth (token) In request headers*

```sh
headers: {
    "Content-Type": "application/json",                
    Authorization: `Bearer ` + token,
},
```
```http
  DELETE /api/user/:id_user
```

Response exemple Model 

```sh 
{
    
  "message": "L'utilisateur supprimé avec succès"

}
```

##### Recipe

* Retrieve recipes

```http
  GET api/user/recipes
```

Response exemple Model 

```sh 
[
  {
      "id": 1,
      "author": "nalvac nalvac",
      "title": "Poulette",
      "date": "2023-07-13T11:04:27.000Z",
      "ingredients": [
          {
              "id": 8,
              "name": "Amandes",
              "unit": "g",
              "calories": 320,
              "recipe_ingredient": {
                  "quantity": 200,
                  "step": "Fais comme tu veux",
                  "createdAt": "2023-07-13T11:06:08.000Z",
                  "updatedAt": "2023-07-13T11:06:09.000Z",
                  "recipeId": 1,
                  "ingredientId": 8
              }
          }
      ],
      "totalKcal": 64000
  }
]
```

* Retrieve Recipe 

```http
 GET api/recipe/:id
````

Response Exemple 

```sh
{
      "id": 1,
      "author": "nalvac nalvac",
      "title": "Poulette",
      "date": "2023-07-13T11:04:27.000Z",
      "ingredients": [
          {
              "id": 8,
              "name": "Amandes",
              "unit": "g",
              "calories": 320,
              "recipe_ingredient": {
                  "quantity": 200,
                  "step": "Fais comme tu veux",
                  "createdAt": "2023-07-13T11:06:08.000Z",
                  "updatedAt": "2023-07-13T11:06:09.000Z",
                  "recipeId": 1,
                  "ingredientId": 8
              }
          }
      ],
      "totalKcal": 64000
  }
```

* Update Recipe

```http
  PUT api/user/recipe/
```
*Require auth (token) In request headers*

```sh
headers: {
    "Content-Type": "application/json",                
    Authorization: `Bearer ` + token,
},
```

Request exemple Model

```sh 
{
    "id": 4,
    "ingredients": [
       {  "id_ingredient": 3, "quantity": 500 },
    {  "id_ingredient": 5, "quantity": 800 }
    ]
}
```
Response message

```sh
"Recette Modifiée"
```

* Delete Recipe 

```http 
 DELETE api/recipe/:id_recipe
```

Reponse Model 

```sh
{
    "error": false,
    "message": "DELETED"
}
```

* Random Recipe 

```http 
 POST api/recipe/random
```
Request Model

```sh 
{
    "userId": 1
}
```

Reponse Model 

```sh
{
    "id": 91,
    "author": "Test test",
    "title": "Recette aléatoire uniqId: id3fd2477d31932",
    "createdAt": "2023-07-13T13:17:29.000Z",
    "updatedAt": "2023-07-13T13:17:29.000Z",
    "recipe_ingredients": [
        {
            "quantity": 25,
            "step": "1",
            "createdAt": "2023-07-13T13:17:29.000Z",
            "updatedAt": "2023-07-13T13:17:29.000Z",
            "recipeId": 91,
            "ingredientId": 22
        }
    ],
    "ingredients": [
        {
            "id": 22,
            "name": "Sel",
            "unit": "g",
            "calories": 0
        }
    ],
    "totalKcal": 0
}
```

##### Ingredients


* Retrieve Ingredients

```http
 GET api/ingredients
```

Reponse exemple 

```sh
{
    "ingredients": [
        {
            "id": 1,
            "name": "Farine",
            "unit": "g",
            "calories": 700
        },
        {
            "id": 2,
            "name": "Sucre",
            "unit": "g",
            "calories": 400
        },
        {
            "id": 3,
            "name": "Beurre",
            "unit": "g",
            "calories": 350
        },
      
    ]
}
```
* Retrien Ingredient 

```http 
 GET api/ingredient/:id
```
Respons Model 

```sh
{
    "ingredient": {
        "id": 2,
        "name": "Sucre",
        "unit": "g",
        "calories": 400
    }
}
```

* Update Ingredient

```http
 PUT api/ingredient/:id
```

*Require auth (token) In request headers*

```sh
headers: {
    "Content-Type": "application/json",                
    Authorization: `Bearer ` + token,
},
```

Request model 

```sh
{
  "name" : "Farien de qualité"
}
```

Response exemple model

```sh
{
    "ingredient": {
        "id": 1,
        "name": "Farien de qualité",
        "unit": "g",
        "calories": 700
    }
}
```

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

#### Libray 

We use some library to increase developpement speed, the stability and the maintenability of the project.

- **store:** Piana is a state management library for Vue.js projects that helps you manage and share application state across components. It provides a centralized store for your application's data, allowing you to easily access and modify the state from different parts of application. We use that linked to axios to communicate with api and store data.
	
-  **fetching:** Axios is a popular JavaScript library used for making HTTP requests from the browser or Node.js. 
	It provides an easy-to-use API for handling asynchronous operations and is commonly used in Vue.js projects for data fetching and interacting with APIs. 

- **saving file:**	File-saver.js is a JavaScript library that helps you save files on the client-side. It provides an easy-to-use API for creating and downloading files in the browser.

- **conversion:**	json2csv is a JavaScript library that allows you to convert JSON data to CSV (Comma-Separated Values) format. It is commonly used in Vue.js projects when you need to export JSON data as a CSV file.

#### Logic Components

All components are based on MainLayout who contains a quasar layout and a navbar

  Page : 
  - Error404 : Returned by router in case of not listed requested URL
  - HomePage : Page with form to add reciepe, to analyse calories, and to download a report 
  - RecipeEditPage : Page were you can update reciepe
  - RecipesPage : Page who display all recipes, can delete reciepe, and access to update page 
  - RegisterPage : Can create user 
  - LoginPage : Log user and secure it  

  Stores : 
  Logic to store, process data and communicate with api.
  - token : store the auth token to securise connection 
  - user / ingrediant / reciepe : can make communication with api and make data reflection 


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

### CRUD ingredients

Possibilité 
- D'ajout
- d'update
- Add
Un ingrédient


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

### Ajout d'un backoffice admin (en cours)

Ajout d'un back office pour ajouter des aliments, modifier leur données, modifier le créateur d'une recette/ modifier une recette etc...
(en partie fait il y a les ingrédients)

### Ajout d'un randomise de recette (en cours)

L'api pour créer une recette aléatoire existe, mais le front n'existe pas. Système d'ajout d'aliment aléatoire dans une recette.

