# Todo List App

Une application mobile de liste de tâches développée en React Native. Cette application permet aux utilisateurs d'ajouter, de modifier, de supprimer et de rechercher des tâches. Les données sont gérées via une API REST fictive.


## Technologies utilisées

- **React Native** : Framework pour développer des applications mobiles.
- **Axios** : Bibliothèque pour faire des requêtes HTTP vers l'API.
- **jsonplaceholder** : API REST utilisée pour la gestion des tâches.

## Démarche

Cette application de liste de tâches (To-Do List) est développée avec React Native en utilisant le design pattern Container-Presentational. Elle permet à l'utilisateur de :

- **Afficher une liste de tâches récupérées via une API REST fictive.**
- **Ajouter de nouvelles tâches.**
- **Marquer les tâches comme complètes.**
- **Supprimer des tâches.**
- **Rechercher des tâches en temps réel.**
- **L'application est organisée de manière à séparer la logique métier des composants d'interface utilisateur, ce qui améliore la maintenabilité et la lisibilité du code.**

## Design Pattern : Container-Presentational
Le pattern utilisé sépare la logique métier des composants d'affichage :

TaskContainer.js : Gère la logique métier (état, appels API, gestion des tâches).
TaskItem.js : Composant de présentation d'une tâche individuelle.
TaskList.js : Composant de présentation de la liste de tâches.

## Installation

```bash
# npm
npm install

```

## Executer l'application 

```bash
npx expo start
```
