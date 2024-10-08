import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

const TaskItem = ({ task, onDelete, onComplete, onEdit, onUpdatePriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [priority, setPriority] = useState(task.priority || "medium"); // État pour la priorité

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
    onUpdatePriority(task.id, newPriority); // Mise à jour de la priorité
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

      {/* Sélecteur de priorité */}
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

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskDeadline, setTaskDeadline] = useState(new Date());

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
      deadline: taskDeadline, // Date limite
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

  const onDateChange = (event, selectedDate) => {
    setTaskDeadline(selectedDate || taskDeadline);
    setShowDatePicker(false);
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
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateButtonText}>Choisir une deadline</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={taskDeadline}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="white" />
        <Text style={styles.addButtonText}>Ajouter</Text>
      </TouchableOpacity>

      {/* Liste des tâches */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onComplete={completeTask}
          onEdit={editTask}
          onUpdatePriority={updateTaskPriority}
        />
      ))}

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
  dateButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateButtonText: {
    color: "white",
    fontSize: 16,
  },
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

export default App;
