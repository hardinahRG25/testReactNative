// App.js
import React from "react";
import { SafeAreaView } from "react-native";
import TaskContainer from "./containers/TaskContainer";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskContainer />
    </SafeAreaView>
  );
}
