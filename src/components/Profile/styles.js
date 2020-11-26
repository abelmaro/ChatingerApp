import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const colorText = '#d3e0d5';
const fFamily = 'Roboto';
const bgColor = '#262d31';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        padding: 40
    },
    userPhoto: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 5
    },
    userName: {
        color: colorText,
        fontSize: 30
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    userInfo: {
        color: colorText
    },
});

export default styles;