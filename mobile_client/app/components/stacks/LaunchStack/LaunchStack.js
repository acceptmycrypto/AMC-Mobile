// import * as React from "react";
// import { Button, Alert } from "react-native";
import { createStackNavigator } from 'react-navigation';
import LaunchScreen from '../../screens/LaunchScreen/LaunchScreen';
import NavStack from '../NavStack/NavStack';

export default (LaunchStack = createStackNavigator(
  {
    Launch: {
      screen: LaunchScreen
	},
    Main: {
      screen: NavStack
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
));
