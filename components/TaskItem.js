import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.task}>
      <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
        <Text
          style={{
            textDecorationLine: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Text>
      </TouchableOpacity>
      <Button title="Supprimer" onPress={() => onDelete(task.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TaskItem;
