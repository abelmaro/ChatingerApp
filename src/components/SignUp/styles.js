import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        backgroundColor: main.bgColor,
        justifyContent: 'space-evenly',
    },
    welcome: {
        color: main.bgHeaderColor,
        fontWeight: 'bold',
        fontSize: 50,
        fontFamily: main.fFamily
    },
    input: {
        height: 40,
        width: 250,
        margin: 10,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: main.bgHeaderColor,
        fontSize: 15,
        color: 'black'
    },
    btnLogin: {
        padding: 10,
        paddingHorizontal: 80,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        fontWeight: 'bold',
    },
    btnRegister: {
        padding: 10,
        paddingHorizontal: 80,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        fontWeight: 'bold',
    },
    error: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
});

export default styles;