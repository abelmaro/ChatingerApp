import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator, TouchableHighlight } from 'react-native';
import styles from './styles'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { useList } from "react-firebase-hooks/database";
import ContactImage from '../../sharedComponents/ContactImage';
import { ListItem } from 'react-native-elements';
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
    var [snapshots, loading, error] = useList(firebase.database().ref(`users`));

    useEffect(() => {
        if (!fetched) {
            getCurrentUser();
        }
    }, []);

    async function getCurrentUser() {
        const jsonValue = await AsyncStorage.getItem('@user_info');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
        setFetched(true);
    }
    var currentSnapshotId = snapshots[0];
    snapshots.forEach((v, i) => {
        if (v != null) {
            if (v.val().userId == user.userId) {
                snapshots.splice(i, 1);
            }
            if (v.val().userId == currentSnapshotId.userId) {
                snapshots.splice(i, 1);
            }
            else {
                currentSnapshotId = v.val();
            }
        }
    });

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
                props.item.val().currentUser = user.userId;
                navigationA.navigate("Chat", { item: props.item.val(), currentUser: user });
            }}>
                <ListItem bottomDivider>
                    <ContactImage userId={props.item.val().userId} image={props.item.val().imageBase64 } styles={{ width: 60, height: 60, borderRadius:200}} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>{capitalizeFirstLetter(props.item.val().userName)}</ListItem.Title>
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
                    <SimpleLineIcons name="menu" size={24} style={ styles.icon} />
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
                    <SimpleLineIcons name="logout" size={24} style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
            <View>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    loading ? <ActivityIndicator size="large" color="#FFF" /> :
                        snapshots.map(item => (
                            item.val().userId != user.userId ?
                                <ContactChat item={item} key={item.val().userId} />
                                : <></>
                        ))}
            </ScrollView>
        </View>
    );
}

export default Messages;