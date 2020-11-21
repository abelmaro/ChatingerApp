import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const colorText = '#d3e0d5';
const fFamily = 'Roboto';
const bgColor = '#262d31';

const styles = StyleSheet.create({
    appWelcome: {
        padding: 15,
        backgroundColor: 'gray'
    },
    appText: {
        fontSize: 25,
        color: colorText,
        fontWeight: 'bold',
        fontFamily: fFamily 
    },
    principal: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: bgColor
    },
    container: {
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderBottomColor: 'gray',
        backgroundColor: bgColor,
        justifyContent: 'space-between',
    },
    flowInfo: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    test: {
        width: 100,
        display: 'flex',
        alignItems: 'flex-start',
    },
    text: {
        color: colorText
    }
});

export default styles;