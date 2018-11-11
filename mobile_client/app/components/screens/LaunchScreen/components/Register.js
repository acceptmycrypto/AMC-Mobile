import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import { _register, _login } from '../../../../../src/AuthentificationService';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      id: 0,
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      create_date: '',
      isLoggedIn: 'nothing'
    };
  }

  checkRegister = event => {
    event.preventDefault();
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
            <Image style={styles.logo} />
            <Text
              style={{
                fontSize: 40,
                margin: 2,
                color: 'orange'
              }}
            >
              HomeMade
            </Text>
            <TextInput
              style={styles.signin}
              placeholder="Username"
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              style={styles.signin}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
            <TextInput
              style={styles.signin}
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
            />
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
            {this.state.registered == true && <Text>You Have Registered!</Text>}
            {this.state.registered == false && (
              <Text>You have not Registered!</Text>
            )}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  logo: {
    height: 190,
    width: 190
  },
  signin: {
    height: 40,
    width: 100,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: 'black',
    padding: 10,
    margin: 2
  },
  buttonText: {
    margin: 5
  }
});
