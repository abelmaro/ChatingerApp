import { StyleSheet } from 'react-native';

const colorText = '#d3e0d5';
const fFamily = 'Roboto';
const bgColor = '#262d31';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        padding: 25
    },
    closebttn: {
        marginBottom: 60,
    },
    title: {
        fontSize: 20,
        color: '#353D4A',
        fontWeight: '500',
    },
    subcontainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    textNombre: {
        fontSize: 30,
        color: '#353D4A',
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    textNumero: {
        fontSize: 14,
        color: '#353D4A',
        fontWeight: '500'
    },
    horizontalLine: {
        borderBottomColor: '#E7E9EB',
        borderBottomWidth: 1,
        marginRight: 80
    },
    menuButtons: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: bgColor,
        marginTop: 1,
        marginHorizontal: -20
    },
    cerrarSesionText: {
        color: 'white'
    }
});

export default styles;
