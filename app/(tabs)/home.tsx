import React, { useEffect } from "react";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskStore } from "@/hooks/use-task-store";
import { Button, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/home/header";
import FilteredTasks from "@/components/home/filtered-tasks";
import TasksList from "@/components/home/tasks-list";

const Home = () => {
  const { addTask, removeTask, tasks, setTasks } = useTaskStore();
  const [isLoading, setIsLoading] = React.useState(true);
  const [randomTasks, setRandomTasks] = React.useState<any[]>([]);
  // 5 random tasks to show on the home screen which are not completed
  useEffect(() => {
    const randomTasks = tasks
      .filter((task) => !task.isCompleted)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setRandomTasks(randomTasks);
  }, [tasks]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("@tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  return (
    <SafeAreaView>
      <View className="p-4 w-full h-full">
        <Header />
        <ScrollView>
          <FilteredTasks taskData={tasks} />
          <TasksList taskData={randomTasks} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
