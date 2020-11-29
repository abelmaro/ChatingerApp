import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        flex: 1,
        backgroundColor: main.bgColor,
        display: 'flex',
        alignItems: 'center',
        padding: 40
    },
    userPhoto: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 5
    },
    userName: {
        color: main.colorText,
        fontSize: 30
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    userInfo: {
        color: main.colorText
    },
});

export default styles;