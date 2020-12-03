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
        backgroundColor: main.bgWhite,
        elevation: 7
    },
    appText: {
        fontSize: 25,
        color: main.bgHeaderColor,
        fontFamily: main.fFamily 
    },
    principal: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: main.bgWhite, 
        overflow: 'hidden',
        paddingBottom: 5
    },
    container: {
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderBottomColor: 'gray',
        backgroundColor: main.bgWhite,
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
        color: main.bgHeaderColor,
    },
    titleItem: {
        fontFamily: main.fFamily,
        fontWeight: '900',
        fontSize: 18
    },
    subtitleItem: {
        fontFamily: main.fFamily,
        fontSize: 16
    },
    icon: {
        color: main.bgHeaderColor,
    },
});

export default styles;