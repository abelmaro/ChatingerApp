import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'

const ContactProfile = (navigation) => {
    const contactData = navigation.route.params;
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.userPhoto}
                    source={{
                        uri: contactData.userPhoto,
                    }} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>
                    {contactData.userName}
                </Text>
                <Text style={styles.userInfo}>
                    {contactData.gender} - {contactData.country}
                </Text>
            </View>
        </View>
    );
}

export default ContactProfile;