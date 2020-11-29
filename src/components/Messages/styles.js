import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    appWelcome: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'gray'
    },
    appText: {
        fontSize: 25,
        color: main.colorText,
        fontFamily: main.fFamily 
    },
    principal: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: main.bgColor
    },
    container: {
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderBottomColor: 'gray',
        backgroundColor: main.bgColor,
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
        color: main.colorText
    },
    titleItem: {
        fontFamily: main.fFamily,
    },
});

export default styles;