import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "../ui/text";
import { CalendarCheck } from "lucide-react-native";
import { Task } from "@/types/task";

type TaskData = {
  taskData: Task[];
};

const FilteredTasks = ({ taskData }: TaskData) => {
  const [dailyTasks, setDailyTasks] = useState(0);
  const [weeklyTasks, setWeeklyTasks] = useState(0);
  const [monthlyTasks, setMonthlyTasks] = useState(0);

  useEffect(() => {
    calculateTasks();
  }, [taskData]);

  const calculateTasks = () => {
    const now = new Date().getTime();

    const daily = taskData.filter((task) => {
      const taskDate = new Date(task.deadline).getTime();
      return taskDate - now < 86400000;
    });

    const weekly = taskData.filter((task) => {
      const taskDate = new Date(task.deadline).getTime();
      return taskDate - now < 604800000;
    });

    const monthly = taskData.filter((task) => {
      const taskDate = new Date(task.deadline).getTime();
      return taskDate - now < 2592000000;
    });

    setDailyTasks(daily.length);
    setWeeklyTasks(weekly.length);
    setMonthlyTasks(monthly.length);
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
