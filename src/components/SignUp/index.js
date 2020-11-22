import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import firebase from 'firebase';

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
            firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage);
            });
            //navigation.navigate('Login');
        }
    }

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>JOIN US!</Text>
            <View style={{ backgroundColor: 'white', width: 250, height: 250, borderRadius: 200 }} />
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