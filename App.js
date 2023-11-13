import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/Home';
import ChoseDrink from './Screen/ChoseDrink';
import Success from './Screen/Success';

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen name='Home'
                    component={Home}
                    options={{ title: "Shop near me" }} />
                <Stack.Screen name='ChoseDrink'
                    component={ChoseDrink}
                    options={{ title: "Drinks" }} />
                    <Stack.Screen name='Success'
                    component={Success}
                    options={{ title: "My orders" }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}