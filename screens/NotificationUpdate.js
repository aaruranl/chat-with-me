import React, { useState, useLayoutEffect } from 'react'
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native"
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Detail = ({route}) => {
    const notificationRef = firebase.firestore().collection('notification');
    const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          title: "Notification Update",
          headerStyle: { backgroundColor: "#FF3300" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "500",
            fontSize: 24,
            fontFamily: 'Cochin'
          },})
      }, [navigation]);

    const updateNotification = () => {
        if (textHeading && textHeading.length > 0) {
         notificationRef
            .doc(route.params.item.id)
            .update({
                heading: textHeading,
            }).then(() => {
                navigation.navigate("Notification")
            }).catch((error) => {
                alert(error.message)
            })
        }
        
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textfield}
                onChangeText={onChangeHeadingText}
                value={textHeading}
                placeholder={route.params.item.heading}
            />
            <Pressable 
                style={styles.buttonUpdate}
                onPress={() => {updateNotification()}}>
                <Text style={styles.buttonText}>UPDATE</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        marginLeft:15,
        marginRight:15,
    },
    textfield: {
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        color: "#000000",
        backgroundColor: "#e0e0e0",
        borderRadius: 5
    },
    buttonUpdate: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#FFAF0A',
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
});

export default Detail