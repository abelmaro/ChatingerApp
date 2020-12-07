import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/firebase-database'
import { LinearGradient } from 'expo-linear-gradient';

const Login = (props) => {
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
                            var stringify = JSON.stringify(user_info);
                            navigation.navigate('Messages', JSON.parse(stringify));
                        });
                    });
                }).catch(error => console.log(error));
            firebase.database().ref('users').orderByChild('userId').equalTo(user.uid).once('value')
                .then((snapshot) => {
                    snapshot.forEach((subSnapshot) => {
                        firebase.database().ref(`users/${subSnapshot.key}`).child('status').set('active');
                    });
                });
        }
    });
    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(username, password);
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                firebase.database().ref('users').orderByChild('userId').equalTo(user.uid).once('value')
                    .then((snapshot) => {
                        snapshot.forEach(async (subSnapshot) => {
                            await AsyncStorage.setItem('@user_info', JSON.stringify(subSnapshot));
                            await AsyncStorage.getItem('@user_info').then(user_info => {
                                var stringify = JSON.stringify(user_info);
                                navigation.navigate('Messages', JSON.parse(stringify));
                            });
                        });
                    });
            }
            else {
                navigation.navigate('Login');
            }
        });
    }
    return (<><>
        <LinearGradient
            colors={['#425a79', '#1c2c40', 'transparent']}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 2000,
                zIndex: 1
            }}
        />
    </>
        <View style={styles.container}>
            <Text style={styles.welcome}>CHATINGER</Text>
            <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150 }} />
            <View style={{ overflow: "hidden", paddingBottom: 5 }}>
                <TextInput style={styles.input}
                    value={props.route.params != null ? props.route.params.username : username}
                    placeholder="Email"
                    onChangeText={setUsername}
                    placeholderTextColor="#9a9a9a">
                </TextInput>
                <TextInput style={styles.input}
                    value={props.route.params != null ? props.route.params.password : password}
                    placeholder="Password"
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#9a9a9a" >
                </TextInput>
            </View>
            <View>
                <TouchableOpacity style={styles.btnNext} onPress={() => { handleLogin() }}>
                    <Text style={styles.textoEliminar}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnNext} onPress={() => { navigation.navigate('SignUp') }}>
                    <Text style={styles.textoEliminar}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
    );
};

export default Login;