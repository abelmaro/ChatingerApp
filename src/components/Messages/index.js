import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './styles'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

import { useList } from "react-firebase-hooks/database";
const currentUser = firebase.auth().currentUser != undefined ? firebase.auth().currentUser.uid : '';

const getContactList = () => {
    return [
        {
            userId: 16,
            userName: 'Pedrito',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Santiago_Cervera_Profile_Pic.jpg',
            userMessage: 'Hello my friend!',
            messageHour: '14:55',
            gender: 'Male',
            country: 'Germany'
        },
        {
            userId: 23,
            userName: 'Sofia Louren',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Aebh_Kelly_Profile_Picture1.png',
            userMessage: 'And then?',
            messageHour: '15:25',
            gender: 'Female',
            country: 'Australia'
        },
        {
            userId: 31,
            userName: 'Juan S.',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Scott_Morrison_2014_crop.jpg',
            userMessage: 'Maybe.',
            messageHour: '15:35',
            gender: 'Male',
            country: 'Ireland'
        },
        {
            userId: 54,
            userName: 'Little Star',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Karolina_Lipowska_profile_photo_from_2017.jpg',
            userMessage: 'Not really!',
            messageHour: '16:32',
            gender: 'Female',
            country: 'Texas'
        }
    ]
}

const Messages = () => {
    const [users, setUsers] = useState([]);
    var fetchUsers = firebase.database().ref(`users`);
    const [snapshots, loading, error] = useList(fetchUsers);
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    return (
        <View style={styles.principal}>
            <View style={styles.appWelcome}>
                <Text style={styles.appText}>
                    Chatinger
                </Text>
                <TouchableWithoutFeedback onPress={() => {
                    firebase.auth().signOut().then(function () {
                        navigation.navigate('Login');
                    }).catch(function (error) {
                        console.log(error);
                    });
                }}>
                    <SimpleLineIcons name="logout" size={24} color="#d3e0d5" />
                </TouchableWithoutFeedback>
            </View>
            <ScrollView>
                {
                    snapshots.map(item => (
                        <TouchableHighlight key={item.val().userId} onPress={() => {
                            setUser(item.val().userName);
                            setMessage(item.val().userMessage);
                            navigation.navigate("Chat", item.val());
                        }}>
                            <View style={styles.container} key={item.val().userId}>
                                <View style={styles.flowInfo}>
                                    <View>
                                        <Image
                                            style={styles.userPhoto}
                                            source={{
                                                uri: item.val().userPhoto,
                                            }}
                                        />
                                    </View>
                                    <View style={styles.test}>
                                        <Text style={styles.text}>{item.val().userName}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.text}>11:20</Text>
                                </View>
                            </View>
                        </TouchableHighlight>

                    ))
                }
            </ScrollView>

        </View>
    );
}
export default Messages;