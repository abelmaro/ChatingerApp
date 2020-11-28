import React, { useState, Component, useReducer } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/logo.png';
import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/firebase-database'

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const userRelevantData = {
                uid: user.uid,
            }
            navigation.navigate('Messages', userRelevantData);
        }
    });
    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(username, password);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const userRelevantData = {
                    uid: user.uid,
                }
                navigation.navigate('Messages', userRelevantData);
            }
            else {
                navigation.navigate('Login');
            }
        });
    }
    return (
        <View style={ styles.container }>
            <Text style={ styles.welcome }>CHATINGER</Text>
            <Image source={require('../../../assets/logo.png')} style={{width:150, height: 150}} />
            <View>
                <TextInput style={styles.input}
                    value={username}
                    placeholder="Email"
                    onChangeText={setUsername}
                    placeholderTextColor="white">
                </TextInput>
                <TextInput style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="white" >
                </TextInput>
                
            </View>
            <View>
                <TouchableOpacity style={styles.btnLogin} onPress={() => { handleLogin() }}>
                    <Text style={styles.textoEliminar}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRegister} onPress={() => { navigation.navigate('SignUp')} }>
                    <Text style={styles.textoEliminar}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
};

export default Login;