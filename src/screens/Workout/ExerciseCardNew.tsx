import { View, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { TextBox } from "../../component/Textbox";
import { Exercise } from "../../types";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../component/Button";

type WeightData = {
  reps: string | "0";
  weight: string | "0";
};

type CardioData = {
  hours: string | "0";
  minutes: string | "0";
};

type ExerciseData =
  | ({
      type: "Weight" | "Cardio";
    } & {
      exerciseName: string;
      type: "Weight";
      data: WeightData[];
    })
  | {
      exerciseName: string;
      type: "Cardio";
      data: CardioData[];
    };

const ExerciseCardNew: React.FC<Exercise & { saveData: (data: ExerciseData) => void }> = ({
  name,
  type,
  target,
  saveData
}) => {
  const { colors } = useTheme();
  const [repData, setRepData] = useState<WeightData[]>([]);
  const [cardioData, setCardioData] = useState<CardioData>({
    hours: "0",
    minutes: "0"
  });

  const increaseSetCount = () => {
    const updatedExercises = [...repData, { reps: "0", weight: "0" }];
    setRepData(updatedExercises);
    saveData({ exerciseName: name, type: "Weight", data: updatedExercises });
  };

  const decreaseSetCount = () => {
    if (repData.length > 0) {
      const updatedExercises = repData.slice(0, -1);
      setRepData(updatedExercises);
      saveData({ exerciseName: name, type: "Weight", data: updatedExercises });
    }
  };

  const handleWeightChange = (index: number, newWeight: string) => {
    if (index >= 0 && index < repData.length) {
      const updatedExercises = [...repData];
      updatedExercises[index] = { ...updatedExercises[index], weight: newWeight };
      setRepData(updatedExercises);
      saveData({ exerciseName: name, type: "Weight", data: updatedExercises });
    }
  };

  const handleRepChange = (index: number, repCount: string) => {
    if (index >= 0 && index < repData.length) {
      const updatedExercises = [...repData];
      updatedExercises[index] = { ...updatedExercises[index], reps: repCount };
      setRepData(updatedExercises);
      saveData({ exerciseName: name, type: "Weight", data: updatedExercises });
    }
  };

  const SetCountSection: React.FC = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextBox textBody={"Set Count"} />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={decreaseSetCount}
            style={{ backgroundColor: colors.notification, marginHorizontal: 15, borderRadius: 5 }}>
            <Icon name="minus" size={24} color={colors.text} />
          </TouchableOpacity>
          <TextBox textBody={repData.length} />
          <TouchableOpacity
            onPress={increaseSetCount}
            style={{ backgroundColor: colors.notification, marginHorizontal: 15, borderRadius: 5 }}>
            <Icon name="plus" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const WeightSection: React.FC<{ index: number }> = ({ index }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextBox textBody="Weight (in Kg)" />
        <TextInput
          inputMode="numeric"
          maxLength={5}
          onChangeText={e => handleWeightChange(index, e)}
          placeholder="kg"
          placeholderTextColor={"#cccccc"}
          value={repData[index].weight}
          style={{
            textAlign: "center",
            color: colors.text,
            paddingHorizontal: 20,
            paddingTop: 5,
            paddingBottom: 10,
            backgroundColor: "#303030",
            borderRadius: 10,
            marginHorizontal: 10
          }}
        />
      </View>
    );
  };

  const RepCountSection: React.FC<{ index: number }> = ({ index }) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextBox textBody="Reps" />
        <TextInput
          inputMode="numeric"
          maxLength={2}
          onChangeText={e => handleRepChange(index, e)}
          placeholder="count"
          placeholderTextColor={"#cccccc"}
          value={repData[index].reps}
          style={{
            textAlign: "center",
            color: colors.text,
            paddingHorizontal: 20,
            paddingTop: 5,
            paddingBottom: 10,
            backgroundColor: "#303030",
            borderRadius: 10,
            marginHorizontal: 10
          }}
        />
      </View>
    );
  };

  const handleHourChange = (hours: string) => {
    let updatedCardioData = { ...cardioData, hours: hours };
    if (!isNaN(Number(hours))) {
      setCardioData(updatedCardioData);
      saveData({ data: [updatedCardioData], type: "Cardio", exerciseName: name });
    }
  };

  const handleMinuteChange = (minutes: string) => {
    let updatedCardioData = { ...cardioData, minutes: minutes };
    if (!isNaN(Number(minutes))) {
      setCardioData(updatedCardioData);
      saveData({ data: [updatedCardioData], type: "Cardio", exerciseName: name });
    }
  };

  const CardioSection: React.FC = () => {
    return (
      <>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <TextBox textBody={"Hour(s)"} />
          <TextInput
            inputMode="numeric"
            maxLength={5}
            onChangeText={e => handleHourChange(e)}
            placeholder="hours"
            placeholderTextColor={"#cccccc"}
            value={cardioData.hours}
            style={{
              textAlign: "center",
              color: colors.text,
              padding: 5,
              backgroundColor: "#303030",
              borderRadius: 10,
              marginHorizontal: 10
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <TextBox textBody={"Minute(s)"} />
          <TextInput
            inputMode="numeric"
            maxLength={5}
            onChangeText={e => handleMinuteChange(e)}
            placeholder="minutes"
            placeholderTextColor={"#cccccc"}
            value={cardioData.minutes}
            style={{
              textAlign: "center",
              color: colors.text,
              padding: 5,
              backgroundColor: "#303030",
              borderRadius: 10,
              marginHorizontal: 10
            }}
          />
        </View>
      </>
    );
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: colors.card,
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginVertical: 5,
          borderRadius: 10
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextBox textBody={name} fontFamily="Poppins-SemiBold" fontSize={20} />
        </View>
        {type === "Weight" ? <SetCountSection /> : null}
        <View style={{ borderBottomColor: "#D0D0D0", borderBottomWidth: 1, marginVertical: 10 }} />
        {type === "Weight" ? (
          repData.map((data, index) => {
            return (
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }} key={index}>
                <WeightSection index={index} />
                <RepCountSection index={index} />
              </View>
            );
          })
        ) : (
          <CardioSection />
        )}
      </View>
    </View>
  );
};

export default ExerciseCardNew;
