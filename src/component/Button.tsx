import React from "react";
import { Pressable } from "react-native";
import { TextBox } from "./Textbox";
import { useTheme } from "@react-navigation/native";

type ButtonProp = {
  buttonText: string;
  textSize?: number;
  backgroundColor?: string;
  borderRadius?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  onPress: () => void;
};

const Button: React.FC<ButtonProp> = props => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        backgroundColor: props.backgroundColor || colors.primary,
        borderRadius: props.borderRadius || 10,
        marginHorizontal: props.marginHorizontal || 0,
        marginVertical: props.marginVertical || 0,
        paddingHorizontal: props.paddingHorizontal || 0,
        paddingVertical: props.paddingVertical || 0
      }}>
      <TextBox
        textBody={props.buttonText}
        textAlign="center"
        fontFamily="Poppins-SemiBold"
        fontSize={props.textSize || 20}
      />
    </Pressable>
  );
};

export default Button;
