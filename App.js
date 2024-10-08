import React from "react";
import { SafeAreaView } from "react-native";
import TaskContainer from "./containers/TaskContainer";

/**
 * Composant principal de l'application.
 * Gère le conteneur de tâches et l'affichage général.
 */
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskContainer />
    </SafeAreaView>
  );
}
