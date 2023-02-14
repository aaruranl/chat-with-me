import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { Image } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    navigation.setOptions({
      title: "ChatWithMe",
      headerStyle: { backgroundColor: "#FF3300",},
      headerTitleStyle: { color: "white" },
      headerTitleAlign: "center",
      headerTintColor: "black",
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autofocus
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          containerStyle={styles.input}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          containerStyle={styles.input}
          onSubmitEditing={signIn}
        />
      </View>
      
      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: '#FF3300',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
        onPress={signIn}
        >
        <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#FF3300',
        }}
        onPress={() => navigation.navigate("Register")}
        >
        <Text style={{ color: '#FF3300', textAlign: 'center' }}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 5,
    marginTop: 30,
    backgroundColor: "white",
  },

  inputContainer: {
    width: "80%",
    alignItems: "center",
  },

  logo: {
    width: 250,
    height: 250,
    marginBottom: 25,
    marginTop: 25,
  },

  input: {
    width: "80%",
    marginBottom: 30,
  },
});
