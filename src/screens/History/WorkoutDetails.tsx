import React from "react";
import { ScrollView, Text, View } from "react-native";
import { RootStack, WorkoutHistory } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextBox } from "../../component/Textbox";
import { useTheme } from "@react-navigation/native";

type Prop = NativeStackScreenProps<RootStack, "workoutHistory">;

const WorkoutHistoryComp: React.FC<Prop> = ({ navigation, route }) => {
  const { date, exercises, name } = route.params;
  const { colors } = useTheme();
  return (
    <ScrollView style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <TextBox textBody={name} fontSize={24} fontFamily="Poppins-SemiBold" />
      <TextBox textBody={date} />
      <View style={{ borderBottomColor: colors.text, borderBottomWidth: 1, marginVertical: 20 }} />
      {exercises.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: colors.card,
              paddingHorizontal: 10,
              paddingVertical: 15,
              marginVertical: 5,
              borderRadius: 10
            }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextBox textBody={item.exerciseName} fontSize={20} />
              <TextBox textBody={item.type} color={`${colors.text}80`} />
            </View>
            {item.data.map((exercise, exerciseIndex) => {
              return (
                <View>
                  {item.type === "Weight" ? <TextBox textBody={"Set " + (exerciseIndex + 1)} fontSize={20} /> : null}
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TextBox
                      textBody={item.type === "Weight" ? `Reps : ${exercise.reps}` : `Hours : ${exercise.hours}`}
                    />
                    <TextBox
                      textBody={
                        item.type === "Weight" ? `Weight : ${exercise.weight} kg` : `Hours : ${exercise.minutes}`
                      }
                    />
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default WorkoutHistoryComp;
