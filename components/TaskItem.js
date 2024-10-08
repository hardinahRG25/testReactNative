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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fonction pour gérer l'édition de la tâche
  const handleEdit = () => {
    if (isEditing) {
      // Si l'on est en mode édition, sauvegarde les modifications
      onEdit(task.id, newTaskTitle);
    }
    setIsEditing(!isEditing);
  };

  // Fonction pour afficher le modal de confirmation de suppression
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  // Fonction pour confirmer la suppression de la tâche
  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(task.id);
  };

  return (
    <View style={styles.taskItem}>
      {/* Bouton pour marquer la tâche comme complétée */}
      <TouchableOpacity
        onPress={() => onComplete(task.id)}
        style={styles.iconButton}
      >
        {/* Changement de l'icône selon si la tâche est complétée ou non */}
        <FontAwesome
          name={task.completed ? "check-circle" : "circle"}
          size={24}
          color="green"
        />
      </TouchableOpacity>

      {/* Si on est en mode édition, afficher un champ de texte, sinon afficher le texte de la tâche */}
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
            task.completed ? styles.completedTask : null, // Si la tâche est complétée, barrer le texte
          ]}
        >
          {task.title}
        </Text>
      )}

      {/* Bouton pour éditer ou sauvegarder les modifications */}
      <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
        <FontAwesome
          name={isEditing ? "save" : "edit"} // Alterner entre "éditer" et "sauvegarder"
          size={24}
          color={isEditing ? "white" : "blue"} // Changer la couleur de l'icône selon l'état
        />
      </TouchableOpacity>

      {/* Bouton pour supprimer la tâche */}
      <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
        <FontAwesome name="trash" size={24} color="red" />{" "}
        {/* Icône de poubelle */}
      </TouchableOpacity>

      {/* Modal de confirmation de suppression */}
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
              {/* Bouton pour annuler la suppression */}
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>

              {/* Bouton pour confirmer la suppression */}
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

// Composant principal de l'application
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) {
      // Si l'input est vide ou contient seulement des espaces, afficher une alerte
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

  return (
    <View style={styles.container}>
      {/* En-tête de l'application */}
      <Text style={styles.header}>Todo List</Text>

      {/* Input pour ajouter une nouvelle tâche */}
      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche ici"
        value={newTask}
        onChangeText={setNewTask}
      />

      {/* Bouton pour ajouter une tâche */}
      <TouchableOpacity onPress={addTask} style={styles.addButton}>
        <FontAwesome name="plus" size={24} color="white" /> {/* Icône "plus" */}
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
        />
      ))}

      {/* Toast pour afficher des notifications */}
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
