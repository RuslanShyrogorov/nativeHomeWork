import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useState, useEffect, useCallback } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

import RegistrationScreen from "./components/RegistrationScreen";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => {
      setIsShowKeyboard(true);
    });
    Keyboard.addListener("keyboardWillHide", () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    });
    return () => {
      Keyboard.removeAllListeners;
    };
  }, []);

  // FONTS
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("./assets/images/photo-bg.png")}
        >
          {isRegister ? (
            <RegistrationScreen
              setIsShowKeyboard={setIsShowKeyboard}
              isShowKeyboard={isShowKeyboard}
              setIsRegister={setIsRegister}
            />
          ) : (
            <LoginScreen
              setIsShowKeyboard={setIsShowKeyboard}
              isShowKeyboard={isShowKeyboard}
              setIsRegister={setIsRegister}
            />
          )}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#212121",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
