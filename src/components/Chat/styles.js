import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight() / 2,
        flex: 1,
        backgroundColor: main.bgColor,
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: main.bgWhite,
        padding: 10,
        marginBottom: 10,

        elevation: 5,
    },
    userPhoto: {
        width: 60,
        height: 60,
        borderRadius: 500,
    },
    text: {
        color: main.colorText,
        fontFamily: main.fFamily,
        fontSize: 25,
        color: main.bgHeaderColor
    },
    icon: {
        borderRadius: 100,
        borderColor: main.bgHeaderColor,
        color: main.bgHeaderColor,
        padding: 5,
        borderWidth: 1
    },
    sendSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: main.bgWhite,
        opacity: 0.8,
        padding: 10,
        elevation: 5
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
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
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