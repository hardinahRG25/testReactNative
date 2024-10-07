import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

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
