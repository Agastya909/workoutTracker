import React, { useEffect, useRef, useState } from "react";
import { View, ToastAndroid, ScrollView, ActivityIndicator, Animated } from "react-native";
import { TextHeader } from "../../component/Textbox";
import InputBox from "../../component/TextInput";
import Button from "../../component/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Exercise, RootStack } from "../../types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { saveExercise } from "../../firestore/firestore";
import { TARGET_AREA } from "../../assets/data/constant";

const CreateExercise: React.FC = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const { colors } = useTheme();
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState<"Cardio" | "Weight">("Weight");
  const [targetArea, setTargetArea] = useState<string[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const animatedTargetOpacity = useRef(new Animated.Value(0)).current;
  const animatedXYTarget = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;
  const animatedXYButtons = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;
  const animatedButtonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeInButton(350);
    buttonSlideIn(350);
    fadeIn(500);
    targetSlideIn(500);
  }, []);

  const fadeIn = (delay?: number) => {
    Animated.timing(animatedTargetOpacity, {
      toValue: 1,
      duration: 150,
      delay: delay || 0,
      useNativeDriver: true
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animatedTargetOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }).start(() => {
      setExerciseType("Cardio");
      setTargetArea([]);
    });
  };

  const targetSlideIn = (ms?: number) => {
    Animated.timing(animatedXYTarget, {
      toValue: { x: 0, y: 0 },
      duration: 350,
      delay: ms || 0,
      useNativeDriver: true
    }).start();
  };

  const targetSlideOut = (ms?: number) => {
    Animated.timing(animatedXYTarget, {
      toValue: { x: 0, y: 100 },
      duration: 350,
      delay: ms || 0,
      useNativeDriver: true
    }).start();
  };

  const buttonSlideIn = (ms?: number) => {
    Animated.timing(animatedXYButtons, {
      toValue: { x: 0, y: 0 },
      duration: 350,
      delay: ms || 0,
      useNativeDriver: true
    }).start();
  };

  const fadeInButton = (delay?: number) => {
    Animated.timing(animatedButtonOpacity, {
      toValue: 1,
      duration: 150,
      delay: delay || 0,
      useNativeDriver: true
    }).start();
  };

  const handleNameChange = (text: string) => {
    setExerciseName(text);
  };

  const handleTargetAreaItems = (element: string) => {
    const index = targetArea.findIndex(item => item === element);
    if (index === -1) {
      setTargetArea([...targetArea, element]);
    } else {
      const newItems = [...targetArea];
      newItems.splice(index, 1);
      setTargetArea(newItems);
    }
  };

  const save = async () => {
    const exerciseData: Exercise = {
      name: exerciseName,
      type: exerciseType
    };
    if (exerciseType === "Weight") exerciseData.target = targetArea;
    await saveExercise(exerciseData);
  };

  const handleSubmit = async () => {
    if (exerciseName.length < 3) {
      ToastAndroid.showWithGravity("Provide a valid Exercise name", ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }
    if (exerciseType === "Weight" && targetArea.length === 0) {
      ToastAndroid.showWithGravity("Select at least one target area", ToastAndroid.SHORT, ToastAndroid.CENTER);
      return;
    }
    try {
      setProcessing(true);
      await save();
      ToastAndroid.showWithGravity("Saved", ToastAndroid.SHORT, ToastAndroid.CENTER);
      Navigation.navigate("tab");
    } catch (error) {
      ToastAndroid.showWithGravity("Could Not Save", ToastAndroid.SHORT, ToastAndroid.CENTER);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 20 }}>
      <TextHeader textBody="New Exercise" textAlign="center" />
      <InputBox
        textSize={16}
        placeholder="Enter name"
        paddingVertical={15}
        paddingHorizontal={20}
        value={exerciseName}
        handleChange={handleNameChange}
        marginVertical={20}
      />
      <Animated.View style={{ transform: [{ translateY: animatedXYButtons.y }], opacity: animatedButtonOpacity }}>
        <TextHeader textBody="Type" fontSize={18} />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              marginRight: 5
            }}>
            <Button
              buttonText="Cardio"
              paddingVertical={10}
              onPress={() => {
                fadeOut();
                targetSlideOut();
              }}
              backgroundColor={exerciseType === "Cardio" ? colors.notification : colors.card}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              marginLeft: 5
            }}>
            <Button
              buttonText="Weights"
              paddingVertical={10}
              onPress={() => {
                setExerciseType("Weight");
                fadeIn(100);
                targetSlideIn();
              }}
              backgroundColor={exerciseType === "Weight" ? colors.notification : colors.card}
            />
          </View>
        </View>
      </Animated.View>
      {exerciseType === "Weight" ? (
        <Animated.View style={{ opacity: animatedTargetOpacity, transform: [{ translateY: animatedXYTarget.y }] }}>
          <TextHeader textBody="Target Area" marginTop={10} fontSize={18} />
        </Animated.View>
      ) : null}
      <Animated.View
        style={{
          flex: 1,
          marginTop: 10,
          opacity: animatedTargetOpacity,
          transform: [{ translateY: animatedXYTarget.y }]
        }}>
        <ScrollView>
          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {exerciseType === "Weight"
              ? TARGET_AREA.map((element, index) => {
                  return (
                    <Button
                      key={index}
                      buttonText={element}
                      marginVertical={5}
                      marginHorizontal={5}
                      paddingVertical={5}
                      paddingHorizontal={10}
                      fontFamily="Poppins-Medium"
                      backgroundColor={targetArea.includes(element) ? colors.notification : colors.card}
                      onPress={() => handleTargetAreaItems(element)}
                    />
                  );
                })
              : null}
          </View>
        </ScrollView>
      </Animated.View>
      {processing === true ? <ActivityIndicator size={"large"} color={colors.primary} /> : null}
      <Button
        disabled={processing === true ? true : false}
        buttonText="Save Exercise"
        backgroundColor={processing === true ? `${colors.primary}50` : colors.primary}
        paddingVertical={10}
        marginVertical={20}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default CreateExercise;
