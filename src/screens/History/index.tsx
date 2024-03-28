import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextBase, TouchableOpacity, View } from "react-native";
import { fetchWorkOutHistory } from "../../firestore/firestore";
import { TextBox } from "../../component/Textbox";
import Card from "../../component/Card";
import { RootStack, WorkoutHistory } from "../../types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const History: React.FC = () => {
  const { colors } = useTheme();
  const Navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [fetchData, setFetching] = useState<boolean>(false);
  const [history, setHistory] = useState<WorkoutHistory[]>();
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    try {
      setFetching(true);
      const data = await fetchWorkOutHistory();
      setHistory(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.log("fetch history error :", error);
    } finally {
      setTimeout(() => {
        setFetching(false);
      }, 400);
    }
  };

  const HistoryCard: React.FC<{ data: WorkoutHistory }> = data => {
    return (
      <TouchableOpacity
        onPress={() => Navigation.navigate("workoutHistory", data.data)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: colors.card,
          paddingHorizontal: 10,
          paddingVertical: 20,
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 10
        }}>
        <TextBox textBody={data.data.name} fontFamily="Poppins-SemiBold" fontSize={20} />
        <TextBox textBody={data.data.date} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {fetchData ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} color={"#ff6666"} />
          <TextBox textBody={"Fetching history"} fontFamily="Poppins-Bold" fontSize={32} textAlign="center" />
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <TextBox textBody={"History"} fontSize={32} marginLeft={10} fontFamily="Poppins-Bold" />
          {history && history?.length > 0 ? (
            history?.map((item, index) => <HistoryCard key={index} data={item} />)
          ) : (
            <TextBox textBody={"No History"} fontSize={32} marginLeft={10} fontFamily="Poppins-Bold" />
          )}
        </View>
      )}
    </View>
  );
};

export default History;
