import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    purchase: {
        backgroundColor: 'white',
        borderRadius: 11,
        marginHorizontal: 30,
        marginVertical: 15,
        padding: 15,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'center',

    },
    statusPending: {
        width: 100,

        fontWeight: 'bold',
        color: '#C72141',
    },
    amount: {
        width: 300,
        paddingLeft: 100,

        justifyContent: "space-between",
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: '#008B47',
        backgroundColor: 'red'
    },
    tabBarBackground: {
        backgroundColor: '#FAFAFA',
        color: '#008B47',
        elevation: 0,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18
    },
    tabBarText: {
        backgroundColor: '#008B47',
        justifyContent: 'center',
        height: 3
    },
    posibleStatus: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    regularText: {
        flex: 1,
        backgroundColor: 'blue',
        color: '#353D4A',
        fontWeight: 'bold',
        fontSize: 13,

    },
    regularText2: {
        flex: 1,
        backgroundColor: 'red',
        color: '#353D4A',
        fontWeight: 'bold',
        fontSize: 13,
    },
    purchaseDetails: {
        width: 150,
        backgroundColor: 'green',
        height: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    textSection: {
        width: 220,
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        flexDirection: "row",
        height: 100,

    },
    smallerData: {
        width: 200,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'red',
        marginLeft: 70
    }
});

export default styles;
