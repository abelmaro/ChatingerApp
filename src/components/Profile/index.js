import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Platform } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'react-native-unimodules';
import CameraComponent from '../camera';
import * as firebase from 'firebase';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import { sub } from 'react-native-reanimated';

const getUserData = async (currentUser) => {
    var arr = [];
    await firebase.database().ref('users').orderByChild('userId').equalTo(currentUser.uid).once('value')
        .then((snapshot) => {
            snapshot.forEach((subSnapshot) => {
                if (subSnapshot != null) {
                    arr.push(subSnapshot);
                    return;
                }
            });
        });

    return Promise.all(arr);
}


const Profile = (params) => {
    const currentUser = firebase.auth().currentUser;
    const navigation = useNavigation();
    var [user, setUser] = useState(null);
    if (currentUser != null) {
        setTimeout(() => {
            getUserData(currentUser).then(data => {
                console.log(data)
            });
        }, 2000);
    }
    console.log(user)

    //const contactData = navigation.route.params;
    return (
        <View style={styles.container}>
            <View>
                <TouchableWithoutFeedback onPress={() => { alert("cambia foto") }}>
                    <Image style={styles.userPhoto}
                        source={{
                            uri: "https://freepikpsd.com/wp-content/uploads/2019/10/default-profile-pic-png-5-Transparent-Images.png",
                        }} />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>
                    { user.userName}
                </Text>
                {user != {} ?
                    <View>
                        <Text style={styles.userInfo}>
                            <Text styles={{ color: 'white' }}>{user.gender}</Text>
                        </Text>
                    </View>
                    : <></>
                }
            </View>
            <CameraComponent />
        </View>
    );
}

export default Profile;