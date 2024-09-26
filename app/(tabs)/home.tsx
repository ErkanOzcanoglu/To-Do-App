import { View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "~/components/home/header";
import FilteredTasks from "~/components/home/filtered-tasks";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="mt-5 px-5">
        <Header />
        <FilteredTasks />
      </View>
    </SafeAreaView>
  );
};

export default Home;
