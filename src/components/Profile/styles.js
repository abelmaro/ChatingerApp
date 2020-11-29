import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const colorText = '#d3e0d5';
const fFamily = 'Roboto';
const bgColor = '#262d31';

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
    },
    colorPickerContainer: {
        position: "absolute",
    },
    userPhoto: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 5,
    },
    userName: {
        color: colorText,
        fontSize: 30
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    userInfo: {
        color: colorText
    },
    listItem: {
        display: 'flex',
    },
    itemList: {
        marginVertical: 2,
    },
    dropDownContainer: {
        position: "absolute",
        display: "flex",
        minWidth: 360,
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
        marginTop: 10,
    },
    modalView: {
        //margin: 20,
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
        fontSize: 20
    },
});

export default styles;