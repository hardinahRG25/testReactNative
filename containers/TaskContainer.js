import React, { useState } from "react";
import { View, Button } from "react-native";
import TaskList from "./TaskList";
import Toast from "react-native-toast-message";
import TaskInput from "./TaskInput"; // Nouveau composant pour ajouter des tâches

/**
 * Composant pour gérer les tâches.
 * Contient la logique pour ajouter, supprimer, modifier et trier les tâches.
 */
const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Filtre pour les tâches

  // Fonction pour ajouter une nouvelle tâche
  const addTask = (task) => {
    setTasks([...tasks, task]);
    Toast.show({
      type: "success",
      text1: "Succès",
      text2: "Tâche ajoutée avec succès !",
    });
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    Toast.show({
      type: "success",
      text1: "Succès",
      text2: "Tâche supprimée avec succès !",
    });
  };

  // Fonction pour compléter une tâche
  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Fonction pour trier les tâches par priorité
  const sortedTasks = () => {
    return tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  // Fonction pour filtrer les tâches
  const filteredTasks = () => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks; // Retourne toutes les tâches
  };

  return (
    <View>
      {/* Système de filtrage des tâches */}
      <View>
        <Button title="Toutes" onPress={() => setFilter("all")} />
        <Button title="Complètes" onPress={() => setFilter("completed")} />
        <Button title="Incomplètes" onPress={() => setFilter("incomplete")} />
      </View>

      {/* Champ d'entrée pour ajouter des tâches */}
      <TaskInput onAddTask={addTask} />

      {/* Liste des tâches filtrées et triées */}
      <TaskList
        tasks={filteredTasks()}
        onToggleComplete={completeTask}
        onDelete={deleteTask}
      />

      {/* Toast pour les notifications */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default TaskContainer;
