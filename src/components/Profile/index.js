import React, { useEffect, useState } from 'react';
import { View, Text, Picker, TouchableWithoutFeedback, Modal, TouchableHighlight, ScrollView } from 'react-native';
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
import CountryList from '../../../src/utils/countryList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
    const navigation = useNavigation();
    const user = props.route.params;
    const [colorC, setColorC] = useState('');
    const [country, setCountry] = useState(user.country);
    const [gender, setGender] = useState(user.gender);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        return () => {}
    }, []);

    const CountryDropDown = (props, defaultItem, height) => {
        return (
            <Picker selectedValue={country} style={{ height: 50, width: 120}}
                onValueChange={(itemValue) => {
                    setCountry(itemValue)
                    updateStorageValue(itemValue, "country")
                }}
                key={"CountryDropdown"}>
                {
                    CountryList().map((country) => {
                        return <Picker.Item label={country.label} value={country.value} key={country.value}/>
                    })
                }
            </Picker>
        )
    }

    const GenderDropDown = (props, defaultItem, height) => {
        return (
            <Picker selectedValue={gender} style={{ height: 50, width: 120 }}
                selectedValue={gender}
                onValueChange={(itemValue) => {
                    setGender(itemValue)
                    updateStorageValue(itemValue, "gender")
                }}
                key={"GenderPicker"}>
                <Picker.Item label="Male" value="male" key="male" />
                <Picker.Item label="Female" value="female" key="female" />
            </Picker>
        )
    }

    const updateStorageValue = async (value, property) => {
        await AsyncStorage.getItem("@user_info")
            .then(async (data) => {
                data = JSON.parse(data);
                data[property] = value;
                switch (property) {
                    case "colorChat":
                        setColorC(value);
                        saveSelected(value, "colorChat")
                        return;
                    case "country":
                        setCountry(value);
                        saveSelected(value, "country")
                        return;
                    case "gender":
                        setGender(value);
                        saveSelected(value, "gender")
                        return;
                    default:
                }
                await AsyncStorage.mergeItem('@user_info', JSON.stringify(data));
            }).done();
    }

    const saveSelected = (value, property) => {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users').orderByChild('userId').equalTo(userId).once('value')
            .then((snapshot) => {
                snapshot.forEach((subSnapshot) => {
                    firebase.database().ref(`users/${subSnapshot.key}`).child(property).set(value);
                });
            });
    }

    const ColorPickerUI = () => (
        <ColorPicker
            style={{ flex: 1, width: 200 }}
            hideSliders
            defaultColor={colorC}
            onColorSelected={(color) => {
                updateStorageValue(color, "colorChat");
                setColorC(color);

                setModalVisible(false);
            }}
        />
    )

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <CameraComponent user={user} />
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
                            <Text style={styles.modalText}>{'Move and touch to\n select new color!'}</Text>
                            <ColorPickerUI />
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
                    <CountryDropDown items={
                        CountryList()
                    } defaultItem={user.country} />
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="user" size={24} color="black" />
                    {/*<SimpleLineIcons name="user-female" size={24} color="black" />*/}
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>Gender</ListItem.Title>
                    </ListItem.Content>
                    <GenderDropDown />
                </ListItem>
                <ListItem bottomDivider style={styles.itemList}>
                    <SimpleLineIcons name="drop" size={24} color="black" />
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItem}>Messages color</ListItem.Title>
                    </ListItem.Content>
                    <TouchableWithoutFeedback onLongPress={() => {
                        setModalVisible(true);
                    }}>
                        <View style={{ width: 27, height: 27, backgroundColor: user == null ? 'black' : colorC, borderRadius: 200, borderWidth: 1, borderColor: 'black' }}></View>
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