import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, ToastAndroid, View } from "react-native";
import { TextHeader } from "../../component/Textbox";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../component/Button";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack, Workout } from "../../types";
import { fetchWorkouts } from "../../firestore/firestore";

type Prop = NativeStackScreenProps<RootStack, "selectWorkout">;

const SelectWorkout: React.FC<Prop> = ({ route }) => {
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>({ exercises: [], name: "" });
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { colors } = useTheme();

  useEffect(() => {
    async function getWorkoutData() {
      try {
        const data = await fetchWorkouts();
        setWorkouts(JSON.parse(JSON.stringify(data)));
      } catch (error) {
        console.log("select workout error", error);
      } finally {
        setRefreshing(false);
      }
    }
    getWorkoutData();
  }, [refreshing]);

  return (
    <View style={{ flex: 1, marginHorizontal: 10, marginTop: 20 }}>
      <TextHeader textBody="Select Workout Type" marginTop={20} />
      {workouts.length === 0 ? (
        <ActivityIndicator size={"large"} color={colors.primary} />
      ) : (
        <>
          <ScrollView
            style={{ flex: 1, marginTop: 20 }}
            bounces
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
                colors={[colors.primary, colors.border, colors.notification, colors.background]}
              />
            }>
            {workouts.map((element, index) => {
              return (
                <Button
                  key={index}
                  buttonText={element.name}
                  onPress={() => {
                    setSelectedWorkout({
                      exercises: element.exercises,
                      name: element.name
                    });
                  }}
                  backgroundColor={selectedWorkout.name === element.name ? colors.notification : colors.card}
                  marginVertical={8}
                  paddingVertical={10}
                />
              );
            })}
          </ScrollView>
          <Button
            buttonText="Enter Workout Data"
            onPress={() => {
              if (selectedWorkout.name === "") {
                ToastAndroid.showWithGravity("Select a workout to continue", ToastAndroid.SHORT, ToastAndroid.CENTER);
                return;
              }
              Navigation.navigate("currentWorkout", { workout: selectedWorkout });
            }}
            marginVertical={20}
            paddingVertical={10}
          />
        </>
      )}
    </View>
  );
};

export default SelectWorkout;
