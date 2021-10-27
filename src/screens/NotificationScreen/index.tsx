import React from 'react';
import {View, Text} from 'react-native';
interface UIProps {
  navigation: any;
}
const NotificationScreen = (props: UIProps) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notification!</Text>
    </View>
  );
};
export default NotificationScreen;
