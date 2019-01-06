# Todo list

Langage : NodeJS 

Date : 06/01/2019

Développeurs : Clément MEHAYE & Florian LAFUENTE

 Notre projet est une **Todo list** qui comporte plusieurs options comme l'ajout d'utilisateur, l'ajout de tâches à faire ainsi que la possibilité de cocher les tâches déjà effectuées et  les modifier. 

 ## Installation

    npm install -g
   Ne pas oublier de download les différents modules `express`, `inquirer`, `bcrypt`, `sqlite` , `method-override`,`body-parser , pug` !

## CRUD
Pour chaque parties du **CRUD** les routes renvoient: un JSON qui possède le contenu de la requête SQL ou un message pour indiquer le succès de la requête, et une page HTML en fonction de la requête.
Pour les  todos et users on peut utiliser les ressources : 
- GET /ressources ( Liste tout les users ou les todos )
 - GET /ressources/:id  ( Liste un user ou une todo spécifique )
 - POST /ressources ( Ajouter un user ou une todo )
 - PUT/PATCH /ressources/:id ( Permet de modifier les informations )
 - DELETE /ressources/:id ( Supprime une todo ou un user )
- GET /ressources/add ( Affiche le formulaire pour ajouter un user ou une todo )
 - GET /ressources/:id/edit ( Affiche un formulaire pour modifier une todo ou un user )
  
et pour users spécifiquement on a :
- GET /users/:id/todos ( Permet d'avoir les todos lists d'un user spécifique )

Il y a aussi un middleware de 404 pour les requêtes qui n'arrive pas à destination.

## Aide

En cas de problèmes veuillez nous contacter aux adresses suivantes :
* clement.mehaye@ynov.com
* florian.lafuente@ynov.com
