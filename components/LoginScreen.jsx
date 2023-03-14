// ================
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({
  setIsShowKeyboard,
  isShowKeyboard,
  setIsRegister,
  dimensions,
}) {
  const [stateForm, setStateForm] = useState(initialState);

  const handleSubmit = () => {
    console.log(stateForm);
    setStateForm(initialState);
  };

  return (
    <KeyboardAvoidingView
      style={{ gap: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formContainer}>
        <View style={{ justifyContent: "flex-end", width: dimensions }}>
          <Text style={styles.formTitle}>Войти</Text>
          <TextInput
            onChangeText={(value) =>
              setStateForm((prevState) => ({
                ...prevState,
                email: value,
              }))
            }
            value={stateForm.email}
            style={styles.input}
            textAlign={"center"}
            placeholder="Адрес электронной почты"
            onFocus={() => setIsShowKeyboard(true)}
          ></TextInput>
          <TextInput
            onChangeText={(value) =>
              setStateForm((prevState) => ({
                ...prevState,
                password: value,
              }))
            }
            value={stateForm.password}
            style={{
              ...styles.inputWithOutMarginBottom,
              marginBottom: isShowKeyboard ? 32 : 43,
            }}
            textAlign={"center"}
            placeholder="Пароль"
            secureTextEntry={true}
            onFocus={() => setIsShowKeyboard(true)}
          ></TextInput>
          {!isShowKeyboard && (
            <>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={() => {
                  handleSubmit();
                }}
              >
                <Text style={styles.btnText}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsRegister(true);
                }}
              >
                <Text activeOpacity={0.9} style={styles.refText}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    // flex: 1,
    // marginHorizontal: 16,
    // justifyContent: "flex-end",
  },
  formTitle: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
  },
  inputWithOutMarginBottom: {
    fontFamily: "Roboto-Regular",
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    height: 51,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
  refText: {
    color: "#1B4371",
    textAlign: "center",
    marginBottom: 78,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
