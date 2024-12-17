import React, { useEffect } from "react";
import { Text } from "@/components/ui/text";
import { useTaskStore } from "@/hooks/use-task-store";
import { SafeAreaView, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/home/header";
import FilteredTasks from "@/components/home/filtered-tasks";
import TasksList from "@/components/home/tasks-list";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddTask from "./add-task";

const Home = () => {
  const router = useRouter();
  const { tasks, setTasks } = useTaskStore();
  const [randomTasks, setRandomTasks] = React.useState<any[]>([]);
  const [notCompletedTasks, setNotCompletedTasks] = React.useState<any[]>([]);
  useEffect(() => {
    const randomTasks = tasks
      .filter((task) => !task.isCompleted)
      .filter((task) => task.deadline > new Date().toISOString())
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    setRandomTasks(randomTasks);

    const notCompletedTasks = tasks.filter((task) => !task.isCompleted);
    setNotCompletedTasks(notCompletedTasks);
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
      }
    };
    loadTasks();
  }, []);

  const handleNavigateToAddTask = () => {
    router.navigate("/add-task");
  };

  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ paddingTop: top, flex: 1 }}>
      <View className="bg-background p-4 w-full h-full">
        <Header />
        <ScrollView
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
        >
          <FilteredTasks taskData={notCompletedTasks} />
          {randomTasks.length > 0 ? (
            <TasksList taskData={randomTasks} />
          ) : (
            <View className="w-full items-center ">
              <AddTask />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
