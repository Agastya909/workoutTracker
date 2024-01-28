import { View, Text, Pressable, ToastAndroid, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { TextBox, TextHeader } from "../../component/Textbox";
import { Exercise } from "../../types";
import { useTheme } from "@react-navigation/native";
import InputBox from "../../component/TextInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../component/Button";

type Prop = Exercise;

type WeightData = {
  reps: string | null;
  weight: string | null;
};

type CardioData = {
  hours: string | null;
  minutes: string | null;
};

const ExerciseCard: React.FC<Prop> = ({ name, type, target }) => {
  console.log(type);
  const { colors } = useTheme();
  const [weight, setWeight] = useState<WeightData[]>([
    {
      reps: null,
      weight: null
    }
  ]);

  const [cardio, setCardio] = useState<CardioData>({
    hours: null,
    minutes: null
  });

  const increaseSetCount = () => {
    setWeight([...weight, { reps: "0", weight: "0" }]);
  };

  const decreaseSetCount = () => {
    if (weight.length > 0) {
      setWeight(weight.slice(0, -1));
    }
  };

  const handleWeightChange = (index: number, newWeight: string) => {
    if (index >= 0 && index < weight.length) {
      setWeight(prevWeight => {
        const updatedExercises = [...prevWeight];
        updatedExercises[index] = { ...updatedExercises[index], weight: newWeight };
        return updatedExercises;
      });
    }
  };

  const handleRepChange = (index: number, repCount: string) => {
    if (index >= 0 && index < weight.length) {
      setWeight(prevReps => {
        const updatedExercises = [...prevReps];
        updatedExercises[index] = { ...updatedExercises[index], reps: repCount };
        return updatedExercises;
      });
    }
  };

  const handleHourChange = (hours: string) => {
    setCardio({ ...cardio, hours: hours });
  };

  const handleMinuteChange = (minutes: string) => {
    setCardio({ ...cardio, minutes: minutes });
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
          <TextBox textBody={weight.length} />
          <TouchableOpacity
            onPress={increaseSetCount}
            style={{ backgroundColor: colors.notification, marginHorizontal: 15, borderRadius: 5 }}>
            <Icon name="plus" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10
      }}>
      <TextBox textBody={name} fontFamily="Poppins-SemiBold" fontSize={18} />
      {type === "Weight" ? <SetCountSection /> : null}
      <View style={{ borderBottomColor: "#D0D0D0", borderBottomWidth: 1, marginVertical: 10 }} />
      {type === "Weight" ? (
        weight.map((element, index) => {
          return (
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextBox textBody="Weight" />
                <TextInput
                  inputMode="numeric"
                  maxLength={5}
                  onChangeText={e => handleWeightChange(index, e)}
                  placeholder="kg"
                  placeholderTextColor={"#cccccc"}
                  value={weight[index].weight ? String(weight[index].weight) : undefined}
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextBox textBody="Reps" />
                <TextInput
                  inputMode="numeric"
                  maxLength={2}
                  onChangeText={e => handleRepChange(index, e)}
                  placeholder="count"
                  placeholderTextColor={"#cccccc"}
                  value={weight[index].reps ? String(weight[index].reps) : undefined}
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
            </View>
          );
        })
      ) : (
        <>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <TextBox textBody={"Hour(s)"} />
            <TextInput
              inputMode="numeric"
              maxLength={5}
              onChangeText={e => handleHourChange(e)}
              placeholder="hours"
              placeholderTextColor={"#cccccc"}
              value={cardio.hours || undefined}
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
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <TextBox textBody={"Minute(s)"} />
            <TextInput
              inputMode="numeric"
              maxLength={5}
              onChangeText={e => handleMinuteChange(e)}
              placeholder="minutes"
              placeholderTextColor={"#cccccc"}
              value={cardio.minutes || undefined}
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
        </>
      )}
    </View>
  );
};

export default ExerciseCard;
