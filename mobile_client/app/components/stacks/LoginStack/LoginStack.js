import { createStackNavigator } from 'react-navigation';
import Login from '../../screens/LaunchScreen/components/Login';
import Register from '../../screens/LaunchScreen/components/Register';

export default (LoginStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
}));
