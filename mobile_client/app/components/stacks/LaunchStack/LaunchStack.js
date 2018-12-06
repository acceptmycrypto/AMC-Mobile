import * as React from "react";
// import { Button, Alert } from "react-native";
import { createStackNavigator } from 'react-navigation';
import LaunchScreen from '../../screens/LaunchScreen/LaunchScreen';
import NavStack from '../NavStack/NavStack';
import LaunchTitle from './LaunchTitle';
import LogoTitle from '../NavStack/LogoTitle';

const launchHeader = {
  headerTitle: <LaunchTitle />,
  headerStyle: {
    backgroundColor: '#66dac7',
    height: 130
  }
};

export default (LaunchStack = createStackNavigator(
  {
    Launch: {
      screen: LaunchScreen,
      navigationOptions: launchHeader,
	},
    Main: {
      screen: NavStack,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }
  },
  {
    mode: 'modal',
    headerLayoutPreset: 'center'
  }
));
