import React, { useEffect, useState } from 'react';
import { View, Platform, Alert, Text } from 'react-native';
import styles from './styles'
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'react-native-unimodules';
import ContactImage from '../../sharedComponents/ContactImage';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

const CameraComponent = (props) => {
    const [image, setImage] = useState('');
    const user = props.user;
    useEffect(() => {
        setImage(user.imageBase64);
    }, []);

    const updateStorageValue = async (value) => {
        await AsyncStorage.getItem("@user_info")
            .then(async (data) => {
                data = JSON.parse(data);
                data.imageBase64 = value;
                setImage(value);
                await AsyncStorage.mergeItem('@user_info', JSON.stringify(data)).catch(err => {
                    console.log(err);
                });;
            }).done();
    }

    const selectOption = () => {
        if (ImagePicker.getCameraPermissionsAsync()) {
            Alert.alert(
                'Choose a picture!',
                'We want to see your smile :)',
                [
                    {
                        text: 'Gallery',
                        onPress: () => getImageFromGalery()
                    },
                    {
                        text: 'Cancelar',
                        style: 'cancel'
                    }
                ],
                { cancelable: false }
            );
        }
    }
    const getImageFromGalery = async () => {
        await askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            let b64ToSave = removeDataImage(result.base64);
            if (user != null) {
                uploadFirebase(user.uid, b64ToSave);
            }
        }
    }

    const uploadFirebase = (userId, b64) => {
        firebase.database().ref('users').orderByChild('userId').equalTo(user.userId).once('value')
            .then((snapshot) => {
                snapshot.forEach(async(subSnapshot) => {
                    let key = subSnapshot.key;
                    let b64formatted = removeDataImage(b64);
                    firebase.database().ref(`users/${key}`).child('imageBase64').set(b64formatted).catch(error => console.log(error));
                    await updateStorageValue(b64formatted);
                    //TODO: Update imageBase64 value from AsyncStorage
                });
            });
    }

    const removeDataImage = (str) => {
        return str.replace(/^data:image\/[a-z]+;base64,/, "");
    }

    const askPermissionsAsync = async () => {
        if (Platform.OS !== 'web') {
            await Permissions.askAsync(Permissions.CAMERA);
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
    };
    return (
        <View style={styles.container} >
            {
                user != null ?
                    <View>
                        <ContactImage userId={user.userId} image={ image } styles={{ margin: 25, width: 200, height: 200, borderRadius: 200, borderWidth: 5, borderColor: 'white' }} />
                    </View>
                    :
                    <></>
            }
            <Button style={styles.btnSiguiente} onPress={() => selectOption()} title="Upload image" type="outline"/>

        </View>
    );
}

export default CameraComponent;