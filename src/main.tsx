import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import SwitchScreen from 'screens/SwitchScreen';
import store from 'store/configureStore';
// import SplashScreen from 'react-native-splash-screen'
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};
enableScreens();
const AppLayout = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // })

  return (
    <Provider store={store}>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }} />
    <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent /> */}
      <NavigationContainer theme={navTheme}>
        <SwitchScreen />
      </NavigationContainer>
    </Provider>
  );
};
let App = AppLayout;
export default App;
