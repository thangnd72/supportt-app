import {IconImage} from 'assets';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Button, Label, Layout} from 'components';
import React, {useRef} from 'react';
import {Dimensions, Image, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
// import {sizes} from '@utils/sizes';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGhhbmduZDk5IiwiYSI6ImNrdmM0bGMyOTJzNmEycmx1M3diMnJ0ZzYifQ.zoFzmEVC2aGkZv_vwaG9DQ',
);
interface UIProps {
  navigation: any;
}
const HomeScreen = (props: UIProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  const renderContent = () => (
    <Layout
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 16,
        width: '100%',
        height: '100%',
      }}>
      <Label h3 paddingVertical={10} color="#595959">
        {'Hỗ trợ mùa dịch'.toUpperCase()}
      </Label>
      <Layout horizontal flex between>
        <Button
          activeOpacity={0.9}
          flex
          height={150}
          color="#EEE"
          middle
          centered
          borderRadius={10}
          marginRight={8}>
          <Image source={IconImage.sos} style={{width: 80, height: 80}} />
          <Label h4 marginTop={10} color="#595959">
            Gửi yêu cầu hỗ trợ
          </Label>
        </Button>
        <Button
          activeOpacity={0.9}
          flex
          height={150}
          color="#EEE"
          middle
          centered
          marginLeft={8}
          borderRadius={10}>
          <Image
            source={IconImage.global_sos}
            style={{width: 80, height: 80}}
          />
          <Label h4 marginTop={10} color="#595959">
            Giúp đỡ quanh đây
          </Label>
        </Button>
      </Layout>
    </Layout>
  );

  const bottomSheetHeader = () => {
    return (
      <Layout
        style={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        height={30}
        color="#FFF"
        middle
        centered>
        <Button
          borderRadius={50}
          height={7}
          width={50}
          color="#65DF7F"
          onPress={() => bottomSheetRef.current!.snapTo(0)}
        />
      </Layout>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      <MapboxGL.MapView style={{flex: 1}} styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.UserLocation />
        <MapboxGL.Camera
          followZoomLevel={15}
          followUserLocation
          animationMode="flyTo"
        />
        {/* <MapboxGL.PointAnnotation id="1" coordinate={coordinates} /> */}
      </MapboxGL.MapView>

      <BottomSheet
        ref={bottomSheetRef}
        enabledContentTapInteraction={false}
        enabledInnerScrolling={true}
        enabledContentGestureInteraction={false}
        snapPoints={[height * 0.5, 30, 30]}
        renderContent={renderContent}
        renderHeader={bottomSheetHeader}
      />
    </Layout>
  );
};
export default HomeScreen;
