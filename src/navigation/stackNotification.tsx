import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from 'screens/NotificationScreen';
import { RouteName } from "../constant";
import { OPTS_COMMON } from './navigationConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';


const Stack = createStackNavigator();
type Props = {};

export const NotificationStackContainer = (props: Props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                ...OPTS_COMMON
            }}>
            <Stack.Screen
                name={RouteName.NOTIFICATION}
                component={NotificationScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Notification',
                }}
            />
        </Stack.Navigator>
    );
}