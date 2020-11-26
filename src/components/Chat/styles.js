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
        justifyContent: 'space-between',
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
        backgroundColor: '#9a9a9a',
        fontWeight: 'bold',
        minWidth: '80%',
        maxWidth: 500,
    },
    message: {
        marginHorizontal: 15,
        marginVertical: 2,
        padding: 10,
        backgroundColor: colorText,
        borderRadius: 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        //margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
});

export default styles;