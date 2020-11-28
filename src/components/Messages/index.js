import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator,TouchableHighlight } from 'react-native';
import styles from './styles'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { useList } from "react-firebase-hooks/database";
import ContactImage from '../../sharedComponents/ContactImage';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
var chatNumber = 0;
const Messages = (navigation) => {
    const navigationA = useNavigation();
    const [currentUid, setCurrentUid] = useState(0);
    const [users, setUsers] = useState([]);
    const [snapshots, loading, error] = useList(firebase.database().ref(`users`));
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const uid = currentUid;

    snapshots.forEach((v, i) => {
        if (v != null) {
            if (v.val().userId == uid) {
                snapshots.splice(i, 1);
            }
        }
    });

    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            navigationA.navigate('Login');
        } else {
            setCurrentUid(user.uid);
        }
    });

    firebase.database().ref('users').orderByChild('userId').equalTo(currentUid).once("value")
        .then((snapshot) => {
            snapshot.forEach((subSnapshot) => {
                chatNumber = subSnapshot.val().numberChat;
            });
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
                <TouchableWithoutFeedback onPress={() => {
                    navigationA.dispatch(DrawerActions.openDrawer());
                }}>
                    <SimpleLineIcons name="menu" size={24} color="black" />
                </TouchableWithoutFeedback>
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
                    
                    removeDuplicates(snapshots, "userId").map(item => (
                        item.val().userId != uid ?
                            <TouchableHighlight key={Math.random()} onPress={() => {
                                setUser(item.val().userName);
                                setMessage(item.val().userMessage);
                                item.val().currentUser = uid;
                                navigationA.navigate("Chat", { item: item.val(), UID: uid });
                            }}>
                                <View style={styles.container} key={item.val().userId}>
                                    <View style={styles.flowInfo}>
                                        <View>
                                            <ContactImage userId={item.val().userId} styles={{ width: 60, height: 60, borderRadius: 200, borderWidth: 2, borderColor: 'white'}}/>
                                            
                                        </View>
                                        <View style={styles.test}>
                                            <Text style={styles.text}>{item.val().userName}</Text>
                                            <Text style={styles.text}>Send new message</Text>
                                            
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

export default Messages;