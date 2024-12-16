import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Input } from "../ui/input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

interface FormData {
  title: string;
  description: string;
  deadline: Date;
  deadlineTime: string;
}

interface AddTaskFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  showTimePicker: boolean;
  setShowTimePicker: (show: boolean) => void;
  onDateChange: (event: any, date?: Date) => void;
  onTimeChange: (event: any, time?: Date) => void;
  onSubmit: () => void;
}

const AddTaskForm = ({
  formData,
  onDateChange,
  onTimeChange,
  setFormData,
  setShowDatePicker,
  setShowTimePicker,
  showDatePicker,
  showTimePicker,
  onSubmit,
}: AddTaskFormProps) => {
  return (
    <View className="p-4">
      <Text className="text-2xl font-bold my-5">Add New Task</Text>

      <View className="mb-4">
        <Text className="mb-2">Title</Text>
        <Input
          className="border-border"
          placeholder="Enter task title"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2">Description</Text>
        <Input
          className="border-border"
          placeholder="Enter task description"
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          multiline
          numberOfLines={3}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2">Deadline Date</Text>
        <TouchableOpacity
          className="border border-border rounded p-2"
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{formData.deadline.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.deadline}
            mode="date"
            onChange={onDateChange}
          />
        )}
      </View>

      <View className="mb-4">
        <Text className="mb-2">Deadline Time</Text>
        <TouchableOpacity
          className="border border-border rounded p-2"
          onPress={() => setShowTimePicker(true)}
        >
          <Text>{formData.deadlineTime}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={new Date(`2024-01-01T${formData.deadlineTime}`)}
            mode="time"
            onChange={onTimeChange}
          />
        )}
      </View>
    </View>
  );
};

export default AddTaskForm;
