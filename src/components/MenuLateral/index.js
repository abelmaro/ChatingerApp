import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import styles from './styles'
import { TouchableOpacity, View, SafeAreaView, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
                    <View style={{
                        display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignContent: "center", alignItems: 'center'}}>
                        {
                            image ? 
                                <Image source={{ uri: `data:image/jpg;base64,${image}` }} style={{
                                    width: 230, height: 230, borderRadius: 200, borderWidth: 5, borderColor: 'white'
                                }} />
                            : <></>
                        }

                        <Text style={styles.textNombre}>{userInfo ? capitalizeFirstLetter(userInfo) : ""}</Text>
                    </View>
                    {/*<Text style={styles.title}>20 - Argentina </Text>*/}
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        navi.navigate("Profile");
                    }}>
                        <ListItem bottomDivider topDivider style={styles.itemList}>
                        <SimpleLineIcons name="user" size={24} color="black" />
                        <ListItem.Content>
                                <ListItem.Title style={styles.titleItem}>My profile</ListItem.Title>
                        </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ListItem bottomDivider style={styles.itemList}>
                            <SimpleLineIcons name="bell" size={24} color="black" />
                            <ListItem.Content>
                                <ListItem.Title style={styles.titleItem}>Notifications</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ListItem bottomDivider style={styles.itemList}>
                            <SimpleLineIcons name="settings" size={24} color="black" />
                            <ListItem.Content>
                                <ListItem.Title style={styles.titleItem}>Options</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        firebase.auth().signOut().then(function () {
                            navigationA.navigate('Login');
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }}>
                        <ListItem bottomDivider style={styles.itemList}>
                            <SimpleLineIcons name="logout" size={24} color="black" />
                            <ListItem.Content>
                                <ListItem.Title style={styles.titleItem}>Sign Out</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                    {/*
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
                    */}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default MenuLateral;
