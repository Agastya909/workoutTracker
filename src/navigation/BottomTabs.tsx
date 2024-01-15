import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/index";
import Add from "../screens/Add/index";
import Workout from "../screens/History/index";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderColor: colors.background
        },
        tabBarIcon: ({ focused }) => {
          const routeName = route.name;
          if (routeName === "home") {
            return (
              <View>
                <Icon name="home-variant" size={24} color={focused ? colors.primary : colors.text} />
              </View>
            );
          } else if (routeName === "add") {
            return (
              <View>
                <Icon name="plus-circle" size={24} color={focused ? colors.primary : colors.text} />
              </View>
            );
          } else if (routeName === "workout") {
            return (
              <View>
                <Icon name="history" size={24} color={focused ? colors.primary : colors.text} />
              </View>
            );
          }
        }
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="add" component={Add} />
      <Tab.Screen name="workout" component={Workout} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
