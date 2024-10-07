import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import TaskList from "../components/TaskList";

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  // Récupérer les tâches au chargement du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}?_limit=10`);
      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const newTaskObject = { title: newTask, completed: false };
      try {
        const response = await axios.post(API_URL, newTaskObject);
        setTasks([...tasks, response.data]);
        setNewTask("");
      } catch (error) {
        console.error("Erreur lors de l’ajout de la tâche:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche:", error);
    }
  };

  const toggleComplete = async (id) => {
    const updatedTask = tasks.find((task) => task.id === id);
    updatedTask.completed = !updatedTask.completed;

    try {
      await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks([...tasks]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher une tâche"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ajouter une nouvelle tâche"
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
      />
      <Button title="Ajouter" onPress={addTask} />
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default TaskContainer;
