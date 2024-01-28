import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInput } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  handleChange: (text: string) => void;
  handleSubmit?: () => Promise<void>;
  textColor?: string;
  placeholderColor?: string;
  textSize?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  borderRadius?: number;
  backgroundColor?: string;
};

const InputBox: React.FC<Props> = ({
  placeholder,
  placeholderColor,
  textSize,
  value,
  textColor,
  paddingVertical,
  paddingHorizontal,
  backgroundColor,
  borderRadius,
  marginHorizontal,
  marginVertical,
  handleSubmit,
  handleChange
}) => {
  const { colors } = useTheme();
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderColor || "#909090"}
      value={value}
      onChangeText={handleChange}
      onSubmitEditing={handleSubmit}
      style={{
        color: textColor || colors.text,
        fontSize: textSize || 16,
        fontFamily: "Poppins-Medium",
        borderRadius: borderRadius || 10,
        backgroundColor: backgroundColor || colors.card,
        paddingVertical: paddingVertical || 0,
        paddingHorizontal: paddingHorizontal || 0,
        marginVertical: marginVertical || 0,
        marginHorizontal: marginHorizontal || 0
      }}
    />
  );
};

export default InputBox;
