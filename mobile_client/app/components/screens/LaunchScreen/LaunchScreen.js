import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Button
} from 'react-native';
import { WebBrowser,  } from 'expo';
import {
  _signUp,
  _login,
  _verifier,
  _loadCryptocurrencies
} from '../../../../src/services/AuthService';
import NavStack from '../../stacks/NavStack/NavStack';
import _SplashScreen from './SplashScreen';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { CheckBox } from 'react-native-elements';
// import Login from '../LaunchScreen/components/Login';
// import Register from '../LaunchScreen/components/Register';

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
    this.state = {
      isLoading: true,
      firsLaunch: null,
      rememberMe: false,
      // isLoggedIn: false,
      id: 0,
      username: '',
      email: 'audiopunk252@yahoo.com',
      password: 'taylora',
      firstname: '',
      lastname: '',
      cryptoOptions: {},
      cryptoProfile: []
    };
  }

    //   // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {
    //   const userToken = await AsyncStorage.getItem('token');
  
    //   // This will switch to the App screen or Auth screen and this loading
    //   // screen will be unmounted and thrown away.
    //   this.props.navigation.navigate(userToken ? 'Deals' : 'Launch');
    // };

  // FIRST LAUNCH AND TOKEN CHECKER
  componentWillMount = async () => {
    // const userToken = await AsyncStorage.getItem('token');
    // this.props.navigation.navigate(userToken ? 'Deals' : 'Launch');

    AsyncStorage.getItem('beenLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('beenLaunched', 'true');
        this.setState({ firsLaunch: true });
      } else {
        this.setState({ firsLaunch: false });
        this.checkToken();
      }
    });
  }

  // TOKEN VERIFIER
  checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log('TOKEN!!' + value);
        return _verifier(value).then(res => {
          let userData = res[0];
          let errorData = res.message;
          console.log('USER DATA!!' + userData.username);
          console.log('ERROR DATA!!' + errorData);
          if (errorData === 'Wrong Token') {
            // this.setState({ isLoggedIn: false });
            Alert.alert('Session has expired');
          } else if (userData !== 'undefined') {
            this.setState({
              // isLoggedIn: true,
              _id: userData.id,
              user_name: userData.username,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              bio: userData.bio,
              photo: userData.photo,
              user_location: userData.user_location,
              birthday: userData.birthday
            });
            this.props.navigation.navigate('Deals', {
              _id: this.state._id,
              user_name: this.state.user_name,
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              email: this.state.email,
              bio: this.state.bio,
              photo: this.state.photo,
              user_location: this.state.user_location,
              birthday: this.state.birthday
            });
          }
        });
      }
    } catch (error) {
      // this.setState({ isLoggedIn: false });
      console.log('NO TOKEN!!!' + error);
    }
  };

  // LOADS AVAILABLE CRYPTOCURRENCIES
  componentDidMount() {
    return _loadCryptocurrencies().then(cryptos => {
      let cryptoOptions = {};

      cryptos.map(crypto => {
        let value = crypto.crypto_metadata_name;
        let label =
          crypto.crypto_metadata_name + ' ' + '(' + crypto.crypto_symbol + ')';
        cryptoOptions[value] = label;
      });
      console.log(cryptoOptions);
      this.setState({ cryptoOptions });
    });
  }

  handleRegister = () => {
    console.log('SIGN UP');
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let cryptoProfile = this.state.cryptoProfile;

    if (!username || !email || !password) {
      Alert.alert('Please enter in the required field');
    } else {
      return _signUp(username, email, password, cryptoProfile).then(res => {
        console.log('message sent from server if success: ', res);
        console.log('LINE 246 ' + res);
        if (res.error === 'User already exists') {
          Alert.alert('User already exists');
        } else if (res.error === 'you need a password') {
          Alert.alert('You need a password');
        } else if (res.error === 'password length must be greater than 5') {
          Alert.alert('Your password must be greater than 5 characters');
        } else if (res.error) {
          // For unhandled errors
          console.log(res.error);
        } else {
          // Alert.alert(
          //   'External URL',
          //   'Do you want to open this URL in your browser?',
          //   [
          //     { text: 'Cancel', style: 'cancel' },
          //     {
          //       text: 'OK',
          //       onPress: () => Linking.openURL('mailto:')
          //     }
          //   ],
          //   { cancelable: false }
          // );
          Alert.alert('Please verify your email and log in');
          this.setState({ firsLaunch: false });
        }
      });
    }
  };

  handleLogin = () => {
    let email = this.state.email;
    let password = this.state.password;
    console.log(email, password);

    if (!email && !password) {
      Alert.alert('Please enter your credentials');
    } else if (!email) {
      Alert.alert('Please enter your email');
    } else if (!password) {
      Alert.alert('Please enter your password');
    } else {
      return _login(email, password).then(res => {
        if (res.token) {
          AsyncStorage.setItem('token', res.token);
          console.log(res.token);
          this.props.navigation.navigate('Deals', {
            _id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            create_date: this.state.create_date
          });
        } else {
          console.log('Login error: ', res);
          if (res.error === 'user not found') {
            Alert.alert('That user does not exist');
          } else if (res.error === 'incorrect password ') {
            Alert.alert('Incorrect password');
          }
        }
      });
    }
  };

  // passwordLink = () => {
  //   Alert.alert(
  //     'External URL',
  //     'Do you want to open this URL in your browser?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'OK',
  //         onPress: () => Linking.openURL('https://www.acceptmycrypto.com/')
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  // cryptosLink = () => {
  //   Alert.alert(
  //     'External URL',
  //     'Do you want to open this URL in your browser?',
  //     [
  //       { text: 'Cancel', style: 'cancel' },
  //       {
  //         text: 'OK',
  //         onPress: () => Linking.openURL('https://www.acceptmycrypto.com/')
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  handlePasswordLink = () => {
    WebBrowser.openBrowserAsync('https://www.acceptmycrypto.com/');
  };

  handleCryptosLink = () => {
    WebBrowser.openBrowserAsync('https://www.acceptmycrypto.com/');
  };

  render() {
    // const isLoggedIn = this.state.isLoggedIn;

    // if (this.state.isLoggedIn === true) {
    //   // return <NavStack />;
    // } else {
    if (this.state.firsLaunch === null) {
      // DISPLAY BEFORE REGISTRATION IS SHOWN
      return null;
    } else if (this.state.firsLaunch == true) {
      // REGISTRATION PAGE
      return (
        // <View style={styles.container}>
        //   {isLoggedIn ? (
        //     <_SplashScreen />
        //   ) : (
        <View style={styles.container}>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 45,
              marginLeft: 40
            }}
          >
            USER NAME
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Enter your desired User Name"
            placeholderTextColor="#58697e"
            onChangeText={username => this.setState({ username })}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 40
            }}
          >
            E-MAIL ADDRESS
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Enter your email"
            placeholderTextColor="#58697e"
            autoCapitalize="none"
            secureTextEntry={false}
            onChangeText={email => this.setState({ email })}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 40
            }}
          >
            PASSWORD
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Enter your password"
            placeholderTextColor="#58697e"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 40
            }}
          >
            YOUR CRYPTOCURRENCY PORTFOLIO
          </Text>
          <KeyboardAvoidingView style={styles.selector} behavior="padding">
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
              rowBackgroundColor={'#66dac7'}
              rowHeight={41}
              rowRadius={10}
              iconColor={'black'}
              iconSize={30}
              selectedIconName={'md-checkmark-circle-outline'}
              unselectedIconName={'ios-radio-button-off-outline'}
              scrollViewHeight={193}
              selected={[]} // list of options which are selected by default
            />
            <Text style={styles.selectorText} onPress={this.handleCryptosLink}>
              Why do I need to select cryptos?
            </Text>
          </KeyboardAvoidingView>
          <TouchableOpacity
            onPress={this.handleRegister}
            style={styles.createButton}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <Text style={styles.termsTop}>By creating an account you agree</Text>
          <Text style={styles.termsBottom}>to the Terms of Service</Text>
          <View style={styles.registerGap} />
          <Text
            style={{ fontSize: 25, marginBottom: 20 }}
            onPress={() => this.setState({ firsLaunch: false })}
          >
            Already have an account?
          </Text>
        </View>
        //   )}
        // </View>
      );
    } else {
      // LOGIN PAGE
      return (
        // <View style={styles.container}>
        //   {isLoggedIn ? (
        //     <_SplashScreen />
        //   ) : (
        <View style={styles.container}>
          <View
            style={{
              flex: 0.3,
              marginTop: -40,
              backgroundColor: '#66dac7',
              justifyContent: 'center'
            }}
          >
            <Image
              source={require('../../../assets/images/login_logo.png')}
              style={styles.logo}
            />
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 40
            }}
          >
            E-MAIL ADDRESS
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Enter your email"
            placeholderTextColor="#58697e"
            value={this.state.email}
            autoCapitalize="none"
            secureTextEntry={false}
            onChangeText={email => this.setState({ email })}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 40
            }}
          >
            PASSWORD
          </Text>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Enter your password"
            placeholderTextColor="#58697e"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />

          {/* <CheckBox
            center={false}
            containerStyle={{ justifyContent: 'flex-start', backgroundColor: '#2e4158' }}
            title='Remember Me'
            checked={this.state.rememberMe}
          /> */}

          <TouchableOpacity
            onPress={this.handleLogin}
            style={styles.signinButton}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          {/* <Button
              onPress={() => Linking.openURL('mailto:support@example.com')}
              title="support@example.com"
            /> */}

          <Text style={styles.font12} onPress={this.handlePasswordLink}>
            Forgot Password?
          </Text>
          <View style={styles.loginGap} />
          <Text
            style={styles.font25}
            onPress={() => this.setState({ firsLaunch: true })}
          >
            Don't have an account?
          </Text>
        </View>
        //   )}
        // </View>
      );
    }
    // }
  }
}
