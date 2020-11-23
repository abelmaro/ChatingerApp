import * as React from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import firebaseConfig from './databse/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text} from 'react-native';
import Messages from './src/components/Messages';
import Chat from './src/components/Chat';
import ContactProfile from './src/components/ContactProfile';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
const Stack = createStackNavigator();
import { AuthContext } from './src/components/App/context'
import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/firebase-database'

const AppNavigator = () => {
    initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null
    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false
                };
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false
                };
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    userToken: null,
                };
        }
    }
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (userName, newUserToken) => {
            dispatch({ type: 'LOGIN', id: userName, token: newUserToken })
            try {
                await AsyncStorage.setItem('@storage_Key', newUserToken)
            } catch (e) {
                console.log(e)
            }
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),

    }), [])

    React.useEffect(() => {
        setTimeout(async () => {
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('@storage_Key')

            } catch (e) {
                console.log(e)
            }



            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
        }, 1000)
    }, [])

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.isLoading ?
                    <ActivityIndicator size="large" color="#FFF" />
                    : loginState.userToken ?
                    <Stack.Navigator>
                            <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }}                            />
                        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                        <Stack.Screen name="ContactProfile" component={ContactProfile} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                    </Stack.Navigator>
                        : <></>
                }
            </NavigationContainer>
        </AuthContext.Provider>

        );
}

function App() {
    return (
        <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Messages" component={Messages} options={{ headerShown: false }} />
                        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
                        <Stack.Screen name="ContactProfile" component={ContactProfile} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                    </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;