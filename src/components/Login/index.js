import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/firebase-database'

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref('users').orderByChild('userId').equalTo(user.uid).once('value')
                .then((snapshot) => {
                    snapshot.forEach(async (subSnapshot) => {
                        await AsyncStorage.setItem('@user_info', JSON.stringify(subSnapshot));
                        await AsyncStorage.getItem('@user_info').then(user_info => {
                            navigation.navigate('Messages', user_info);
                        });
                    });
                }).catch(error => console.log(error));
        }
    });
    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(username, password);
        firebase.auth().onAuthStateChanged(async(user) => {
            if (user) {
                firebase.database().ref('users').orderByChild('userId').equalTo(user.uid).once('value')
                    .then((snapshot) => {
                        snapshot.forEach(async(subSnapshot) => {
                            await AsyncStorage.setItem('@user_info', JSON.stringify(subSnapshot));
                            await AsyncStorage.getItem('@user_info').then(user_info => {
                                navigation.navigate('Messages', user_info);
                            });
                        });
                    });
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
                    placeholderTextColor="#9a9a9a">
                </TextInput>
                <TextInput style={styles.input}
                    value={password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#9a9a9a" >
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