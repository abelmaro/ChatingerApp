import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const colorText = '#d3e0d5';
const fFamily = 'Roboto';
const bgColor = '#262d31';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        backgroundColor: bgColor,
        justifyContent: 'space-evenly'
    },
    welcome: {
        color: colorText,
        fontWeight: 'bold',
        fontSize: 50,
        //bottom: 100
    },
    input: {
        height: 40,
        width: 250,
        margin: 10,
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        fontFamily: 'Gotham-Bold',
        fontSize: 15,
        color: 'white'
    },
    btnEntrar: {
        padding: 10,
        paddingHorizontal: 80,
        backgroundColor: '#fff',
        marginTop: 40,
        borderRadius: 10,
        fontWeight: 'bold',
    },
});

export default styles;