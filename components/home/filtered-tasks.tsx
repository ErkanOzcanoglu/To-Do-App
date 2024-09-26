import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "../ui/text";
import { CalendarCheck } from "lucide-react-native";

type TaskData = {
  taskData: any[];
};

const FilteredTasks = ({ taskData }: TaskData) => {
  const [dailyTasks, setDailyTasks] = useState(0);
  const [weeklyTasks, setWeeklyTasks] = useState(0);
  const [monthlyTasks, setMonthlyTasks] = useState(0);

  useEffect(() => {
    calculateDailyTasks();
    calculateWeeklyTasks();
    calculateMonthlyTasks();
  }, [taskData]);

  const calculateDailyTasks = () => {
    const currentDate = new Date();
    const dailyTasks = taskData.filter((task) => {
      const taskDate = new Date(task.endDateTime);
      return (
        taskDate.getDate() === currentDate.getDate() &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });

    setDailyTasks(dailyTasks.length);
  };

  const calculateWeeklyTasks = () => {
    const currentDate = new Date();
    const weeklyTasks = taskData.filter((task) => {
      const taskDate = new Date(task.endDateTime);
      return (
        taskDate.getDate() >= currentDate.getDate() &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });

    setWeeklyTasks(weeklyTasks.length);
  };

  const calculateMonthlyTasks = () => {
    const currentDate = new Date();
    const monthlyTasks = taskData.filter((task) => {
      const taskDate = new Date(task.endDateTime);
      return (
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getFullYear() === currentDate.getFullYear()
      );
    });

    setMonthlyTasks(monthlyTasks.length);
  };

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
                {dailyTasks} Tasks
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
                  {weeklyTasks} Tasks
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
                  {monthlyTasks} Tasks
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
