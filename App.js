import React from "react";
import { SafeAreaView } from "react-native";
import TaskContainer from "./src/containers/TaskContainer";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TaskContainer />
    </SafeAreaView>
  );
}
