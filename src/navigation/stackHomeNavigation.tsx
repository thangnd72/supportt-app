import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/HomeScreen';
import { RouteName } from "../constant";
import { OPTS_COMMON } from './navigationConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';


const Stack = createStackNavigator();
type Props = {};

export const HomeStackContainer = (props: Props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...OPTS_COMMON
            }}>
            <Stack.Screen
                name={RouteName.HOME}
                component={HomeScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Home',
                }}
            />
        </Stack.Navigator>
    );
}