import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, newTaskTitle);
    }
    setIsEditing(!isEditing);
  };

  const handleDeletePress = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    onDelete(task.id);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.taskItem}>
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

      {!task.completed && (
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <FontAwesome name={isEditing ? "save" : "edit"} size={24} color="blue" />
        </TouchableOpacity>
      )}

      {!isEditing && (
        <TouchableOpacity onPress={handleDeletePress} style={styles.iconButton}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      )}

      
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Confirmer la suppression de cette tâche</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.button} onPress={cancelDelete}>
                <Text style={styles.buttonText}>Annuler</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>Confirmer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default TaskItem;
