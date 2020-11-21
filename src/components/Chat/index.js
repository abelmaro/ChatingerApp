import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Message = (props) => {
    const addStyle = props.own == true ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }
    return (
        <View style={[styles.message, addStyle]}>
            <Text>{ props.message }</Text>
        </View>
    );
}

const sendMessage = (message) => {
    let newMessage = {
        id: Math.random(),
        own: true,
        message: message
    }
    try {
        console.log("exito");
        mes.push(newMessage);
    } catch (e) {
        console.log(e);
    }
}

const Chat = (navigation) => {
    const messages = [
        //{
        //    id: Math.random(),
        //    own: true,
        //    message: 'Hello Friend'
        //},
        //{
        //    id: Math.random(),
        //    own: true,
        //    message: 'How are you?'
        //},
        //{
        //    id: Math.random(),
        //    own: false,
        //    message: 'Hey!'
        //},
        //{
        //    id: Math.random(),
        //    own: false,
        //    message: 'Fine, what about you?'
        //}
    ];
    const [mes, setMes] = useState(messages);
    const [value, onChangeText] = useState('');
    const userInfo = navigation.route.params;
    const navigationDraw = useNavigation();
    const scrollViewRef = useRef();

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
                <Message message={userInfo.userMessage} own={false} key={Math.random()} />
                {
                    mes.map(message => {
                        return (<Message message={message.message} own={message.own} key={message.id} />)
                    })
                }
            </ScrollView>
            <View style={styles.sendSection}>
                <TextInput style={styles.messageInput}
                    onChangeText={text => onChangeText(text)}
                    value={value} />
                <TouchableWithoutFeedback onPress={() => {
                    value != '' ?
                        setMes(mes.concat({ id: Math.random(), own: true, message: value }))
                        : <></>
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