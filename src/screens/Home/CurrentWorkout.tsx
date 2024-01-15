import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { TextHeader } from "../../component/Textbox";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../component/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../types";
import ConfirmModal from "./ConfirmModal";

const CurrentWorkout: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [isWorkout, setWorkout] = useState<boolean>(false);
  const [isSeleted, setSeleted] = useState<string>("");
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    Navigation.addListener("beforeRemove", e => {
      if (isWorkout === true && canGoBack === false) return;
      e.preventDefault();
      setModalVisible(true);
      console.log("cannot go back");
    });
    console.log("current screen");
  }, []);

  return isWorkout === false ? (
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
      <Button buttonText="Start" onPress={() => setWorkout(true)} marginVertical={20} paddingVertical={10} />
    </View>
  ) : (
    <>
      <View style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}>
        <TextHeader textBody={`${isSeleted} Workout`} marginTop={20} />
      </View>
      <ConfirmModal
        isVisible={isModalVisible}
        close={() => setModalVisible(false)}
        cancelWorkout={() => {
          setModalVisible(false);
          setCanGoBack(true);
          setWorkout(false);
        }}
      />
    </>
  );
};

export default CurrentWorkout;
