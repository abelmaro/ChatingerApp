import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, ScrollView, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useList } from "react-firebase-hooks/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import 'firebase/database'
import 'firebase/firebase-database'
import { sub } from 'react-native-reanimated';

const currentUser = firebase.auth().currentUser != undefined ? firebase.auth().currentUser.uid : '';
const generateId = () => {
    return Date.now() + Math.random();
}
var chatNumber = 0;
const sendMessage = (message, toUser, userNumber) => {
    const db = firebase.database().ref('conversations');
    console.log("CurrentUser: " + currentUser + "\nToUser: " + toUser);
    try {
        db.push({
            id: generateId(),
            fromUser: currentUser,
            toUser: toUser,
            message: message,
            date: Date.now(),
            from_To: currentUser + '_' + toUser,
            to_from: toUser + '_' + currentUser,
            chatNumber: userNumber
        });
    } catch (e) {
        console.log(e);
    }
}

const deleteMessage = (messageId) => {
    firebase.database().ref('conversations').orderByChild('id').equalTo(messageId).once('value')
        .then((snapshot) => {
            snapshot.forEach((subSnapshot) => {
                let key = subSnapshot.key;
                firebase.database().ref(`conversations/${key}`).remove()
            });
    });
}

const Chat = (navigation) => {
    const navigationDraw = useNavigation();
    if (navigation.route.params == null) {
        navigationDraw.navigate('Login');
    } else {
        const messages = [];
        const [mes, setMes] = useState(messages);
        const [value, onChangeText] = useState('');
        const [modalVisible, setModalVisible] = useState(false);
        const userInfo = navigation.route.params;
        const scrollViewRef = useRef();
        const [messageInfo, setMessageInfo] = useState({});

        firebase.database().ref('users').orderByChild('userId').equalTo(currentUser).once("value")
            .then((snapshot) => {
                snapshot.forEach((subSnapshot) => {
                    chatNumber = subSnapshot.val().numberChat;
                });
            });


        var messagesFetch = firebase.database().ref("conversations").orderByChild('chatNumber').equalTo(userInfo.item.numberChat + chatNumber);
        var messagesFetchInverse = firebase.database().ref("conversations").orderByChild('from_To').equalTo(userInfo.item.userId + '_' + currentUser);

        const Message = (props) => {
            const addStyle = props.own == true ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }
            return (
                <TouchableWithoutFeedback onLongPress={() => { setModalVisible(true); setMessageInfo(props); }}>
                    <View style={[styles.message, addStyle]}>
                        <Text>{props.message}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        const [snapshots, loading, error] = useList(messagesFetch);

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableWithoutFeedback onPress={() => navigationDraw.navigate('ContactProfile', userInfo.item)}>
                        <Image style={styles.userPhoto}
                            source={{
                                uri: userInfo.item.userPhoto,
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <Text style={styles.text}>{userInfo.item.userName}</Text>
                    <TouchableWithoutFeedback onPress={() => navigationDraw.goBack()}>
                        <AntDesign name="back" size={24} color="white" style={styles.icon} />
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(false)
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>{'"' + messageInfo.message + '"'}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: 80, alignItems: 'center', alignContent: 'center', justifyContent: 'space-between' }}>
                                        <TouchableWithoutFeedback onPress={() => { deleteMessage(messageInfo.messageId), setModalVisible(false) }}>
                                            <MaterialCommunityIcons name="delete-circle" size={35} color="red" />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
                                            <Ionicons name="ios-close-circle-outline" size={35} color="black" />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>

                        </Modal>
                    </View>
                    {
                        loading ? <ActivityIndicator size="large" color="#FFF" />
                            :
                            snapshots.map(message => {
                                return (
                                    <Message messageId={message.val().id} message={message.val().message} own={message.val().fromUser == currentUser} key={Math.random()} />
                                )
                            })
                    }
                </ScrollView>
                <View style={styles.sendSection}>
                    <TextInput style={styles.messageInput}
                        onChangeText={text => onChangeText(text)}
                        value={value} />
                    <TouchableWithoutFeedback onPress={() => {
                        if (value != '') {
                            setMes(mes.concat({ id: Math.random(), own: true, message: value }))
                            sendMessage(value, userInfo.UID, userInfo.item.numberChat + chatNumber)
                        } else {
                            <></>
                        }
                        onChangeText('')
                    }}>
                        <Ionicons name="md-send" size={40} color="white" />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default Chat;