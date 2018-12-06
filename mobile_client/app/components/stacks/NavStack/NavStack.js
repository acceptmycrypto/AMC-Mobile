import * as React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Venues from '../../screens/VenuesScreen/VenuesScreen'
import Deals from '../../screens/DealsScreen/DealsScreen';
import DealsInfo from '../../screens/DealsScreen/DealsInfo';
import DealsCheckout from '../../screens/DealsScreen/DealsCheckout';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import LogoTitle from './LogoTitle';

const header = {
  headerTitle: <LogoTitle />,
  headerStyle: {
    backgroundColor: '#66dac7',
  }
};

const VenuesStack = createStackNavigator(
  {
    Venues: {
      screen: Venues
    }
  },
  {
    navigationOptions: header,
    headerLayoutPreset: 'center',
  }
);

const DealsStack = createStackNavigator(
  {
    Deals: {
      screen: Deals
    },
    DealsInfo: {
      screen: DealsInfo
    },
    DealsCheckout: {
      screen: DealsCheckout,
    }
  },
  {
    navigationOptions: header,
    headerLayoutPreset: 'center'
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    navigationOptions: header,
    headerLayoutPreset: 'center'
  }
);

export default createBottomTabNavigator(
  {
    Venues: VenuesStack,
    Deals: DealsStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Venues') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Deals') {
          iconName = `${focused ? 'tag-multiple' : 'tag-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `account-box${focused ? '' : '-outline'}`;
        }
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
            style={{ backgroundColor: '#2e4158' }}
          />
        );
      }
    }),
    tabBarOptions: {
      style: {
        backgroundColor: '#2e4158',
        borderTopColor: '#40556e',
        borderTopWidth: 3
      },
      activeTintColor: '#66dac7',
      inactiveTintColor: '#fff',
      showLabel: false
    }
  }
);
