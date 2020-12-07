import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native'
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [warning, setWarning] = React.useState(false);
    const [error, setError] = React.useState('');
    const navigation = useNavigation();

    const addNewUser = async () => {
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
                firebase.database().ref('users').push({
                    country: 'ARG',
                    gender: 'Male',
                    userId: user.user.uid,
                    userName: user.user.email.split("@")[0],
                    numberChat: Math.round(Date.now() + Math.random()),
                    colorChat: '#ededed',
                    tableKey: '',
                    imageBase64: 'iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAABEtEjdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDOTgwRjc5Mzk4RjExRTM5NzUwOENGRjlCNjZBOUZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDOTgwRjdBMzk4RjExRTM5NzUwOENGRjlCNjZBOUZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM5ODBGNzczOThGMTFFMzk3NTA4Q0ZGOUI2NkE5RkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUM5ODBGNzgzOThGMTFFMzk3NTA4Q0ZGOUI2NkE5RkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6XperXAAAYKUlEQVR42uzdV3cb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'

                }).then(() => {
                    navigation.navigate('Login', { username: username, password: password });
                });
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage);
            });
        }
    }

    return (
        <>
            <>
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
                <Text style={styles.welcome}>JOIN US!</Text>
                <Image source={require('../../../assets/logo.png')} style={{ width: 150, height: 150 }} />
                <View>
                    <TextInput style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#9a9a9a"
                        placeholder='Email'>
                    </TextInput>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        placeholderTextColor="#9a9a9a"
                        secureTextEntry>
                    </TextInput>
                    <TextInput style={styles.input}
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholder='Repeat password'
                        placeholderTextColor="#9a9a9a"
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
                    <TouchableOpacity style={styles.btnRegister} onPress={() => addNewUser()}>
                        <Text style={styles.textoEliminar}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default SignUp;