import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TaskItem from '../components/TaskItem';
import axios from 'axios';

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortOrder, setSortOrder] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // État pour le mode sombre

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        const tasksWithDate = response.data.map((task) => ({
          ...task,
          createdAt: new Date(),
        }));
        setTasks(tasksWithDate);
      })
      .catch((error) => console.error(error));
  }, []);

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: Math.random().toString(),
        title: newTaskTitle,
        completed: false,
        createdAt: new Date(),
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!showCompleted) {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  const sortTasks = (tasksList, order) => {
    return tasksList.slice().sort((a, b) => {
      if (order === 'asc') {
        return a.createdAt - b.createdAt;
      } else if (order === 'desc') {
        return b.createdAt - a.createdAt;
      }
      return 0;
    });
  };

  if (sortOrder) {
    filteredTasks = sortTasks(filteredTasks, sortOrder);
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleMenuSelection = () => {
    setShowCompleted(!showCompleted);
    setShowMenu(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <View style={[styles.container, darkMode ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.header, darkMode ? styles.headerDark : styles.headerLight]}>
        Todo List
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
          placeholder="Rechercher une tâche"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <FontAwesome name="ellipsis-v" size={24} color={darkMode ? "#ECF0F1" : "#007BFF"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
          <FontAwesome
            name={sortOrder === 'asc' ? 'sort-amount-asc' : 'sort-amount-desc'}
            size={24}
            color={darkMode ? "#ECF0F1" : "#007BFF"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
          <FontAwesome name={darkMode ? "sun-o" : "moon-o"} size={24} color={darkMode ? "#ECF0F1" : "#007BFF"} />
        </TouchableOpacity>
      </View>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            onPress={handleMenuSelection}
            style={styles.menuItem}
          >
            <Text style={[styles.menuText, darkMode ? styles.menuTextDark : styles.menuTextLight]}>
              {showCompleted ? 'Masquer' : 'Afficher'} les tâches terminées
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={deleteTask}
            onComplete={completeTask}
            onEdit={editTask}
            darkMode={darkMode} // Passer le mode sombre à TaskItem
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskList}
      />

      <View style={styles.addTaskContainer}>
        <TextInput
          style={[styles.input, darkMode ? styles.inputDark : styles.inputLight]}
          placeholder="Ajouter une nouvelle tâche"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10, // Ajustez la marge ici
    flex: 1,
  },
  containerLight: {
    backgroundColor: '#E9F7EF', // Couleur de fond claire
  },
  containerDark: {
    backgroundColor: '#2C3E50', // Couleur de fond sombre
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Réduit l'espace entre l'en-tête et le champ de recherche
  },
  headerLight: {
    color: '#2C3E50',
  },
  headerDark: {
    color: '#ECF0F1', // Couleur du texte dans le mode sombre
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 5,
  },
  inputLight: {
    borderColor: '#007BFF',
    backgroundColor: 'white',
  },
  inputDark: {
    borderColor: '#ECF0F1',
    backgroundColor: '#34495E',
    color: '#ECF0F1', // Couleur du texte en mode sombre
  },
  menuButton: {
    marginLeft: 10,
  },
  sortButton: {
    marginLeft: 10,
  },
  darkModeButton: {
    marginLeft: 10,
  },
  menu: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 70,
    right: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    color: '#007BFF',
  },
  menuTextLight: {
    color: '#007BFF',
  },
  menuTextDark: {
    color: '#ECF0F1', // Couleur du texte dans le menu sombre
  },
  taskList: {
    flex: 1,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
});

export default TaskContainer;
