import React, { useEffect, useRef, useState } from "react";
import { ScrollView, ToastAndroid, View, ActivityIndicator, Animated } from "react-native";
import InputBox from "../../component/TextInput";
import { TextHeader } from "../../component/Textbox";
import { useNavigation, useTheme } from "@react-navigation/native";
import Card from "../../component/Card";
import { fetchExercises, saveWorkout } from "../../firestore/firestore";
import { Exercise, RootStack, Workout } from "../../types";
import Button from "../../component/Button";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type Prop = NativeStackScreenProps<RootStack, "createWorkout">;

const CreateWorkout: React.FC<Prop> = ({ route }) => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const { colors } = useTheme();
  const [data, setData] = useState<Exercise[]>([]);
  const [workout, setWorkout] = useState<Workout>({ name: "", exercises: [] });
  const [inProgress, setProgress] = useState<boolean>(false);
  const animatedTargetOpacity = useRef(new Animated.Value(0)).current;
  const animatedXYTarget = useRef(new Animated.ValueXY({ x: 0, y: 200 })).current;

  useEffect(() => {
    setData(route.params.exercise);
    fadeIn(250);
    targetSlideIn(350);
  }, []);

  const handleNameChange = (text: string) => {
    setWorkout(prevWorkout => ({
      ...prevWorkout,
      name: text
    }));
  };

  const onPressExercise = (element: Exercise) => {
    const index = workout.exercises.findIndex(item => item.name === element.name);
    if (index === -1) {
      setWorkout(prevWorkout => ({
        ...prevWorkout,
        exercises: [...prevWorkout.exercises, element]
      }));
    } else {
      setWorkout(prevWorkout => {
        const updatedExercises = [...prevWorkout.exercises];
        updatedExercises.splice(index, 1);
        return {
          ...prevWorkout,
          exercises: updatedExercises
        };
      });
    }
  };

  const fadeIn = (delay?: number) => {
    Animated.timing(animatedTargetOpacity, {
      toValue: 1,
      duration: 250,
      delay: delay || 0,
      useNativeDriver: true
    }).start();
  };

  const targetSlideIn = (ms?: number) => {
    Animated.spring(animatedXYTarget, {
      toValue: { x: 0, y: 0 },
      delay: ms || 0,
      bounciness: 10,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10, paddingTop: 20 }}>
      <TextHeader textBody="New Workout" textAlign="center" />
      <InputBox
        textSize={16}
        placeholder="Enter name"
        paddingVertical={15}
        paddingHorizontal={20}
        value={workout.name}
        handleChange={handleNameChange}
        marginVertical={20}
      />
      <TextHeader textBody="Select exercises to create a workout." textAlign="center" fontSize={16} />
      <Animated.View
        style={{
          flex: 1,
          marginVertical: 15,
          opacity: animatedTargetOpacity,
          transform: [{ translateY: animatedXYTarget.y }]
        }}>
        <ScrollView>
          {data.map((element, index) => {
            return (
              <Card
                key={index}
                text={element.name}
                onPress={() => onPressExercise(element)}
                iconName={
                  workout.exercises.findIndex(item => item.name === element.name) === -1 ? "check" : "check-circle"
                }
                iconsColor={
                  workout.exercises.findIndex(item => item.name === element.name) === -1
                    ? colors.text
                    : colors.notification
                }
                subText={element.type}
              />
            );
          })}
        </ScrollView>
      </Animated.View>
      {inProgress === true ? <ActivityIndicator size={"large"} color={colors.primary} /> : null}
      <Button
        buttonText="Save Workout"
        backgroundColor={inProgress === true ? `${colors.primary}30` : colors.primary}
        paddingVertical={10}
        marginVertical={10}
        onPress={async () => {
          if (workout.name.length < 3) {
            ToastAndroid.showWithGravity("Enter a valid Workout name", ToastAndroid.SHORT, ToastAndroid.CENTER);
            return;
          }
          if (workout.exercises.length === 0) {
            ToastAndroid.showWithGravity(
              "Select at least 1 exercise for the workout",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
            return;
          }
          try {
            setProgress(true);
            await saveWorkout(workout);
          } catch (error) {
            console.log("error saveing workout", error);
            ToastAndroid.showWithGravity("Could not save workout", ToastAndroid.SHORT, ToastAndroid.CENTER);
          } finally {
            setProgress(false);
            Navigation.goBack();
          }
        }}
      />
    </View>
  );
};

export default CreateWorkout;
