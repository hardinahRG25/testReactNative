import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

/**
 * Composant pour afficher la liste des tâches.
 * Utilise FlatList pour un rendu efficace.
 */
const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      )}
    />
  );
};

export default TaskList;
