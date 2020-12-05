import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
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
                    numberChat: Math.round(Date.now() + Math.random()),
                    colorChat: '',
                    tableKey: ''

                }).then(() => {
                    firebase.database().ref('users').orderByChild('userId').equalTo(newUser.user.uid).once('value')
                        .then((snapshot) => {
                            snapshot.forEach(async(subSnapshot) => {
                                if (subSnapshot != null) {
                                    const tableKey = Object.keys(snapshot.val())[0];
                                    firebase.database().ref(`users/${subSnapshot.key}`).child('tableKey').set(tableKey);
                                    await AsyncStorage.setItem('@user_info', JSON.stringify(subSnapshot));
                                    await AsyncStorage.getItem('@user_info').then(user_info => {
                                        navigation.navigate('Messages', user_info);
                                    });
                                }
                            });
                        });
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