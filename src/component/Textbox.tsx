import React from "react";
import { Text } from "react-native";
import { TextBoxProp } from "../types";

const TextBox: React.FC<TextBoxProp> = props => {
  return (
    <Text
      style={{
        color: props.color || "#FFFFFF",
        fontSize: props.fontSize || 16,
        fontFamily: props.fontFamily || "Poppins-Medium",
        textAlign: props.textAlign,
        marginTop: props.marginTop || 0,
        marginBottom: props.marginBottom || 0,
        marginLeft: props.marginLeft || 0,
        marginRight: props.marginRight || 0,
        padding: props.padding || 0,
        paddingLeft: props.paddingLeft || 0,
        paddingRight: props.paddingRight || 0,
        paddingBottom: props.paddingBottom || 0,
        paddingTop: props.paddingTop || 0,
        alignSelf: props.alignSelf,
        fontStyle: props.fontStyle || "normal"
      }}>
      {props.textBody}
    </Text>
  );
};

const TextHeader: React.FC<TextBoxProp> = props => {
  return (
    <Text
      style={{
        color: props.color || "#FFFFFF",
        fontSize: props.fontSize || 30,
        fontFamily: props.fontFamily || "Poppins-Bold",
        textAlign: props.textAlign,
        marginTop: props.marginTop || 0,
        marginBottom: props.marginBottom || 0,
        marginLeft: props.marginLeft || 0,
        marginRight: props.marginRight || 0,
        padding: props.padding || 0,
        paddingLeft: props.paddingLeft || 0,
        paddingRight: props.paddingRight || 0,
        paddingBottom: props.paddingBottom || 0,
        paddingTop: props.paddingTop || 0,
        alignSelf: props.alignSelf,
        fontStyle: props.fontStyle || "normal"
      }}>
      {props.textBody}
    </Text>
  );
};
export { TextBox, TextHeader };
