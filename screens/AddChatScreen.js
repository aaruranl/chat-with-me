import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create New Chat",
      headerStyle: { backgroundColor: "#FF3300" },
      headerTitleStyle: {
        color: "white",
        fontWeight: "500",
        fontSize: 24,
        fontFamily: 'Cochin'
      },})
  }, [navigation]);

  // create chat
  const createChat = async () => {
    try {
      await db
        .collection("chats")
        .add({
          chatName: input,
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => alert(error));
      Alert.alert("Success", "Chat Created Successfully");
    } catch (error) {
      Alert.alert("Error", "Create Chat Failed");
      console.log(error);
    }
  };

  

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => {
          const trimmedText = text.trim();
          if (!trimmedText) {
            setInput(null);
          } else {
            setInput(trimmedText);
          }
        }}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="#FF3300" />
        }
      />

      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: '#FF3300',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
        onPress={() => {
          if (input) {
            createChat();
          } else {
            Alert.alert("Error", "Please enter a chat name");
          }
        }}
        >
        <Text style={{ color: 'white', textAlign: 'center' }}>Create new Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttons: {
    marginTop: 20,
    backgroundColor: "red",
    borderRadius: 4,
  },
});
