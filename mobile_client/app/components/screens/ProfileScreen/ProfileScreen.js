import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StackActions,
  NavigationActions
} from 'react-native';
import {
  _updateCryptoTable,
  _loadProfile
} from '../../../../src/services/UserProfileService';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { _verifier } from '../../../../src/services/AuthService';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: 0,
      // username: '',
      // email: '',
      // password: '',
      // firstname: '',
      // lastname: '',
      // cryptoOptions: {},
      // cryptoProfile: []
      // isLoggedIn: false,
      // isPassingProps: false
        crypto_view: "owned",
        user_info: [],
        user_crypto: [],
        add_address: false,
        qr: false,
        users_cryptos_id: null,
        current_crypto_name: null,
        friends_array: [],
        transactions: []
    };
  }

  checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // let token = JSON.stringify(value);
        console.log('TOKEN!!' + value);
        return _verifier(value).then(res => {
          let tokenStr = JSON.stringify(res.verifiedToken);
          let userData = JSON.parse(tokenStr);
          console.log('STRING RETURN!!' + tokenStr);
          console.log('PARSED RETURN!!' + userData);
          if (userData.name === 'TokenExpiredError') {
            console.log('Session has expired');
          } else {
            this.setState({
              isLoggedIn: userData.isLoggedIn,
              id: userData._id,
              username: userData.username,
              email: userData.email,
              firstname: userData.firstname,
              lastname: userData.lastname,
              create_date: userData.create_date
            });
          }
        });
      }
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }
  };

  // componentWillMount() {
  //   this.checkToken();
  // }

  // componentWillReceiveProps(){
  //   this.setState({
  // 	  isLoggedIn: true,
  // 	  isPassingProps: true
  //   })
  // }

  componentWillMount = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      return _loadProfile(value).then(res => {
        console.log(res);

        let { user_info, user_crypto, friends_array, transactions } = res;
        console.log(user_info, user_crypto, friends_array, transactions);

        this.setState({ user_info, user_crypto, friends_array, transactions });
        console.log(this.state);
      });
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }
  };

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      // this.setState({
      //   isLoggedIn: false
      // });
      this.props.navigation.navigate('Launch');
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    const { navigation } = this.props;
    // const id = navigation.getParam('_id', 'n/a');
    const username = navigation.getParam('username', 'n/a');
    // const email = navigation.getParam('email', 'n/a');
    // const firstname = navigation.getParam('firstname', 'n/a');
    // const lastname = navigation.getParam('lastname', 'n/a');
    // const create_date = navigation.getParam('create_date', 'n/a');
    // const status = navigation.getParam('isLoggedIn', 'n/a');

    return (
      <View style={styles.container}>
        {/* <View style={styles.selector}>
          <CustomMultiPicker
            options={this.state.cryptoOptions}
            search={true} // should show search bar?
            multiple={true} //
            placeholder={'Search'}
            placeholderTextColor={'#58697e'}
            returnValue={'value'} // label or value
            callback={res => {
              this.setState({
                cryptoProfile: res
              });
            }} // callback, array of selected items
            rowBackgroundColor={'#2e4158'}
            rowHeight={41}
            // rowRadius={5}
            iconColor={'#66dac7'}
            iconSize={30}
            selectedIconName={'md-checkmark-circle-outline'}
            unselectedIconName={'ios-radio-button-off-outline'}
            scrollViewHeight={135}
            selected={[]} // list of options which are selected by default
          />
          <Text
            style={styles.selectorText}
            onPress={() => LinkingIOS.openURL('http://google.com')}
          >
            Why do I need to select cryptos?
          </Text>
        </View> */}
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
