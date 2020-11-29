import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions } from 'react-native';
import main from '../../utils/mainCss/main';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        backgroundColor: main.bgColor,
        display: 'flex',
        alignItems: 'center',
    },
    colorPickerContainer: {
        position: "absolute",
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
    dropDownContainer: {
        position: "absolute",
        display: "flex",
        minWidth: Dimensions.get('window').width,
        padding: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        maxHeight: 300
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: main.fFamily,
    },
    titleItem: {
        fontFamily: main.fFamily,
    },
});

export default styles;