import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: main.bgColor,
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
        color: main.colorText,
        fontFamily: main.fFamily,
        fontSize: 25,
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
        color: main.colorText,
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
        borderRadius: 100,
    },
    textMessage: {
        fontWeight: 'bold',
        fontFamily: main.fFamily,
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