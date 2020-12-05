import React from 'react';
import { View, Text } from 'react-native';
import '@firebase/firestore'
import 'firebase/database'
import 'firebase/firebase-database'
import ImageModal from 'react-native-image-modal';

const ContactImage = (props) => {
    return (
        <View>
            <ImageModal
                resizeMode="contain"
                imageBackgroundColor="transparent"
                renderToHardwareTextureAndroid={false}
                renderHeader={ <View><Text>Pepenaso</Text></View>}
                style={props.styles}
                source={{
                    uri: 'data:image/jpg;base64,' + props.image,
                }}
            />
        </View>
    )
}

export default ContactImage;