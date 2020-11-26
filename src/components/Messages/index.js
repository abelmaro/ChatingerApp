import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator,TouchableHighlight } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import { useList } from "react-firebase-hooks/database";


const Messages = (navigation) => {
    const navigationA = useNavigation();
    if (navigation.route.params == null) {
        navigationA.navigate('Login');
        return (<></>);
    } else {
        var fetchUsers = firebase.database().ref(`users`);
        const [users, setUsers] = useState([]);
        const [snapshots, loading, error] = useList(fetchUsers);
        const [user, setUser] = useState('');
        const [message, setMessage] = useState('');
        const [refreshing, setRefreshing] = React.useState(false);

        const uid = navigation.route.params.uid;
        snapshots.forEach((v, i) => {
            if (v != null) {
                if (v.val().userId == uid) {
                    snapshots.splice(i, 1);
                }
            }
        });

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
                            navigationA.navigate('Login');
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }}>
                        <SimpleLineIcons name="logout" size={24} color="#d3e0d5" />
                    </TouchableWithoutFeedback>
                </View>
                <View>
                </View>
                <ScrollView /*refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}*/>
                    {
                        snapshots.map(item => (
                            item.val().userId != uid ?
                                <TouchableHighlight key={item.val().userId} onPress={() => {
                                    setUser(item.val().userName);
                                    setMessage(item.val().userMessage);
                                    item.val().currentUser = uid;
                                    navigationA.navigate("Chat", { item: item.val(), UID: uid});
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
                                                <Text style={styles.text}>{uid}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={styles.text}>11:20</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                : <></>
                        ))}
                </ScrollView>
            </View>
        );
    }
}
export default Messages;