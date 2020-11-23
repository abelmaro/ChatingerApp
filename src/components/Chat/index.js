import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useList } from "react-firebase-hooks/database";
    
import * as firebase from 'firebase'
import 'firebase/database'
import 'firebase/firebase-database'

const Message = (props) => {
    const addStyle = props.own == true ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }
    return (
        <View style={[styles.message, addStyle]}>
            <Text>{ props.message }</Text>
        </View>
    );
}

const currentUser = firebase.auth().currentUser != undefined ? firebase.auth().currentUser.uid : '';

const generateId = () => {
    return Date.now() + Math.random();
}

const sendMessage = (message) => {
    const db = firebase.database().ref('messages');

    try {
        db.push({
            id: generateId(),
            fromUser: currentUser,
            toUser: 25,
            message: message })
    } catch (e) {
        console.log(e);
    }
}

const handlePosition = (fromUser) => {

    console.log();
}
const Chat = (navigation) => {
console.log(currentUser);
    const messages = [];
    const [mes, setMes] = useState(messages);
    const [value, onChangeText] = useState('');
    const userInfo = navigation.route.params;
    const navigationDraw = useNavigation();
    const scrollViewRef = useRef();
    var messagesFetch = firebase.database().ref("messages");
    const [snapshots, loading, error] = useList(messagesFetch);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigationDraw.navigate('ContactProfile', userInfo)}>
                    <Image
                        style={styles.userPhoto}
                        source={{
                            uri: userInfo.userPhoto,
                        }}
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.text}>{userInfo.userName}</Text>
                <TouchableWithoutFeedback onPress={() => navigationDraw.goBack()}>
                    <AntDesign name="back" size={24} color="white" style={styles.icon} />
                </TouchableWithoutFeedback>
            </View>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {
                    loading ? <ActivityIndicator size="large" color="#FFF" />
                        :
                    snapshots.map(message => {
                        return (<Message message={message.val().message} own={message.val().fromUser == currentUser} key={Math.random()} />)
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
                        sendMessage(value)
                    } else {
                        <></>
                    }
                    onChangeText('')
                    console.log(value)
                }}>
                    <Ionicons name="md-send" size={40} color="white" />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

export default Chat;