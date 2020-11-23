import * as React from 'react';
import firebaseConfig from './databse/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Messages from './src/components/Messages';
import Chat from './src/components/Chat';
import ContactProfile from './src/components/ContactProfile';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
const Stack = createStackNavigator();
import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/firebase-database'

//const isSignedIn = () => {
//    firebase.auth().onAuthStateChanged(user => {
//        if (user) {
//            current = user;
//            return true;
//        }
//        else {
//            console.log("Not logged");
//            return false;
//        }
//    });
//}

function App() {
    return (
        <NavigationContainer>
            {
                <Stack.Navigator>
                    <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
                    <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                    <Stack.Screen name="ContactProfile" component={ContactProfile} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
        </NavigationContainer >
    );
}

export default App;