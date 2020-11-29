import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, TouchableHighlight, ScrollView } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import CameraComponent from '../camera';
import * as firebase from 'firebase';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import { ColorPicker } from 'react-native-color-picker'
import { ListItem } from 'react-native-elements';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import CountryList from '../../../src/utils/countryList';

const saveColorSelected = (color) => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users').orderByChild('userId').equalTo(userId).once('value')
        .then((snapshot) => {
            snapshot.forEach((subSnapshot) => {
                firebase.database().ref(`users/${subSnapshot.key}`).child('colorChat').set(color).then(error => console.log(error));
            });
        });
}

const DropDown = (props, defaultItem, height) => {
    return (
        <View style={styles.dropDownContainer}>
            <DropDownPicker
                items={props.items}
                defaultValue={props.defaultItem}
                containerStyle={{ height: 30, width: 120 }}
                style={{ backgroundColor: '#fafafa' }}
                dropDownStyle={{ backgroundColor: '#FFF', position: "absolute", zIndex: 100 }}
                //onChangeItem={item => console.log(item.label, item.value)}
            />
        </View>
    )
}

const Profile = (params) => {
    const currentUser = firebase.auth().currentUser;
    const navigation = useNavigation();
    var [user, setUser] = useState({});
    const [value, setValue] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        firebase.database().ref('users').orderByChild('userId').equalTo(currentUser.uid).on('value', (snapshot) => {
            if (snapshot) {
                snapshot.forEach((subSnapshot) => {
                    setUser(subSnapshot.val())
                });
            }
        })
    }, []);

    const Picker = () => (
        <ColorPicker
            style={{ flex: 1, width: 200 }}
            hideSliders
            defaultColor={user.colorChat}
            onColorSelected={(color) => {
                saveColorSelected(color);
                setModalVisible(false);
            }}
        />
    )

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <CameraComponent />
                </View>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false)
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{'Select new color!'}</Text>
                            <Picker />
                            <View style={{ display: 'flex', flexDirection: 'row', width: 80, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <TouchableWithoutFeedback onPress={() => { setModalVisible(false) }}>
                                    <Ionicons name="ios-close-circle-outline" size={35} color="black" />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
            <View style={styles.listItem}>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="location-pin" size={24} color="black" />
                    <ListItem.Content>
                        <ListItem.Title style={ styles.titleItem }>Country</ListItem.Title>
                    </ListItem.Content>
                    <DropDown items={
                        CountryList()
                    } defaultItem={"ARG"} />
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="user" size={24} color="black" />
                    {/*<SimpleLineIcons name="user-female" size={24} color="black" />*/}
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>Gender</ListItem.Title>
                    </ListItem.Content>
                    <DropDown items={

                        [
                            { label: 'Male', value: 1 },
                            { label: 'Female', value: 2 },
                        ]
                    } defaultItem={1} />
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="drop" size={24} color="black" />
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>Messages color</ListItem.Title>
                    </ListItem.Content>
                    <TouchableWithoutFeedback onLongPress={() => {
                        setModalVisible(true);
                    }}>
                        <View style={{ width: 27, height: 27, backgroundColor: user == null ? 'black' : user["colorChat"], borderRadius: 200, borderWidth: 1, borderColor: 'black' }}></View>
                    </TouchableWithoutFeedback>
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="calendar" size={24} color="black" />
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>Registration date</ListItem.Title>
                    </ListItem.Content>
                    <Text>10/07/2017</Text>
                </ListItem>
                <TouchableHighlight onPress={() => {
                    navigation.goBack();
                }}>
                    <ListItem bottomDivider style={styles.itemList}>
                        <SimpleLineIcons name="arrow-left" size={24} color="black" />
                        <ListItem.Content>
                            <ListItem.Title style={styles.titleItem}>Go back</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}

export default Profile;