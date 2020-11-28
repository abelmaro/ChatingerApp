import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import styles from './styles'
import { TouchableOpacity, View, SafeAreaView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

const MenuLateral = ({ navigation }) => {
    const navi = useNavigation();
    const user = firebase.auth().currentUser;
    const [image, setImage] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        firebase.database().ref('users').orderByChild('userId').equalTo(user.uid).once('value')
            .then((snapshot) => {
                snapshot.forEach((subSnapshot) => {
                    setImage(subSnapshot.val().imageBase64)
                    setUserInfo(subSnapshot.val().userName);
                });
            });
    });

    return (
        <SafeAreaView>
            <View style={[styles.container]}>
                <View>
                    <View style={{display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignContent: "center", alignItems: 'center'}}>
                        {
                            image ? 
                            <Image source={{ uri: `data:image/jpg;base64,${image}` }} style={{ width: 230, height: 230, borderRadius: 200, borderWidth: 5, borderColor: 'black' }} />
                            : <></>
                        }

                        <Text style={styles.textNombre}>{userInfo ? userInfo : ""}</Text>
                    </View>
                    {/*<Text style={styles.title}>20 - Argentina </Text>*/}
                    <View style={styles.horizontalLine} />
                </View>
                <View>
                    <TouchableOpacity style={styles.menuButtons} onPress={() => {
                        navi.navigate("Profile", { ID: '-MNBO5oNQBX1rFHzo_wU'});
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
