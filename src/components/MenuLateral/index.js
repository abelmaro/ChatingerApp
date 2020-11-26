import React from 'react'
import { Text } from 'react-native-paper'
import styles from './styles'
import { TouchableOpacity, View, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

const MenuLateral = ({ navigation }) => {
    const navi = useNavigation();
    return (
        <SafeAreaView>
            <View style={[styles.container]}>
                <View>
                    <View>
                        <Text style={styles.textNombre}>Abelardin</Text>
                    </View>
                    <Text style={styles.title}>20 - Argentina </Text>
                    <View style={styles.horizontalLine} />
                </View>
                
                <View>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => {
                        navi.navigate("Profile", {});
                    }}>
                        <Text style={styles.cerrarSesionText}>My profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => {
                        //navi.navigate("Notifications", {});
                    }}>
                        <Text style={styles.cerrarSesionText}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => {
                        //navi.navigate("Options", {});
                    }}>
                        <Text style={styles.cerrarSesionText}>Options</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => {
                        firebase.auth().signOut().then(function () {
                            navigationA.navigate('Login');
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }}>
                        <Text style={styles.cerrarSesionText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MenuLateral;
