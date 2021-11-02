import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeLayout from 'screens/SettingScreen';
import {RouteName} from '../constant';
import {OPTS_COMMON} from './navigationConfig';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';

const Stack = createStackNavigator();
type Props = {};

export const SettingStackContainer = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...OPTS_COMMON,
      }}>
      <Stack.Screen
        name={RouteName.SETTING}
        component={HomeLayout}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
