import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'
import { TouchableHighlight } from 'react-native-gesture-handler';

const getContactList = () => {
    return [
        {
            userId: 16,
            userName: 'Pedrito',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Santiago_Cervera_Profile_Pic.jpg',
            userMessage: 'Hello my frined!',
            messageHour: '14:55'
        },
        {
            userId: 23,
            userName: 'Sofia Louren',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Aebh_Kelly_Profile_Picture1.png',
            userMessage: 'And then?',
            messageHour: '15:25'
        },
        {
            userId: 31,
            userName: 'Juan S.',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Scott_Morrison_2014_crop.jpg',
            userMessage: 'Maybe.',
            messageHour: '15:35'
        },
        {
            userId: 54,
            userName: 'Little Star',
            userPhoto: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Karolina_Lipowska_profile_photo_from_2017.jpg',
            userMessage: 'Not really!',
            messageHour: '16:32'
        }
    ]
}

const Messages = () => {
    const [ user, setUser ]= useState('');
    const [ message, setMessage ]= useState('');
    return (

        <View style={styles.principal}>
            <View style={ styles.appWelcome }>
                <Text style={ styles.appText }>
                    Chatinger
                </Text>
            </View>
            {
                getContactList().map(item => (
                    <TouchableHighlight key={item.userId} onPress={() => {
                        setUser(item.userName);
                        setMessage(item.userMessage)
                    }}>
                        <View style={styles.container} key={item.userId}>
                            <View style={styles.flowInfo}>
                                <View>
                                    <Image
                                        style={styles.userPhoto}
                                        source={{
                                            uri: item.userPhoto,
                                        }}
                                    />
                                </View>
                                <View style={styles.test}>
                                    <Text style={styles.text}>{item.userName}</Text>
                                    <Text style={styles.text}>{item.userMessage}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.text}>{item.messageHour}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>

                ))
            }
            {/*<Text style={styles.text}>User: {user}</Text>
                <Text style={styles.text}>Message: {message}</Text>*/}
        </View>
    );
}

export default Messages;