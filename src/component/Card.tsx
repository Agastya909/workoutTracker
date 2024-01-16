import React from "react";
import { Pressable, View } from "react-native";
import { TextBox } from "./Textbox";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Prop = {
  text: string;
  iconName?: string;
  iconSize?: number;
  iconsColor?: string;
  subText?: string;
  subtextBackground?: string;
  onPress: () => void;
};

const Card: React.FC<Prop> = ({ text, iconName, iconSize, iconsColor, subText, subtextBackground, onPress }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: 10,
        backgroundColor: "#212121",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 15
      }}>
      {iconName ? (
        <View style={{ marginRight: 15 }}>
          <Icon name={iconName} size={iconSize || 24} color={iconsColor || colors.primary} />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <TextBox textBody={text} />
      </View>
      {subText ? (
        <View
          style={{
            backgroundColor: subtextBackground || colors.notification,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10
          }}>
          <TextBox textBody={subText} />
        </View>
      ) : null}
    </Pressable>
  );
};

export default Card;
