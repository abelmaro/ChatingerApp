import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator,TouchableHighlight } from 'react-native';
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

ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const Messages = (navigation) => {
    const navigationA = useNavigation();
    const [currentUid, setCurrentUid] = useState(0);
    const [users, setUsers] = useState([]);
    var [snapshots, loading, error] = useList(firebase.database().ref(`users`));
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
                setUser(props.item.val().userName);
                setMessage(props.item.val().userMessage);
                props.item.val().currentUser = uid;
                navigationA.navigate("Chat", { item: props.item.val(), UID: uid });
            }}>
                <ListItem bottomDivider>
                    <ContactImage userId={props.item.val().userId} styles={{ width: 60, height: 60, borderRadius: 200, borderWidth: 2, borderColor: 'white' }} />
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
                        item.val().userId != uid ?
                            <ContactChat item={item} key={ Math.random() }/>
                            : <></>
                    ))}
            </ScrollView>
        </View>
    );
}

export default Messages;