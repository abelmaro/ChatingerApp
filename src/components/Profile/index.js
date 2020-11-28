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
import { ColorPicker } from 'react-native-color-picker'

const getUserData = (currentUser) => {
    firebase.database().ref('users').orderByChild('userId').equalTo(currentUser.uid).once('value').then(res => {
        return res;
    });;
}

const Picker = () => (
    <ColorPicker
        onColorSelected={color => alert(`Color selected: ${color}`)}
        style={{ flex: 1 }}
    />
)

const Profile = (params) => {
    const currentUser = firebase.auth().currentUser;
    const navigation = useNavigation();
    var [user, setUser] = useState({});

    return (
        <View style={styles.container}>
            <CameraComponent />
            <View style={styles.colorPickerContainer}>
                <Picker />
            </View>
        </View>
    );
}

export default Profile;