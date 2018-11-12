import * as React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  Item,
  Label,
  Picker,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
  LinkingIOS,
  Font
} from 'react-native';
import fontAwesome from '@expo/vector-icons/FontAwesome';
import { _signUp, _login } from '../../../../src/AuthentificationService';
// import Login from '../LaunchScreen/components/Login';
// import Register from '../LaunchScreen/components/Register';
import { Dropdown } from 'react-native-material-dropdown';

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firsLaunch: null,
      fontLoaded: false,
      id: 0,
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      isLoggedIn: null,
      availableCryptos: [
        {
          value: 'Bitcoin'
        },
        {
          value: 'Ethereum'
        },
        {
          value: 'Ripple'
        }
      ]
    };
  }

  // // FONT LOADER
  // async componentDidMount() {
  //   await Font.loadAsync({
  //     'fontAwesome': require('@expo/vector-icons/fonts/FontAwesome.ttf'),
  //   });
  //   this.setState({ fontLoaded: true });
  // }

  // FIRST LAUNCH CHECKER
  componentWillMount() {
    AsyncStorage.getItem('beenLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('beenLaunched', 'true');
        this.setState({ firsLaunch: true });
      } else {
        this.setState({ firsLaunch: false });
      }
    });
  }

  // LOGIN TOKEN CHECKER
  checkLogin = event => {
    // event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    console.log('Line 46');

    return _login(username, password).then(res => {
      console.log('LOGIN TOKEN!!' + res.token);
      if (res.token) {
        console.log(res);

        this.setState(
          {
            isPassingProps: true,
            isLoggedIn: true,
            id: res.result[0].id,
            username: res.result[0].username,
            email: res.result[0].email,
            firstname: res.result[0].firstname,
            lastname: res.result[0].lastname,
            create_date: res.result[0].create_date
          },
          function() {
            console.log('You are logged in');

            // storeData = async () => {
            //   try {
            //     await AsyncStorage.setItem("token", res.token);
            //   } catch (error) {
            //     // Error saving data
            //   }
            // }

            // jwt.verify(res.token, process.env.JWT_SECRET, function(err, decoded) {
            //   console.log("FOO!!"+decoded.foo) // bar
            // });

            AsyncStorage.removeItem('token');
            AsyncStorage.setItem('token', res.token);

            // here is the code to navigate to whatever page you want
            // after being logged in...
            // currently it's just telling you whether or not
            // you have logged in based on your inputs
            this.props.navigation.navigate('Profile', {
              isLoggedIn: true,
              _id: this.state.id,
              username: this.state.username,
              email: this.state.email,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              create_date: this.state.create_date
            });
          }
        );
      } else {
        console.log('You were not logged in');
        this.setState(
          {
            isLoggedIn: false
          },
          function() {
            this.props.navigation.navigate('Register');
          }
        );
      }
    });
  };

  // SETS TOKEN DURING REGISTRATION
  checkRegister = event => {
    // event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    let email = this.state.email;
    return _register(username, email, password).then(res => {
      console.log(res);
      this.setState(
        {
          registered: res.bool,
          isPassingProps: true,
          isLoggedIn: true,
          // id: res.result[0].id,
          username: res.username,
          email: res.email
        },
        function() {
          console.log('You are logged in');

          // storeData = async () => {
          //   try {
          //     await AsyncStorage.setItem("token", res.token);
          //   } catch (error) {
          //     // Error saving data
          //   }
          // }

          AsyncStorage.removeItem('token');
          AsyncStorage.setItem('token', res.token);

          // here is the code to navigate to whatever page you want
          // after being logged in...
          // currently it's just telling you whether or not
          // you have logged in based on your inputs
          this.props.navigation.navigate('Profile', {
            isLoggedIn: true,
            // _id: this.state.id,
            username: this.state.username,
            email: this.state.email
          });
        }
      );
      // redirect will go here
    });
  };

  render() {
    let cryptos = this.state.availableCryptos;

    if (this.state.firsLaunch === null) {
      // DISPLAY BEFORE REGISTRATION IS SHOWN
      return null;
    } else if (this.state.firsLaunch == true) {
      // REGISTRATION PAGE
      return (
        <View style={styles.container}>
          <ImageBackground
            style={{
              flex: 1,
              width: undefined,
              height: undefined
            }}
          >
            <View style={styles.container}>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={styles.name}
                  placeholder="First Name"
                  // placeholderTextColor='black'
                  onChangeText={firstname => this.setState({ firstname })}
                />
                <TextInput
                  style={styles.name}
                  placeholder="Last Name"
                  // placeholderTextColor='black'
                  onChangeText={lastname => this.setState({ lastname })}
                />
              </View>
              <TextInput
                style={styles.registerInput}
                placeholder="Username"
                // placeholderTextColor='black'
                onChangeText={username => this.setState({ username })}
              />
              <TextInput
                style={styles.registerInput}
                placeholder="Password"
                // placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
              <View style={{ width: '90%', marginTop: -15 }}>
                <Dropdown
                  // style={{ borderWidth: 2, borderColor: 'black'  }}
                  label="Select Cryptos to add to your Profile"
                  data={cryptos}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    marginBottom: 30,
                    color: 'blue',
                    textDecorationLine: 'underline'
                  }}
                  onPress={() => LinkingIOS.openURL('http://google.com')}
                >
                  Why do I need to select cryptos?
                </Text>
              </View>
              <TouchableOpacity
                // onPress={this.checkRegister}
                onPress={() => this.props.navigation.navigate('Profile')}
                style={{
                  // margin: 5,
                  // borderRadius: 5,
                  // backgroundColor: '#ffffff',
                  width: '90%',
                  // alignContent: 'center',
                  marginBottom: 5
                }}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: 'center',
                  marginBottom: 5
                }}
              >
                By creating an account you agree
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  alignSelf: 'center'
                }}
              >
                to the Terms of Service
              </Text>
              {/* {this.state.registered == true && (
                <Text>You Have Registered!</Text>
              )}
              {this.state.registered == false && (
                <Text>You have not Registered!</Text>
              )} */}
              <View style={{ flex: 0.6, justifyContent: 'space-around' }} />
              <Text
                style={{ fontSize: 25 }}
                onPress={() => this.setState({ firsLaunch: false })}
              >
                Already have an account?
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      // LOGIN PAGE
      return (
        <View style={{ flex: 1, alignSelf: 'stretch' }}>
          <ImageBackground
            style={{
              flex: 1,
              width: undefined,
              height: undefined
            }}
          >
            <View style={styles.container}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
              />
              <Text style={styles.logoText}>AcceptMyCrypto</Text>
              <TextInput
                style={styles.signinInput}
                placeholder="Email"
                // placeholderTextColor='black'
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                style={styles.signinInput}
                placeholder="Password"
                // placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
              <TouchableOpacity
                // onPress={this.checkLogin}
                onPress={() => this.props.navigation.navigate('Search')}
                style={{
                  // margin: 5,
                  // borderRadius: 5,
                  // backgroundColor: '#ffffff',
                  width: '80%',
                  marginBottom: 15
                }}
              >
                <Text style={styles.buttonText}>SIGN IN</Text>
              </TouchableOpacity>
              <Text
                style={{ fontSize: 12 }}
                onPress={() => LinkingIOS.openURL('http://google.com')}
              >
                Forgot Password?
              </Text>
              <View style={{ flex: 0.6, justifyContent: 'space-around' }} />
              <Text
                style={{ fontSize: 25 }}
                onPress={() => this.setState({ firsLaunch: true })}
              >
                Don't have an account?
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
    // flexDirection: 'column',
    // alignSelf: 'stretch'
  },
  logo: {
    resizeMode: 'contain',
    width: 60,
    height: 60
  },
  logoText: {
    fontSize: 20,
    marginTop: -5,
    marginBottom: 40
  },
  name: {
    height: 35,
    width: '43%',
    backgroundColor: '#fff',
    borderWidth: 2,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8,
    fontSize: 20,
    // fontWeight: 'bold',
    textDecorationColor: 'black'
  },
  signinInput: {
    height: 35,
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 2,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8,
    fontSize: 20,
    // fontWeight: 'bold',
    textDecorationColor: 'black',
    // fontFamily: 'fontAwesome'
  },
  signin: {
    height: 30,
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 2,
    // borderRadius: 4,
    borderColor: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 50
    },
    shadowOpacity: 100,
    padding: 5,
    margin: 8
  },
  registerInput: {
    height: 35,
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 2,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8,
    fontSize: 20,
    // fontWeight: 'bold',
    textDecorationColor: 'black'
  },
  buttonText: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 2,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8,
    textAlign: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 100,
    fontSize: 20,
    // fontWeight: 'bold',
    textDecorationColor: 'black'
  }
});
