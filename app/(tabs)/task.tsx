import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "~/components/home/header";
import TaskForm from "~/components/tasks/task-form";

const Task = () => {
  return (
    <SafeAreaView>
      <View className="p-5">
        <View className="mb-2">
          <Header />
        </View>
        <View>
          <TaskForm />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Task;
