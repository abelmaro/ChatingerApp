import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'
import ContactImage from '../../sharedComponents/ContactImage';

const ContactProfile = (navigation) => {
    const contactData = navigation.route.params;
    return (
        <View style={styles.container}>
            <View>
                <ContactImage userId={contactData.userId} styles={{width: 200, height: 200, borderColor: 'white', borderRadius: 200, borderWidth: 5}} />
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