import React, {useState} from 'react';
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
  // the longitude comes first before the latitude
  const [coordinates] = useState([105.8066925, 15.9030623]);
  return (
    <Layout style={{flex: 1}}>
      <MapboxGL.MapView
        style={{flex: 1}}
        styleURL={MapboxGL.StyleURL.Street}
        >
        <MapboxGL.UserLocation />
        <MapboxGL.Camera followZoomLevel={15} followUserLocation animationMode='flyTo' />
        {/* <MapboxGL.PointAnnotation id="1" coordinate={coordinates} /> */}
      </MapboxGL.MapView>
      {/* <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={16}
        centerCoordinate={[105.8066925, 15.9030623]}
        showUserLocation={true}
        style={{flex: 1}}>
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={[105.8066925, 15.9030623]}></MapboxGL.Camera>
        <MapboxGL.PointAnnotation id="1" coordinate={coordinates} />
      </MapboxGL.MapView> */}
    </Layout>
  );
};
export default HomeScreen;
