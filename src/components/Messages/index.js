import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator, TouchableHighlight, AppState } from 'react-native';
import styles from './styles'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import ContactImage from '../../sharedComponents/ContactImage';
import { ListItem, Badge } from 'react-native-elements';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Messages = (navigation) => {
    const navigationA = useNavigation();
    const [user, setUser] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    var [snapshots, setSnapshots] = useState([]);
    useEffect(() => {
        if (!fetched) {
            getCurrentUser();
        }
        const unsuscribe = firebase.database().ref(`users`).on("value", snapshot => {
            var list = [];
            if (snapshot != null) {
                snapshot.forEach(subSnapshot => {
                    var stringify = JSON.stringify(subSnapshot);
                    var parse = JSON.parse(stringify);
                    list.push(parse);
                });
            }
            if (list.length >= 1) {
                setSnapshots(list);
                setLoading(false);
            }
        });

        AppState.addEventListener('change', (res) => _handleAppStateChange(res));

        return () => {
            unsuscribe();
            AppState.removeEventListener('change', (res) => _handleAppStateChange(res));
        }
    }, [firebase, user]);

    const _handleAppStateChange = (nextAppState) => {
        firebase.database().ref('users').orderByChild('userId').equalTo(firebase.auth().currentUser.uid).once('value')
            .then((snapshot) => {
                snapshot.forEach((subSnapshot) => {
                    firebase.database().ref(`users/${subSnapshot.key}`).child('status').set(nextAppState);
                });
            });
    };


    async function getCurrentUser() {
        const jsonValue = await AsyncStorage.getItem('@user_info');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
        setFetched(true);
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            navigationA.navigate('Login');
        }
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        snapshots = [];
        wait(50).then(() => setRefreshing(false));
    }, []);

    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const ContactChat = (props) => {
        return (
            <TouchableHighlight key={Math.random()} onPress={() => {
                props.item.currentUser = user.userId;
                navigationA.navigate("Chat", { item: props.item, currentUser: user });
            }}>
                <ListItem bottomDivider key={props.setKey}>
                    <Badge status={props.item.status == "active" ? "success" : "error"} containerStyle={{ position: "absolute", top: 20, left: 85, zIndex: 1 }}
                        badgeStyle={{ width: 15, height: 15, borderRadius: 200 }} />
                    <ContactImage userId={props.item.userId} image={props.item.imageBase64} styles={{ width: 60, height: 60, borderRadius: 500 }} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>{capitalizeFirstLetter(props.item.userName)}</ListItem.Title>
                        <ListItem.Subtitle style={styles.subtitleItem}>Send a message</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableHighlight>
        )
    };

    return (
        <View style={styles.principal}>
            <View style={styles.appWelcome}>
                <TouchableWithoutFeedback onPress={() => {
                    navigationA.dispatch(DrawerActions.openDrawer());
                }}>
                    <SimpleLineIcons name="menu" size={24} style={styles.icon} />
                </TouchableWithoutFeedback>
                <Text style={styles.appText}>
                    Chatinger
                </Text>
                <TouchableWithoutFeedback onPress={() => {
                    firebase.auth().signOut().then(function () {
                        firebase.database().ref('users').orderByChild('userId').equalTo(firebase.auth().currentUser.uid).once('value')
                            .then((snapshot) => {
                                snapshot.forEach((subSnapshot) => {
                                    firebase.database().ref(`users/${subSnapshot.key}`).child('status').set('background');
                                });
                            });
                        navigationA.navigate('Login');
                    }).catch(function (error) {
                        console.log(error);
                    });
                }}>
                    <SimpleLineIcons name="logout" size={24} style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
            <View>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    user != null ?
                        loading ? <></> :
                            snapshots.map(item => (
                                item.userId != user.userId ?
                                    <ContactChat item={item} setKey={item.userId} />
                                    : <></>
                            ))
                        : <></>
                }
            </ScrollView>
        </View>
    );
}

export default Messages;