import * as React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Post from '../../screens/Post/Post';
import PostInfo from '../../screens/Post/PostInfo';
import AddPost from '../../screens/Post/AddPost';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import LogoTitle from './LogoTitle';

const header = {
  headerTitle: <LogoTitle />,
  headerStyle: {
    backgroundColor: '#66dac7'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    justifyContent: 'center'
  }
};

const PostStack = createStackNavigator(
  {
    Search: {
      screen: Post
    },
    PostInfo: {
      screen: PostInfo
    },
    AddPost: {
      screen: AddPost
    }
  },
  {
    navigationOptions: header
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    navigationOptions: header
  }
);

export default createBottomTabNavigator(
  {
    Search: PostStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Search') {
          iconName = `home${focused ? '' : '-outline'}`;
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
