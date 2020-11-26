import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, Image} from 'react-native';
import styles from './styles'
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'react-native-unimodules';
import * as firebase from 'firebase';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import { CurrentRenderContext } from '@react-navigation/native';

const CameraComponent = (props) => {

    const currentUser = firebase.auth().currentUser;

    const [image, setImage] = useState(null);

    const selectOption = () => {
        if (ImagePicker.getCameraPermissionsAsync()) {
            //Alert.alert(
            //    'Choose a picture!',
            //    'We want to see your smile :)',
            //    [
            //        {
            //            text: 'Gallery',
            //            onPress: () => getImageFromGalery()
            //        },
            //        {
            //            text: 'Cancelar',
            //            style: 'cancel'
            //        }
            //    ],
            //    { cancelable: false }
            //);
            getImageFromGalery()
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
            setImage(result.uri);
            let b64ToSave = removeDataImage(result.base64);
            if (currentUser != null) {
                uploadFirebase(currentUser.uid, b64ToSave);
            }
        }
    }

    const uploadFirebase = (userId, b64) => {
        firebase.database().ref('users').orderByChild('userId').equalTo(userId).once('value')
            .then((snapshot) => {
                snapshot.forEach((subSnapshot) => {
                    let key = subSnapshot.key;
                    firebase.database().ref(`users/${key}`).child('imageBase64').set(b64);
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

    const B64Formatter = (props) => {
        return <props.b64Path />
    }

    return (
        <View>
            <TouchableOpacity style={[styles.btnSiguiente, { backgroundColor: 'white', padding: 10 }]} onPress={() => selectOption()}>
                <Text style={styles.textSiguiente}>Upload image</Text>
            </TouchableOpacity>
            {
                image != null ?
                    <View>
                        <Text style={{ color: 'white' }}>
                            Successfull
                            </Text>
                    </View>
                    :
                    <></>
            }
        </View>
    );
}

export default CameraComponent;