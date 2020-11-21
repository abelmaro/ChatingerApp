import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Messages from './src/components/Messages';

function ContacsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Contacs</Text>
        </View>
    );
}
const Stack = createStackNavigator();

function App() {
    return (
        
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
                <Stack.Screen name="Contacs" component={ContacsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;