// TaskItem.js
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

const TaskItem = ({ task, onDelete, onComplete, onEdit, onUpdatePriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [priority, setPriority] = useState(task.priority || "medium");

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, newTaskTitle);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(task.id);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    onUpdatePriority(task.id, newPriority);
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

      <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>

      <View style={styles.prioritySelector}>
        <Text style={styles.priorityLabel}>Priorité:</Text>
        <TouchableOpacity
          onPress={() => handlePriorityChange("high")}
          style={[
            styles.priorityButton,
            priority === "high" ? styles.priorityHigh : null,
          ]}
        >
          <Text style={styles.priorityButtonText}>Haute</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePriorityChange("medium")}
          style={[
            styles.priorityButton,
            priority === "medium" ? styles.priorityMedium : null,
          ]}
        >
          <Text style={styles.priorityButtonText}>Moyenne</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePriorityChange("low")}
          style={[
            styles.priorityButton,
            priority === "low" ? styles.priorityLow : null,
          ]}
        >
          <Text style={styles.priorityButtonText}>Basse</Text>
        </TouchableOpacity>
      </View>

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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: "line-through",
  },
  iconButton: {
    marginLeft: 10,
  },
  prioritySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  priorityButton: {
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  priorityHigh: {
    backgroundColor: "red",
  },
  priorityMedium: {
    backgroundColor: "orange",
  },
  priorityLow: {
    backgroundColor: "green",
  },
  priorityButtonText: {
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
  },
});

export default TaskItem;
