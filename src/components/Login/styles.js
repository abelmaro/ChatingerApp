import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-evenly',
        zIndex: 10,
    },
    welcome: {
        color: main.bgWhite,
        fontSize: 50,
        fontFamily: main.fFamily
    },
    input: {
        height: 50,
        width: 250,
        margin: 10,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: main.bgWhite,
        fontSize: 20,
        color: main.bgWhite,
        fontFamily: main.fFamily,
    },
    btnNext: {
        padding: 15,
        paddingHorizontal: 80,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        fontFamily: main.fFamily,
        elevation: 10
    },
    
});

export default styles;