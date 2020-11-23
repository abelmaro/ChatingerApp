import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TabView, TabBar } from 'react-native-tab-view'
import { View, Dimensions, TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const Tabs = props => {
    const navigation = useNavigation();
    return (
        <View style={styles.scene}>
            {
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Messages')}>

                    </TouchableOpacity>
                </View>
            }))
        </View>
    )
}

const initialLayout = { width: Dimensions.get('window').width };

const TabOptions = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Message', title: 'Message' }
    ]);

    const renderScene = ({ route }) => {
        return <Tabs text={'pepe'} />
    };

    const renderTabBar = props => (

        <TabBar
            {...props}
            indicatorStyle={styles.tabBarText}
            style={styles.tabBarBackground}
            tabStyle={{ width: 120 }}
            labelStyle={styles.posibleStatus}
            inactiveColor='#B1B5BE'
            activeColor='#008B47'
            scrollEnabled={true}
            getLabelText={({ route }) => route.title}
            tabStyle={{ width: 'auto' }}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={styles.base}
            renderTabBar={renderTabBar}
        />
    );
}

export default TabOptions;