import React from 'react';
import {View, Text} from 'react-native';
interface UIProps {
  navigation: any;
}
const SettingScreen = (props: UIProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Setting!</Text>
    </View>
  );
};
export default SettingScreen;
