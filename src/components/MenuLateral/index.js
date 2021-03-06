import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import styles from './styles'
import { TouchableOpacity, View, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ListItem } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const MenuLateral = () => {
    const navi = useNavigation();
    const [user, setUser] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!fetched) {
            getCurrentUser();
        }
        const unsubscribe = navi.addListener('focus', () => {
            getCurrentUser();
        });
        return unsubscribe;
    }, [navi]);
    async function getCurrentUser() {
        const jsonValue = await AsyncStorage.getItem('@user_info');
        setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
        setFetched(true);
    }

    return (
        <SafeAreaView>
            <View style={[styles.container]}>
                <View>
                    <View style={{
                        display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignContent: "center", alignItems: 'center'}}>
                        {
                            user ? 
                                <View style={{
                                    borderRadius: 500, borderWidth: 5, borderColor: 'gray'
                                    }}>
                                <Image source={{ uri: `data:image/jpg;base64,${user.imageBase64}` }} style={{
                                    width: 230,
                                    height: 230,
                                    borderRadius: 500,
                                    borderWidth: 5,
                                    borderColor: '#fff',
                                }} />
                                </View>
                                : <ActivityIndicator size="large" color="#FFF" style={{
                                    width: 230, height: 230
                                }}/>
                        }

                        <Text style={styles.textNombre}>{user ? capitalizeFirstLetter(user.userName) : ""}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        navi.navigate("Profile", user);
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
