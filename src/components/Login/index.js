import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={ styles.container }>
            <Text style={ styles.welcome }>CHATINGER</Text>
            <View style={{backgroundColor: 'white', width: 120, height: 120, borderRadius: 100}}/>
            <View>
                <TextInput style={styles.input}
                    value={username}
                    onChangeText={setUsername}>
                </TextInput>
                <TextInput style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry>
                </TextInput>
            </View>
            <View>
                <TouchableOpacity style={styles.btnEntrar}>
                    <Text style={styles.textoEliminar}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
};

export default Login;