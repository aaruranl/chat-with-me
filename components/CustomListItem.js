import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db, auth, firebase} from "../firebase";
import { FontAwesome } from "@expo/vector-icons";


const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const chatsRef = firebase.firestore().collection('chats');

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return unsubscribe;
  }, []);

  const deleteChat = () => {
      chatsRef
        .doc(id)
        .delete()
        .then(() => {
            // alert("Deleted successfully");
        })
        .catch(error => {
            alert(error);
        })
}

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} buttonDivider style={{marginBottom: 2}}>
      <Avatar
        rounded
        size={40}
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        }}
        overlayContainerStyle={{
          borderWidth: 2,
          borderColor: "#FF3300",
          borderRadius: 40,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
        
      <FontAwesome name="trash-o" 
        color="red" 
        onPress={deleteChat}
        style={styles.todoIcon} />
                            
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  todoIcon:{
    marginTop:5,
    fontSize:20,
    marginRight:14,
},
});
