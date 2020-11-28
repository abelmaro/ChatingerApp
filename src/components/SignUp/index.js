import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import Logo from '../../../assets/logo.png';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

const SignUp = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [warning, setWarning] = React.useState(false);
    const [error, setError] = React.useState('');

    const addNewUser = async() => {
        if (username == '' || password == '' || rePassword == '') {
            alert("Please fill all fields");
            return;
        }
        if (password != rePassword) {
            setWarning(true);
            return;
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(username, password).then(user => {
                var newUser = user;
                firebase.database().ref('users').push({
                    country: '',
                    gender: '',
                    userId: user.user.uid,
                    userName: user.user.email.split("@")[0],
                    userPhoto: 'https://freepikpsd.com/wp-content/uploads/2019/10/default-profile-pic-png-5-Transparent-Images.png',
                    numberChat: Math.round(Date.now() + Math.random()),
                    colorChat: '',
                    tableKey: ''

                }).then(() => {
                    firebase.database().ref('users').orderByChild('userId').equalTo(newUser.user.uid).once('value')
                        .then((snapshot) => {
                            snapshot.forEach((subSnapshot) => {
                                if (subSnapshot != null) {
                                    const tableKey = Object.keys(snapshot.val())[0];
                                    console.log(tableKey);
                                    firebase.database().ref(`users/${subSnapshot.key}`).child('tableKey').set(tableKey);
                                }
                            });
                        });
                    navigation.navigate('Messages');
                });
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage);
            });
        }
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>JOIN US!</Text>
            <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150 }} />
            <View>
                <TextInput style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder='Email'>
                </TextInput>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Password'
                    secureTextEntry>
                </TextInput>
                <TextInput style={styles.input}
                    value={rePassword}
                    onChangeText={setRePassword}
                    placeholder='Repeat password'
                    secureTextEntry>
                </TextInput>
                
            </View>
            {
                warning ?
                    <Text style={styles.error}>The passwords must be equals</Text>
                    : <></>
            }
            {
                error != '' ?
                    <Text style={styles.error}>{error}</Text>
                    : <></>
            }
            <View>
                <TouchableOpacity style={styles.btnRegister} onPress={ () => addNewUser()}>
                    <Text style={styles.textoEliminar}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUp;