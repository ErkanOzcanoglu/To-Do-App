import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "@/components/tasks/task";
import { useTaskStore } from "@/hooks/use-task-store";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskList = () => {
  const { tasks, setTasks } = useTaskStore();

  return (
    <SafeAreaView>
      <View className="p-4">
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Task item={item} />}
          keyExtractor={(item) => item.id}
          className="space-y-2"
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskList;
