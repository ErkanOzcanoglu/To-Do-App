import React, { useEffect } from "react";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskStore } from "@/hooks/use-task-store";
import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const { addTask, removeTask, tasks, setTasks } = useTaskStore();
  const [isLoading, setIsLoading] = React.useState(true);

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

  const handleRemoveTask = () => {
    removeTask("2");
  };

  return (
    <SafeAreaView>
      <View className="bg-primary w-full h-full">
        <View>
          <Text>Home</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
