import React from 'react';
import {View, Text} from 'react-native';
interface UIProps {
  navigation: any;
}
const HomeScreen = (props: UIProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
};
export default HomeScreen;
