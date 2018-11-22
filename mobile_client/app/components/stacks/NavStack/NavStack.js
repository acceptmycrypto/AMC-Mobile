import * as React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
<<<<<<< HEAD
import Post from '../../screens/Post/Post';
import PostInfo from '../../screens/Post/PostInfo';
import AddPost from '../../screens/Post/AddPost';
=======
import Venues from '../../screens/VenuesScreen/VenuesScreen'
import Deals from '../../screens/DealsScreen/DealsScreen';
import DealsInfo from '../../screens/DealsScreen/DealsInfo';
import AddPost from '../../screens/DealsScreen/AddPost';
>>>>>>> e932b9521e02a92ff1e15a5cb0fee4e00ab93fd4
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import LogoTitle from './LogoTitle';

const header = {
  headerTitle: <LogoTitle />,
  headerStyle: {
<<<<<<< HEAD
    backgroundColor: '#66dac7'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    justifyContent: 'center'
  }
};

const PostStack = createStackNavigator(
=======
    backgroundColor: '#66dac7',
    // alignSelf: 'center'
  },
  // headerTintColor: '#fff',
  // headerTitleStyle: {
  //   alignSelf: 'center'
  // }
};

const VenuesStack = createStackNavigator(
  {
    Venues: {
      screen: Venues
    }
  },
  {
    navigationOptions: header,
    headerLayoutPreset: 'center'
  }
);

const DealsStack = createStackNavigator(
>>>>>>> e932b9521e02a92ff1e15a5cb0fee4e00ab93fd4
  {
    Deals: {
      screen: Deals
    },
    DealsInfo: {
      screen: DealsInfo
    },
    AddPost: {
      screen: AddPost
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
<<<<<<< HEAD
    navigationOptions: header
=======
    navigationOptions: header,
    headerLayoutPreset: 'center'
>>>>>>> e932b9521e02a92ff1e15a5cb0fee4e00ab93fd4
  }
);

export default createBottomTabNavigator(
  {
<<<<<<< HEAD
    Search: PostStack,
=======
    Venues: VenuesStack,
    Deals: DealsStack,
>>>>>>> e932b9521e02a92ff1e15a5cb0fee4e00ab93fd4
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
<<<<<<< HEAD
        if (routeName === 'Search') {
          iconName = `home${focused ? '' : '-outline'}`;
=======
        if (routeName === 'Venues') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Deals') {
          iconName = `${focused ? 'tag-multiple' : 'tag-outline'}`;
>>>>>>> e932b9521e02a92ff1e15a5cb0fee4e00ab93fd4
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
        backgroundColor: '#2e4158'
      },
      activeTintColor: '#66dac7',
      inactiveTintColor: '#fff',
      showLabel: false
    }
  }
);
