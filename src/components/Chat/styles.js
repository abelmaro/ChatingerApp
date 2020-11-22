import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ceil } from 'react-native-reanimated';

const colorText = '#d3e0d5';
const fFamily = 'Roboto';
const bgColor = '#262d31';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: bgColor,
        justifyContent: 'space-between'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 10
    },
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    text: {
        color: colorText,
        fontFamily: fFamily,
        fontSize: 25
    },
    icon: {
        borderRadius: 100,
        borderColor: 'white',
        padding: 5,
        borderWidth: 1
    },
    sendSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'gray',
        padding: 10,
    },
    messageInput: {
        height: 40,
        borderColor: '#1b2125',
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        display: 'flex',
        color: colorText,
        fontSize: 16,
        width: 300,
        backgroundColor: '#9a9a9a',
        right: 10,
        fontWeight: 'bold'
    },
    message: {
        marginHorizontal: 15,
        marginVertical: 1,
        padding: 10,
        backgroundColor: colorText,
        borderRadius: 100,
    }
});

export default styles;