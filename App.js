import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Messages from './src/components/Messages';
import Chat from './src/components/Chat';
import ContactProfile from './src/components/ContactProfile';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Profile from './src/components/Profile';
import MenuLateral from './src/components/MenuLateral';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import * as firebase from 'firebase';
//import firebaseConfig from './databse/firebase';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    const handleDrawerBack = () => { }
    return (
        <DrawerContentScrollView {...props}>
            <MenuLateral handleDrawerBack={handleDrawerBack()} />
        </DrawerContentScrollView>
    );
}

var firebaseConfig = {
    apiKey: "AIzaSyBlK9ZsEyErji_dlYZ8JKucGGv-7mw-o3A",
    authDomain: "chatinger-14f9a.firebaseapp.com",
    databaseURL: "https://chatinger-14f9a.firebaseio.com",
    projectId: "chatinger-14f9a",
    storageBucket: "chatinger-14f9a.appspot.com",
    messagingSenderId: "773422714266",
    appId: "1:773422714266:web:d2a2d1c6f252a2f02e3e23",
    measurementId: "G-ZVGBZ5M3JY"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function DrawerNavigator({ navigation }) {
    return (
        <Drawer.Navigator
            drawerType='slide'
            overlayColor='transparent'
            nitialRouteName="Home"
            drawerContent={CustomDrawerContent}
            options={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Messages" component={Messages}
                options={{
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="MenuLateral" component={MenuLateral} />
        </Drawer.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Messages" component={DrawerNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="ContactProfile" component={ContactProfile} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}   

export default App;