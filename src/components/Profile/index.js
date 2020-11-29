import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Modal } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'react-native-unimodules';
import CameraComponent from '../camera';
import * as firebase from 'firebase';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import { ColorPicker, fromHsv } from 'react-native-color-picker'
import { ListItem, Slider } from 'react-native-elements';
import { SimpleLineIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import CountryList from '../../../src/utils/countryList';

const getUserData = (currentUser) => {
    //const [userData, setUserData] = useState([]);
    firebase.database().ref('users').orderByChild('userId').equalTo(currentUser).once('value').then(res => {
        console.log(res);
    });;
}
const saveColorSelected = (color) => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users').orderByChild('userId').equalTo(userId).once('value')
        .then((snapshot) => {
            snapshot.forEach((subSnapshot) => {
                firebase.database().ref(`users/${subSnapshot.key}`).child('colorChat').set(color).then(error => console.log(error));
            });
        });
}

const Picker = () => (
    <ColorPicker
        style={{ flex: 1, width: 200 }}
        hideSliders
        onColorSelected={color => {
            saveColorSelected(color);
        }}
    />
)

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
        getUserData(currentUser.uid);
    });

    return (
        <>
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
                        <ListItem.Title>Country</ListItem.Title>
                    </ListItem.Content>
                    <DropDown items={
                        CountryList()
                    } defaultItem={"ARG"} />
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="user" size={24} color="black" />
                    {/*<SimpleLineIcons name="user-female" size={24} color="black" />*/}
                    <ListItem.Content>
                        <ListItem.Title>Gender</ListItem.Title>
                    </ListItem.Content>
                    <DropDown items={

                        [
                            { label: 'Male', value: 2 },
                            { label: 'Female', value: 1 },
                        ]
                    } defaultItem={ 1 } />
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="drop" size={24} color="black" />
                    <ListItem.Content>
                        <ListItem.Title>Messages color</ListItem.Title>
                    </ListItem.Content>
                    <TouchableWithoutFeedback onLongPress={() => {
                        setModalVisible(true);
                    }}>
                        <View style={{ width: 27, height: 27, backgroundColor: 'red', borderRadius: 200 }}></View>
                    </TouchableWithoutFeedback>
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="calendar" size={24} color="black" />
                    <ListItem.Content>
                        <ListItem.Title>Registration date</ListItem.Title>
                    </ListItem.Content>
                    <Text>10/07/2017</Text>
                </ListItem>
            </View>
        </>
    );
}

export default Profile;