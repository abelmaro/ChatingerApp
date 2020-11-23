import React, { useState, Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(username, password);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Messages');
            }
            else {
                navigation.navigate('Login');
            }
        });
    }
    return (
        <View style={ styles.container }>
            <Text style={ styles.welcome }>CHATINGER</Text>
            <View style={{backgroundColor: 'white', width: 250, height: 250, borderRadius: 200}}/>
            <View>
                <TextInput style={styles.input}
                    value={username}
                    placeholder="Email"
                    onChangeText={setUsername}>
                </TextInput>
                <TextInput style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry>
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