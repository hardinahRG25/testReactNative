import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

/**
 * Composant pour chaque élément de tâche.
 * Gère l'édition, la suppression et la mise à jour de la priorité de la tâche.
 */
const TaskItem = ({ task, onDelete, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      // Ajoutez une fonction d'édition si nécessaire
    }
    setIsEditing(!isEditing);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(task.id);
  };

  return (
    <View style={styles.taskItem}>
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

      <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
        <FontAwesome
          name={isEditing ? "save" : "edit"}
          size={24}
          color={isEditing ? "white" : "blue"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowDeleteModal(true)}
        style={styles.iconButton}
      >
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>

      {/* Modal de confirmation pour la suppression */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Êtes-vous sûr de vouloir supprimer cette tâche ?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDelete}
                style={[styles.modalButton, styles.confirmButton]}
              >
                <Text style={styles.buttonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  iconButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  cancelButton: {
    backgroundColor: "grey",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
  },
});

export default TaskItem;
