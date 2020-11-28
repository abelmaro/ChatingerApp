import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import * as firebase from 'firebase'
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

const ContactImage = (props) => {
    const [image, setImage] = useState(null);
    useEffect(() => {
        let isCancelled = false;

        firebase.database().ref('users').orderByChild('userId').equalTo(props.userId).once('value')
            .then((snapshot) => {
                snapshot.forEach((subSnapshot) => {
                    setImage(subSnapshot.val().imageBase64)
                });
            });
        return () => {
            isCancelled = true;
        };
    }, []);
    return (
        <Image style={props.styles} source={{ uri: `data:image/jpg;base64,${image}` }} />
    );
}

export default ContactImage;