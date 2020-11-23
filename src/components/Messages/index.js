import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, RefreshControl } from 'react-native';
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

const Messages = () => {
    const [users, setUsers] = useState([]);
    var fetchUsers = firebase.database().ref(`users`);
    const [snapshots, loading, error] = useList(fetchUsers);
    const navigation = useNavigation();
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(50).then(() => setRefreshing(false));
    }, []);

    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

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
            <ScrollView /*refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}*/>
                {
                    snapshots.map(item => (
                        item.val().userId != currentUser ?
                        <TouchableHighlight key={item.val().userId} onPress={() => {
                            setUser(item.val().userName);
                            setMessage(item.val().userMessage);
                            navigation.navigate("Chat", item.val());
                        }}>
                            <View style={styles.container} key={item.val().userId}>
                        {console.log(item)}
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
                                : <></>
                    ))
                }
            </ScrollView>

        </View>
    );
}
export default Messages;