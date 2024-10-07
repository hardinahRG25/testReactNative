import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, newTaskTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.taskItem}>
      {/* Afficher le bouton "Fini" seulement si la tâche n'est pas en cours de modification */}
      {!isEditing && (
        <TouchableOpacity
          onPress={() => onComplete(task.id)}
          style={styles.iconButton}
        >
          <FontAwesome
            name={task.completed ? "check-circle" : "circle"}
            size={24}
            color="green"
          />
        </TouchableOpacity>
      )}

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
      ) : (
        <Text
          style={[
            styles.taskText,
            task.completed ? styles.completedTask : null,
          ]}
        >
          {task.title}
        </Text>
      )}

      {/* Si la tâche est terminée, ne pas afficher l'icône de modification */}
      {!task.completed && (
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <FontAwesome name={isEditing ? "save" : "edit"} size={24} color="blue" />
        </TouchableOpacity>
      )}

      {/* Si la tâche n'est pas en train d'être modifiée, afficher le bouton "Supprimer" */}
      {!isEditing && (
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default TaskItem;
