import React from 'react';
import {View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Layout, Label} from 'components';
import styled from 'styled-components/native';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGhhbmduZDk5IiwiYSI6ImNrdmM0bGMyOTJzNmEycmx1M3diMnJ0ZzYifQ.zoFzmEVC2aGkZv_vwaG9DQ',
);
interface UIProps {
  navigation: any;
}
const HomeScreen = (props: UIProps) => {
  return (
    <Layout style={{flex: 1}}>
      <MapboxGL.MapView style={{flex: 1}} />
    </Layout>
  );
};
export default HomeScreen;
