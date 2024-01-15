import { useTheme } from "@react-navigation/native";
import React from "react";
import { Modal, Pressable, View } from "react-native";
import { TextBox } from "../../component/Textbox";
import Button from "../../component/Button";

type Props = {
  isVisible: boolean;
  close: () => void;
  cancelWorkout: () => void;
};

const ConfirmModal: React.FC<Props> = ({ isVisible, close, cancelWorkout }) => {
  const { colors } = useTheme();
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={close}>
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={close} />
        <View
          style={{
            backgroundColor: colors.card,
            padding: 10,
            width: "100%",
            borderRadius: 10
          }}>
          <TextBox textBody="Workout Not finished" textAlign="center" marginTop={10} fontSize={20} />
          <Button buttonText="Continue Workout" onPress={close} paddingVertical={10} marginVertical={20} />
          <Button
            buttonText="Discard and Exit"
            onPress={cancelWorkout}
            backgroundColor={colors.card}
            elevation={-1}
            fontFamily="Poppins-Medium"
            textSize={16}
            marginVertical={5}
            textColor={colors.border}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
