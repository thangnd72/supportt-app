import { useCallback, useEffect, useState } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

export const useKeyboard = (): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = useCallback((e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  }, []);

  const onKeyboardDidHide = useCallback(() => {
    setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      Keyboard.addListener("keyboardWillShow", onKeyboardDidShow);
      Keyboard.addListener("keyboardWillHide", onKeyboardDidHide);
    } else {
      Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
      Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    }
    return (): void => {
      if (Platform.OS === "ios") {
        Keyboard.removeListener("keyboardWillShow", onKeyboardDidShow);
        Keyboard.removeListener("keyboardWillHide", onKeyboardDidHide);
      } else {
        Keyboard.removeListener("keyboardDidShow", onKeyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", onKeyboardDidHide);
      }
    };
  }, []);

  return [keyboardHeight];
};
