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
  elevation?: number;
  fontFamily?: string;
  textColor?: string;
  disabled?: boolean;
  onPress: () => void;
};

const Button: React.FC<ButtonProp> = props => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled || false}
      style={{
        backgroundColor: props.backgroundColor || colors.primary,
        borderRadius: props.borderRadius || 10,
        marginHorizontal: props.marginHorizontal || 0,
        marginVertical: props.marginVertical || 0,
        paddingHorizontal: props.paddingHorizontal || 0,
        paddingVertical: props.paddingVertical || 0,
        elevation: props.elevation || 2
      }}>
      <TextBox
        textBody={props.buttonText}
        textAlign="center"
        fontFamily={props.fontFamily || "Poppins-SemiBold"}
        fontSize={props.textSize || 16}
        color={props.textColor || colors.text}
      />
    </Pressable>
  );
};

export default Button;
