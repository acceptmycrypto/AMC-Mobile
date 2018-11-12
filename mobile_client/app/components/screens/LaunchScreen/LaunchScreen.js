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
  Font,
  ScrollView
} from 'react-native';
import fontAwesome from '@expo/vector-icons/FontAwesome';
// import { _signUp, _login } from '../../../../src/AuthentificationService';
// import Login from '../LaunchScreen/components/Login';
// import Register from '../LaunchScreen/components/Register';
import { Dropdown } from 'react-native-material-dropdown';
import {
  _signUp,
  _loadCryptocurrencies
} from '../../../../src/services/AuthService';

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

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
      cryptoOptions: [],
      cryptoProfile: [],
      availableCryptos: [],
      isSelectingCryptos: false,
      selectedOptions: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  // LOADS AVAILABLE CRYPTOCURRENCIES
  componentDidMount() {
    return _loadCryptocurrencies().then(cryptos => {
      let cryptoOptions = [];

      cryptos.map(crypto => {
        let optionObj = {};
        optionObj.value = crypto.crypto_metadata_name;
        optionObj.label =
          crypto.crypto_metadata_name + ' ' + '(' + crypto.crypto_symbol + ')';

        cryptoOptions.push(optionObj);
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
  //   console.log('Line 46');

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

  handleSubmit() {
    // event.preventDefault();

    let username = e.target.children[0].children[1].value;
    let email = e.target.children[1].children[1].value;
    let password = e.target.children[2].children[1].value;
    let cryptoProfile = this.state.cryptoProfile;

    //we add validation on the front end so that user has to enter in the required field before clicking submit
    //TODO
    if (!username || !email || !password) {
      alert('Please enter in the required field!');
    } else {
      return _signUp(username, email, password, cryptoProfile).then(res => {
        console.log('message sent from server if success: ', res);
        //TODO
        //prompt users to check their email
      });
    }
  }

  handleLogin() {
    // event.preventDefault();
    let email = this.state.email;
    let password = this.state.password;

    if (!email || !password) {
      alert('please enter in the required fields');
    } else {
      return _login(email, password).then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          console.log(res.token);
          this.props.navigation.navigate(
            'Profile'
            // {
            //   isLoggedIn: true,
            //   _id: this.state.id,
            //   username: this.state.username,
            //   email: this.state.email,
            //   firstname: this.state.firstname,
            //   lastname: this.state.lastname,
            //   create_date: this.state.create_date
            // }
          );
          // alert("You've successfully logged in");
          //redirect user to the feed/deals
        } else {
          console.log('Login error: ', res);
          alert(res.err);
        }
      });
    }
  }

  handleDropdownChange = selectedOptions => {
    let SelectedCryptos = [];
    // selectedOptions.map(crypto => {
    //   SelectedCryptos.push(crypto.value);
    // });
    SelectedCryptos.push(selectedOptions);
    console.log(this.state.cryptoProfile);

    // this.setState({
    //   cryptoProfile: SelectedCryptos //this is what we get [Bitcoin, Litecoin, ...] as user select the option
    // });

    this.setState({
      cryptoProfile: [...this.state.cryptoProfile, ...SelectedCryptos],
      isSelectingCryptos: true //this is what we get [Bitcoin, Litecoin, ...] as user select the option
    });
  };

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name);
  }

  cryptoFilter(cryptoOptions, cryptoProfile) {
    for (i in cryptoProfile) {
      console.log(cryptoProfile);
      if (cryptoOptions === cryptoProfile) {
        console.log(true);
      } else {
        console.log(false);
      }
    }
  }

  render() {
    const cryptos = this.state.availableCryptos;
    const isSelectingCryptos = this.state.isSelectingCryptos;
    const { selectedOptions } = this.state;

    if (this.state.firsLaunch === null) {
      // DISPLAY BEFORE REGISTRATION IS SHOWN
      return null;
    } else if (this.state.firsLaunch == true) {
      // REGISTRATION PAGE
      return (
        // <View style={styles.container}>
        //   <ImageBackground style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.flexRow}>
            <TextInput
              style={styles.nameInput}
              placeholder="First Name"
              placeholderTextColor="#58697e"
              onChangeText={firstname => this.setState({ firstname })}
            />
            <TextInput
              style={styles.nameInput}
              placeholder="Last Name"
              placeholderTextColor="#58697e"
              onChangeText={lastname => this.setState({ lastname })}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#58697e"
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#58697e"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <View style={styles.dropdown}>
            <Dropdown
              label="Select Cryptos to add to your Profile"
              data={this.state.cryptoOptions}
              onChangeText={this.handleDropdownChange}
            />
            <Text
              style={styles.dropdownText}
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
          {isSelectingCryptos ? (
            <View style={styles.registerGap}>
              {/* <View>{this.state.cryptoOptions}</View> */}
              <Text style={{ margin: 10, fontSize: 25 }}>
                Your Cryptocurrency Portfolio
              </Text>
              <ScrollView>
                {this.state.cryptoProfile.map(cryptos => {
                  return (
                    // <TouchableOpacity style={styles.postStyle} key={cryptos.post_id} onPress={() => this.viewPost(cryptos.post_id)}>
                    //   <Image
                    //     style={{ width: 100, height: 100 }}
                    //     source={{ url: "https://via.placeholder.com/50x50" }}
                    //   />
                    <View style={{ margin: 5, flex: 1 }}>
                      {/* <Text >{cryptos.value}</Text> */}
                      {/* <Text>{cryptos.information}</Text> */}
                      {/* <TouchableOpacity
                    style={{
                      alignContent: "flex-end",
                      marginLeft: 120,
                      marginTop: 10
                    }}
                    onPress={this.buyPost}
                  > */}
                      <Text>{cryptos}</Text>
                      {/* </TouchableOpacity> */}
                    </View>
                    // </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.registerGap} />
          )}
          <Text
            style={styles.font25}
            onPress={() => this.setState({ firsLaunch: false })}
          >
            Already have an account?
          </Text>
        </View>
        //   </ImageBackground>
        // </View>
      );
    } else {
      // LOGIN PAGE
      return (
        // <View style={{ flex: 1, alignSelf: 'stretch' }}>
        //   <ImageBackground
        //     style={styles.backgroundImage}
        //   >
        <View style={styles.container}>
          <View
            style={{
              flex: 0.3,
              marginTop: -50,
              // flexGrow: 1,
              backgroundColor: '#66dac7',
              // alignItems: 'center',
              justifyContent: 'center'
              // flexDirection: 'column',
              // alignSelf: 'stretch',
            }}
          >
            <Image
              source={require('../../../assets/images/login_logo.png')}
              style={styles.logo}
            />
          </View>
          {/* <Text style={styles.logoText}>AcceptMyCrypto</Text> */}
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 46
            }}
          >
            E-MAIL ADDRESS
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="#58697e"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
          />
          <Text
            style={{
              alignSelf: 'flex-start',
              color: '#fff',
              marginTop: 15,
              marginLeft: 46
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
            // onPress={this.checkLogin}
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
        //   </ImageBackground>
        // </View>
      );
    }
  }
}
