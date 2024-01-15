import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { TextBox, TextHeader } from "../../component/Textbox";
import { useTheme } from "@react-navigation/native";
import Button from "../../component/Button";

const CurrentWorkout: React.FC = () => {
  const [isSeleted, setSeleted] = useState("");
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}>
      <TextHeader textBody="Select Workout Type" marginTop={20} />
      <ScrollView style={{ flex: 1, marginTop: 20 }} bounces showsVerticalScrollIndicator={false}>
        <Button
          buttonText="Push"
          onPress={() => setSeleted("Push")}
          backgroundColor={isSeleted === "Push" ? colors.notification : colors.card}
          marginVertical={8}
          paddingVertical={10}
        />
        <Button
          buttonText="Pull"
          onPress={() => setSeleted("Pull")}
          backgroundColor={isSeleted === "Pull" ? colors.notification : colors.card}
          marginVertical={8}
          paddingVertical={10}
        />
        <Button
          buttonText="Legs"
          onPress={() => setSeleted("Legs")}
          backgroundColor={isSeleted === "Legs" ? colors.notification : colors.card}
          marginVertical={8}
          paddingVertical={10}
        />
      </ScrollView>
      <Button buttonText="Start" onPress={() => console.log(isSeleted)} marginVertical={20} paddingVertical={10} />
    </View>
  );
};

export default CurrentWorkout;
