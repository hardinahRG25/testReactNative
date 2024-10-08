import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 * Composant pour entrer de nouvelles tâches.
 * Gère l'état de la tâche et déclenche l'ajout via une fonction de rappel.
 */
const TaskInput = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return; // Ne pas ajouter une tâche vide

    const newTaskItem = {
      id: Math.random().toString(), // Utilisation d'un ID aléatoire pour simplifier
      title: newTask,
      completed: false,
      priority: "medium", // Priorité par défaut
    };

    onAddTask(newTaskItem);
    setNewTask(""); // Réinitialise le champ d'entrée
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche ici"
        value={newTask}
        onChangeText={setNewTask}
      />
      <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
});

export default TaskInput;
