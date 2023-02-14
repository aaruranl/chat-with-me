import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase/compat/app";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setURL] = useState(auth.currentUser.photoURL);
  const [errorMessage, setErrorMessage] = useState(null);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerStyle: { backgroundColor: "#FF3300" },
      headerTitleStyle: {
        color: "white",
        fontWeight: "500",
        fontSize: 24,
        fontFamily: 'Cochin'
      },})
  }, [navigation]);

  const handleUpdate = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user
        .updateProfile({
          displayName: name,
          photoURL: pictureUrl,
        })
        .then(() => {
          user
            .updateEmail(email)
            .then(() => {
              user
                .updatePassword(password)
                .then(() => {
                  alert("Information updated successfully!");
                  navigation.navigate("Home");
                })
                .catch((error) => {
                  setErrorMessage(error.message);
                });
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("No user signed in");
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        style={styles.profilePicture}
        rounded
        source={{
          uri:
            pictureUrl ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        }}
        size={200}
        overlayContainerStyle={{
          borderWidth: 2,
          borderColor: "black",
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Picture Url"
        value={pictureUrl}
        onChangeText={(text) => setURL(text)}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}


      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#FF3300',
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={handleUpdate}
        >
        <Text style={{ color: '#FF3300', textAlign: 'center' }}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '30%',
          backgroundColor: '#FF3300',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={signOutUser}
        >
        <Text style={{ color: 'white', textAlign: 'center' }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#EAFDFC",
  },
  input: {
    width: "70%",
    height: 40,
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  button: {
    width: "40%",
    height: 50,
    backgroundColor: "#70C6C7",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  buttonSignOut: {
    width: "40%",
    height: 50,
    backgroundColor: "#FC7300",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
  },

  profilePicture: {
    width: 180,
    height: 180,
    marginBottom: 10,
    borderColor: "orange",
  },
});
