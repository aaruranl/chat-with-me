import { View, Text, FlatList, StyleSheet, Pressable, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { firebase, auth } from '../firebase';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
    const [notification, setNotification] = useState([]);
    const notificationRef = firebase.firestore().collection('notification');
    const [addData, setAddData] = useState('');
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          title: "Notification",
          headerStyle: { backgroundColor: "#FF3300" },
          headerTitleStyle: {
            color: "white",
            fontWeight: "500",
            fontSize: 24,
            fontFamily: 'Cochin'
          },})
      }, [navigation]);

    useEffect(() => {
        notificationRef
        .orderBy('createdAt', 'desc')
        .onSnapshot( 
            querySnapshot => {
            const notification = []
            querySnapshot.forEach((doc) => {
                const {heading} = doc.data()
                notification.push({
                    id: doc.id,
                    heading,
                })
            })
            setNotification(notification)
        })
    }, [])

    const deleteNotification = (notification) => {
        notificationRef
            .doc(notification.id)
            .delete()
            .then(() => {
                // alert("Deleted successfully");
            })
            .catch(error => {
                alert(error);
            })
    }

    const addNotification = () => {
        if (addData && addData.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            notificationRef
                .add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new notification'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(heading) => setAddData(heading)}
                    value={addData}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={addNotification}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{}}
                data={notification}
                numColumns={1}
                renderItem={({item}) => (
                    <View>
                        <Pressable
                        style={styles.container}
                        onPress={() => navigation.navigate('NotificationUpdate', {item})}>
                            <FontAwesome name="trash-o" 
                            color="red" 
                            onPress={() => deleteNotification(item)} 
                            style={styles.todoIcon} />
                            <View style={styles.innerContainer}>
                                <Text style={styles.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>
                                
                            </View> 
                            
                        </Pressable>
                    </View>
                    

                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin:5,
        marginHorizontal: 10,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer: {
        flexDirection: 'column',
        marginLeft:45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize:18,
        marginRight:22
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft:10,
        marginRight: 10,
        marginTop:100
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: 'pink',
        width: 80,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#FF3300'
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
});

export default Notification