import React from 'react';
import { Image } from 'react-native';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'

const ContactImage = (props) => {
    return (
        <Image style={props.styles} source={{ uri: `data:image/jpg;base64,${props.image}` }} />
    )
}

export default ContactImage;