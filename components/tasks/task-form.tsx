import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Text } from "../ui/text";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.log("A date has been picked: ", date);
    setDeadline(date.toLocaleDateString());
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time: any) => {
    console.log("A time has been picked: ", time);
    setDeadlineTime(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimePicker();
  };

  const hanldeSave = () => {
    console.log("Save");
    console.log(title, description, deadline, deadlineTime);
    setTitle("");
    setDescription("");
    setDeadline("");
    setDeadlineTime("");
  };

  return (
    <View className="mt-10 h-[72vh] justify-between flex bg-black">
      <View className="gap-8">
        <View>
          <Text className="text-lg">Görev Başlığı</Text>
          <Input placeholder="Başlık" value={title} onChangeText={setTitle} />
        </View>
        <View>
          <Text className="text-lg">Açıklama</Text>
          <Textarea
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View>
          <Text className="text-lg">Bitiş Tarihi</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <View className="justify-center web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
              <Text className="text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground">
                {deadline ? deadline : "Tarih Seç"}
              </Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <Text className="text-lg">Bitiş Saati</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <View className="justify-center web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2">
              <Text className="text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground">
                {deadlineTime ? deadlineTime : "Saat Seç"}
              </Text>
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <View className="items-end">
        <Button onPress={hanldeSave}>
          <Text>Kaydet</Text>
        </Button>
      </View>
    </View>
  );
};

export default TaskForm;
