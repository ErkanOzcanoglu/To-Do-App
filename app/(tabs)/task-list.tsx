import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskStore } from "@/hooks/use-task-store";
import { FlatList } from "react-native-gesture-handler";

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskList;
