import * as React from 'react';
import {
  View,
  AsyncStorage,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  LinkingIOS,
  Alert
} from 'react-native';
import {
  _signUp,
  _login,
  _verifier,
  _loadCryptocurrencies
} from '../../../../src/services/AuthService';
import CustomMultiPicker from 'react-native-multiple-select-list';
// import Login from '../LaunchScreen/components/Login';
// import Register from '../LaunchScreen/components/Register';

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firsLaunch: null,
      id: 0,
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      cryptoOptions: {},
      cryptoProfile: []
    };
  }

  // FIRST LAUNCH AND TOKEN CHECKER
  componentWillMount() {
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
        // let token = JSON.stringify(value);
        console.log('TOKEN!!' + value);
        return _verifier(value).then(res => {
          let userData = res[0];
          let errorData = res.message;
          console.log('USER DATA!!' + userData.username);
          console.log('ERROR DATA!!' + errorData);
          if (errorData === 'Wrong Token') {
            Alert.alert('Session has expired');
          } else if (userData !== 'undefined') {
            this.setState({
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
            this.props.navigation.navigate('Search', {
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

  // LOGIN TOKEN CHECKER
  // checkLogin = event => {
  //   // event.preventDefault();
  //   let username = this.state.username;
  //   let password = this.state.password;
  //   console.log('Line 40');

  //   return _login(username, password).then(res => {
  //     console.log('LOGIN TOKEN!!' + res.token);
  //     if (res.token) {
  //       console.log(res);

  //       this.setState(
  //         {
  //           isPassingProps: true,
  //           isLoggedIn: true,
  //           id: res.result[0].id,
  //           username: res.result[0].username,
  //           email: res.result[0].email,
  //           firstname: res.result[0].firstname,
  //           lastname: res.result[0].lastname,
  //           create_date: res.result[0].create_date
  //         },
  //         function() {
  //           console.log('You are logged in');

  //           // storeData = async () => {
  //           //   try {
  //           //     await AsyncStorage.setItem("token", res.token);
  //           //   } catch (error) {
  //           //     // Error saving data
  //           //   }
  //           // }

  //           // jwt.verify(res.token, process.env.JWT_SECRET, function(err, decoded) {
  //           //   console.log("FOO!!"+decoded.foo) // bar
  //           // });

  //           AsyncStorage.removeItem('token');
  //           AsyncStorage.setItem('token', res.token);

  //           // here is the code to navigate to whatever page you want
  //           // after being logged in...
  //           // currently it's just telling you whether or not
  //           // you have logged in based on your inputs
  //           this.props.navigation.navigate('Profile', {
  //             isLoggedIn: true,
  //             _id: this.state.id,
  //             username: this.state.username,
  //             email: this.state.email,
  //             firstname: this.state.firstname,
  //             lastname: this.state.lastname,
  //             create_date: this.state.create_date
  //           });
  //         }
  //       );
  //     } else {
  //       console.log('You were not logged in');
  //       this.setState(
  //         {
  //           isLoggedIn: false
  //         },
  //         function() {
  //           this.props.navigation.navigate('Register');
  //         }
  //       );
  //     }
  //   });
  // };

  // SETS TOKEN DURING REGISTRATION
  // checkRegister = event => {
  //   // event.preventDefault();
  //   let username = this.state.username;
  //   let password = this.state.password;
  //   let email = this.state.email;
  //   return _register(username, email, password).then(res => {
  //     console.log(res);
  //     this.setState(
  //       {
  //         registered: res.bool,
  //         isPassingProps: true,
  //         isLoggedIn: true,
  //         // id: res.result[0].id,
  //         username: res.username,
  //         email: res.email
  //       },
  //       function() {
  //         console.log('You are logged in');

  //         // storeData = async () => {
  //         //   try {
  //         //     await AsyncStorage.setItem("token", res.token);
  //         //   } catch (error) {
  //         //     // Error saving data
  //         //   }
  //         // }

  //         AsyncStorage.removeItem('token');
  //         AsyncStorage.setItem('token', res.token);

  //         // here is the code to navigate to whatever page you want
  //         // after being logged in...
  //         // currently it's just telling you whether or not
  //         // you have logged in based on your inputs
  //         this.props.navigation.navigate('Profile', {
  //           isLoggedIn: true,
  //           // _id: this.state.id,
  //           username: this.state.username,
  //           email: this.state.email
  //         });
  //       }
  //     );
  //     // redirect will go here
  //   });
  // };

  handleSubmit = () => {
    console.log('SIGN UP');
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let cryptoProfile = this.state.cryptoProfile;

    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
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
          //TODO
          //prompt users to check their email
          this.props.navigation.navigate('Profile', {
            _id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            create_date: this.state.create_date
          });
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
          this.props.navigation.navigate('Search', {
            _id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            create_date: this.state.create_date
          });
          Alert.alert("You've successfully logged in");
          // redirect user to the feed/deals
        } else {
          console.log('Login error: ', res);
          if (res.error === 'user not found') {
            Alert.alert('That user does not exist, please create an account');
            this.setState({ firsLaunch: true });
          } else if (res.error === 'incorrect password ') {
            Alert.alert('Incorrect password');
          }
        }
      });
    }
  };

  render() {
    if (this.state.firsLaunch === null) {
      // DISPLAY BEFORE REGISTRATION IS SHOWN
      return null;
    } else if (this.state.firsLaunch == true) {
      // REGISTRATION PAGE
      return (
        <View style={styles.container}>
          {/* <View style={styles.flexRow}> */}
          {/* <Text
              style={{
                alignSelf: 'flex-start',
                color: '#fff',
                marginTop: 15,
                marginLeft: 40
              }}
            >
              FIRST NAME
            </Text>
            <TextInput
              style={styles.nameInput}
              placeholder="First Name"
              placeholderTextColor="#58697e"
              onChangeText={firstname => this.setState({ firstname })}
            />
            <Text
              style={{
                alignSelf: 'flex-start',
                color: '#fff',
                marginTop: 15,
                marginLeft: 40
              }}
            >
              LAST NAME
            </Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Last Name"
              placeholderTextColor="#58697e"
              onChangeText={lastname => this.setState({ lastname })}
            /> */}
          {/* </View> */}
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
          <View style={styles.selector}>
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
              scrollViewHeight={135}
              selected={[]} // list of options which are selected by default
            />
            <Text
              style={styles.selectorText}
              onPress={() => LinkingIOS.openURL('http://google.com')}
            >
              Why do I need to select cryptos?
            </Text>
          </View>
          <TouchableOpacity
            // onPress={this.checkRegister}
            onPress={this.handleSubmit}
            style={styles.createButton}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <Text style={styles.termsTop}>By creating an account you agree</Text>
          <Text style={styles.termsBottom}>to the Terms of Service</Text>
          <View style={styles.registerGap} />
          <Text
            style={styles.font25}
            onPress={() => this.setState({ firsLaunch: false })}
          >
            Already have an account?
          </Text>
        </View>
      );
    } else {
      // LOGIN PAGE
      return (
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
            placeholder="Enter your password"
            placeholderTextColor="#58697e"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity
            onPress={this.handleLogin}
            style={styles.signinButton}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Text
            style={styles.font12}
            onPress={() => LinkingIOS.openURL('http://google.com')}
          >
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
      );
    }
  }
}
