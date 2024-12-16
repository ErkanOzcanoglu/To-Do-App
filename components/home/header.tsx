import { View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import { Bell } from "lucide-react-native";

const Header = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Text className="text-xl">Merhaba </Text>
          <Text className="text-red-600 text-xl">Erkan👋</Text>
        </View>
        <View className="bg-gray-100 border border-slate-300 p-2 justify-center items-center rounded-full">
          <Bell size={32} color={"black"} />
        </View>
      </View>
    </View>
  );
};

export default Header;
