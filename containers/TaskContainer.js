// TaskContainer.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TaskList from "./TaskList";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez entrer une tâche avant d'ajouter.",
      });
      return;
    }

    const newTaskItem = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
      priority: "medium", // Priorité par défaut
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const completeTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const updateTaskPriority = (taskId, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority } : task
      )
    );
  };

  const sortTasksByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityLevels = { low: 1, medium: 2, high: 3 };
      return priorityLevels[b.priority] - priorityLevels[a.priority]; // Tri décroissant
    });
    setTasks(sortedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche ici"
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Ajouter</Text>
      </TouchableOpacity>

      {/* Bouton pour trier les tâches */}
      <TouchableOpacity onPress={sortTasksByPriority} style={styles.sortButton}>
        <Text style={styles.sortButtonText}>Trier par priorité</Text>
      </TouchableOpacity>

      {/* Liste des tâches */}
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={completeTask}
        onEdit={editTask}
        onUpdatePriority={updateTaskPriority}
      />

      {/* Toast pour la notification */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
  },
  sortButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sortButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TaskContainer;
