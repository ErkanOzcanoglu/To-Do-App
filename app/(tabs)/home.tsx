import { ScrollView, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "~/components/home/header";
import FilteredTasks from "~/components/home/filtered-tasks";
import TasksList from "~/components/home/tasks-list";
import { taskData } from "~/assets/datas/mockData";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-5">
          <Header />
          <View>
            <Text className="font-semibold text-[40px] w-[360px] mt-10">
              Günlük Görevlerini Ayarla
            </Text>
          </View>
          <FilteredTasks taskData={taskData} />
          <TasksList taskData={taskData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
