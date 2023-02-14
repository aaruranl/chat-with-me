import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import Profile from "./screens/Profile";
import ChatScreen from "./screens/ChatScreen";
import Notification from "./screens/Notification";
import NotificationUpdate from "./screens/NotificationUpdate";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FF3300" },
  headerTitleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTintColor: "white",
  headerTextAlign: "center",
};

LoginScreen.navigationOptions = {
  headerLeft: null,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen
          name="NotificationUpdate"
          component={NotificationUpdate}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerBackTitle: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
