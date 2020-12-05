import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, TextInput, ScrollView, ActivityIndicator, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useList } from "react-firebase-hooks/database";
import ContactImage from '../../sharedComponents/ContactImage';
import BackgroundImage from '../../../assets/backgroundChatWhite.jpg'
import * as firebase from 'firebase'
import 'firebase/database'
import 'firebase/firebase-database'

const generateId = () => {
    return Date.now() + Math.random();
}

const sendMessage = (message, toUser, userNumber, currentUser) => {
    const db = firebase.database().ref('conversations');
    try {
        db.push({
            id: generateId(),
            fromUser: currentUser.userId,
            toUser: toUser,
            message: message,
            date: Date.now(),
            from_To: currentUser.userId + '_' + toUser,
            to_from: toUser + '_' + currentUser.userId,
            numberChat: userNumber
        });
    } catch (e) {
        alert(e);
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


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Chat = (navigation) => {
    const navigationDraw = useNavigation();
    if (navigation.route.params == null) {
        navigationDraw.navigate('Login');
    } else {
        const contactInfo = navigation.route.params.item;
        const currentUser = navigation.route.params.currentUser;
        const messages = [];
        const [mes, setMes] = useState(messages);
        const [value, onChangeText] = useState('');
        const scrollViewRef = useRef();
        const [messageInfo, setMessageInfo] = useState({});
        const [modalVisible, setModalVisible] = useState(false);

        var numberChat = contactInfo.numberChat + currentUser.numberChat;
        var colorChat = currentUser ? currentUser.colorChat : 'white';
        var messagesFetch = firebase.database().ref("conversations").orderByChild('numberChat').equalTo(numberChat);

        const Message = (props) => {
            const addStyle = props.own == true ? { alignSelf: 'flex-end', backgroundColor: colorChat == "#000000" ? 'white' : colorChat }
                : { alignSelf: 'flex-start', backgroundColor: contactInfo.colorChat == "#000000" ? 'white' : contactInfo.colorChat }
            return (
                <TouchableWithoutFeedback /*onLongPress={() => { setModalVisible(true); setMessageInfo(props); }}*/>
                    <View style={[styles.message, addStyle]}>
                        <Text style={styles.textMessage}>{capitalizeFirstLetter(props.message)}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        const [snapshots, loading, error] = useList(messagesFetch);

        return (
            <View style={styles.container}>
                <ImageBackground source={BackgroundImage} style={styles.container}>
                    <View style={styles.header}>
                        <TouchableHighlight onPress={() => navigationDraw.navigate('ContactProfile', contactInfo)} style={{ zIndex: 100 }}>
                            <ContactImage userId={contactInfo.userId} image={ contactInfo.imageBase64 } styles={styles.userPhoto} />
                        </TouchableHighlight>
                        <Text style={styles.text}>{capitalizeFirstLetter(contactInfo.userName)}</Text>
                        <TouchableWithoutFeedback onPress={() => navigationDraw.goBack()}>
                            <AntDesign name="back" size={24} style={styles.icon} />
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                        {/*<View style={styles.centeredView}>
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
                    </View>*/}
                        {
                            loading ? <ActivityIndicator size="large" color="#FFF" />
                                :
                                snapshots.map(message => {
                                    return (
                                        <Message messageId={message.val().id} message={message.val().message} own={message.val().fromUser == currentUser.userId} key={Math.random()} />
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
                                sendMessage(value, contactInfo.userId, numberChat, currentUser)
                            } else {
                                <></>
                            }
                            onChangeText('')
                        }}>
                            <Ionicons name="md-send" size={40} color={colorChat} />
                        </TouchableWithoutFeedback>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Chat;