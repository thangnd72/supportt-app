import React, { useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { ApplicationState } from "store/configureAction";
import { HomeStackContainer } from "navigation/stackHomeNavigation";
import { SettingStackContainer } from "navigation/stackSettingNavigation";
import { TabContainer } from "navigation/bottomTabsNavigation";
import { AuthStack } from "navigation/authStackNavigation";

interface State {
  isLoggedIn: boolean;
}
type UIProps = State;
const SwitchScreen = (props: UIProps) => {
  return (
    <>
      <StatusBar
        backgroundColor={"transparent"}
        barStyle={'light-content'}
        translucent
      />
      <View style={{ flex: 1 }}>
        {props.isLoggedIn ? <TabContainer /> : <AuthStack />}
      </View>
    </>
  );
};
const mapStateToProps = (state: ApplicationState) => ({
  isLoggedIn: state.AuthenticateState.isLoggedIn,
});
const mapDispatchToProps = {};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SwitchScreen as any);
