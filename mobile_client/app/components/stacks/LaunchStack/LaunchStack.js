import * as React from "react";
import { createStackNavigator } from 'react-navigation';
import LaunchScreen from '../../screens/LaunchScreen/LaunchScreen';
import NavStack from '../NavStack/NavStack';
import LaunchTitle from './LaunchTitle';

const launchHeader = {
  headerTitle: <LaunchTitle />,
  headerStyle: {
    backgroundColor: '#66dac7',
    height: 130
  }
};

export default (LaunchStack = createStackNavigator(
  {
  //   Launch: {
  //     screen: LaunchScreen,
  //     navigationOptions: launchHeader,
	// },
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
