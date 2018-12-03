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
    // alignSelf: 'center'
  },
  // headerTintColor: '#fff',
  // headerTitleStyle: {
  //   alignSelf: 'center'
  // }
  gesturesEnabled: false,
  // headerLayoutPreset: 'center'
};

// const mainHeader = {
//   headerTitle: <LogoTitle />,
//   headerStyle: {
//     backgroundColor: '#66dac7',
//     // alignSelf: 'center'
//   },
//   // headerTintColor: '#fff',
//   // headerTitleStyle: {
//   //   alignSelf: 'center'
//   // }
// };

export default (LaunchStack = createStackNavigator(
  {
    Launch: {
      screen: LaunchScreen,
      navigationOptions: launchHeader,
      // headerLayoutPreset: 'center'
	},
    Main: {
      screen: NavStack,
      navigationOptions: {
        header: null
      },
      // headerLayoutPreset: 'center'
    }
  },
  {
    mode: 'modal',
    // headerMode: 'none',
    // navigationOptions: {
    //   header: null,
    //   gesturesEnabled: false
    // },
    headerLayoutPreset: 'center'
  }
));
