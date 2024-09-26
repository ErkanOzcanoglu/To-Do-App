import { View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import { CalendarCheck } from "lucide-react-native";

const FilteredTasks = () => {
  return (
    <View className="mt-10">
      <View className="flex-row justify-between gap-[2vw]">
        <View className="bg-muted-foreground rounded-[10px] w-[45vw] h-[175px]">
          <View className="p-4 gap-3">
            <View>
              <CalendarCheck size={70} color={"black"} />
            </View>
            <View>
              <Text className="text-muted ml-2 font-semibold text-2xl">
                Daily
              </Text>
            </View>
            <View>
              <Text className="text-muted ml-2 font-semibold text-2xl">
                5 Tasks
              </Text>
            </View>
          </View>
        </View>
        <View className=" flex gap-[10px]">
          <View className="w-[45vw] h-[82.5px] bg-muted-foreground rounded-[10px]">
            <View className="p-3 gap-3 flex-row items-center">
              <View>
                <CalendarCheck size={50} color={"black"} />
              </View>
              <View>
                <Text className="text-muted ml-2 font-semibold text-2xl">
                  Weekly
                </Text>
                <Text className="text-muted ml-2 font-semibold text-2xl">
                  5 Tasks
                </Text>
              </View>
            </View>
          </View>
          <View className="w-[45vw] h-[82.5px] bg-muted-foreground rounded-[10px]">
            <View className="p-3 gap-3 flex-row items-center">
              <View>
                <CalendarCheck size={50} color={"black"} />
              </View>
              <View>
                <Text className="text-muted ml-2 font-semibold text-2xl">
                  Monthly
                </Text>
                <Text className="text-muted ml-2 font-semibold text-2xl">
                  5 Tasks
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilteredTasks;
