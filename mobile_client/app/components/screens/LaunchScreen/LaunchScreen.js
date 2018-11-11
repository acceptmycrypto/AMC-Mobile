import * as React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  Picker,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
  LinkingIOS
} from 'react-native';
import { _signUp, _login } from '../../../../src/AuthentificationService';

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
      isLoggedIn: null
    };
  }

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
                  onChangeText={firstname => this.setState({ firstname })}
                />
                <TextInput
                  style={styles.name}
                  placeholder="Last Name"
                  onChangeText={lastname => this.setState({ lastname })}
                />
              </View>
              <TextInput
                style={styles.register}
                placeholder="Username"
                onChangeText={username => this.setState({ username })}
              />
              <TextInput
                style={styles.register}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />
              <Picker
                selectedValue="Select Cryptos to add to your Profile"
                style={{ height: 30, width: '85%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ userCrypto: itemValue })
                }
              >
                <Picker.Item label="Bitcoin" value="Bitcoin" />
                <Picker.Item label="Ethereum" value="Ethereum" />
              </Picker>
              <TouchableOpacity
                onPress={this.checkRegister}
                style={{
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#ffffff'
                }}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              {this.state.registered == true && (
                <Text>You Have Registered!</Text>
              )}
              {this.state.registered == false && (
                <Text>You have not Registered!</Text>
              )}
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      // LOGIN PAGE
      return (
        // <View style={{ flex: 1, alignSelf: 'stretch' }}>
        //   <ImageBackground
        //     style={{
        //       flex: 1,
        //       width: undefined,
        //       height: undefined

        //     }}
        //   >
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>AcceptMyCrypto</Text>
          <TextInput
            style={styles.signin}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.signin}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity
            onPress={this.checkLogin}
            style={{
              margin: 5,
              borderRadius: 5,
              backgroundColor: '#ffffff'
            }}
          >
            <Text style={styles.buttonText} onPress={this.checkLogin}>
              Signin
            </Text>
          </TouchableOpacity>
          <Text onPress={() => LinkingIOS.openURL('http://google.com')}>
            Forgot Password?
          </Text>
          <Text onPress={() => this.setState({ firsLaunch: true })}>
            Don't have an account?
          </Text>
        </View>
        //   </ImageBackground>
        // </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
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
    height: 30,
    width: '40%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8
  },
  register: {
    height: 30,
    width: '85%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8
  },
  signin: {
    height: 30,
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8
  },
  buttonText: {
    height: 30,
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    // borderRadius: 4,
    borderColor: 'black',
    padding: 5,
    margin: 8
  }
});
