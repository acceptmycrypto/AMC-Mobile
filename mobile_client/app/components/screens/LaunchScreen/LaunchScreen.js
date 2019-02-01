import * as React from 'react';
import {
  Platform,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ViewPagerAndroid,
  AsyncStorage,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Linking,
  Button,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { WebBrowser } from 'expo';
import {
  _signUp,
  _login,
  _verifier,
  _loadCryptocurrencies
} from '../../../../src/services/AuthService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CustomMultiPicker from 'react-native-multiple-select-list';
// import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
    this.state = {
      isLoading: true,
      isLoggingIn: false,
      firsLaunch: null,
      isSelectingCryptos: false,
      id: 0,
      username: '',
      email: '',
      password: '',
      cryptoOptions: {},
      cryptoProfile: []
    };
  }

  // FIRST LAUNCH AND TOKEN CHECKER
  componentWillMount = async () => {
    AsyncStorage.getItem('beenLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('beenLaunched', 'true');
        this.setState({ firsLaunch: true });
      } else {
        this.setState({ firsLaunch: false });
        this.checkToken();
      }
    });
  };

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
              // isLoggingIn: true,
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
            this.props.navigation.navigate('Home', {
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
      this.setState({
        cryptoOptions,
        isLoading: false
      });
    });
  }

  handleRegister = () => {
    console.log('SIGN UP');
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let cryptoProfile = this.state.cryptoProfile;

    if (!username || !email || !password) {
      Alert.alert('Please enter in your information');
      this.hideCryptoSelection();
    } else {
      return _signUp(username, email, password, cryptoProfile).then(res => {
        console.log('message sent from server if success: ', res);
        console.log('LINE 246 ' + res);
        if (res.error === 'User already exists') {
          Alert.alert('User already exists');
          this.hideCryptoSelection();
        } else if (res.error === 'you need a password') {
          Alert.alert('You need a password');
          this.hideCryptoSelection();
        } else if (res.error === 'password length must be greater than 5') {
          Alert.alert('Your password must be greater than 5 characters');
          this.hideCryptoSelection();
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
          this.setState({ isSelectingCryptos: false, firsLaunch: false });
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
      this.setState({ isLoggingIn: true });
      return _login(email, password).then(res => {
        if (res.token) {
          AsyncStorage.setItem('token', res.token);
          console.log(res.token);
          this.props.navigation.navigate('Home', {
            _id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            create_date: this.state.create_date
          });
          this.setState({ isLoggingIn: false });
        } else {
          console.log('Login error: ', res);
          if (res.error === 'user not found') {
            this.setState({ isLoggingIn: false });
            Alert.alert('That user does not exist');
          } else if (res.error === 'incorrect password ') {
            this.setState({ isLoggingIn: false });
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

  showCryptoSelection = () => {
    this.setState({
      isSelectingCryptos: true
    });
  };

  hideCryptoSelection = () => {
    this.setState({
      isSelectingCryptos: false
    });
  };

  handlePasswordLink = () => {
    WebBrowser.openBrowserAsync(
      'https://acceptmycrypto.herokuapp.com/ResetPasswordEmail'
    );
  };

  handleCryptosLink = () => {
    WebBrowser.openBrowserAsync('https://acceptmycrypto.herokuapp.com/SignUp');
  };

  render() {
    const firsLaunch = this.state.firsLaunch;
    const isSelectingCryptos = this.state.isSelectingCryptos;

    if (firsLaunch === null) {
      // DISPLAY BEFORE REGISTRATION IS SHOWN
      return null;
    } else if (firsLaunch == true) {
      // REGISTRATION PAGE
      return (
        <View
          style={{
            flex: 1,
            // flexGrow: 1,
            backgroundColor: '#2e4158'
            // alignItems: 'center',
            // justifyContent: 'center'
          }}
        >
          {Platform.OS === 'ios' ? (
            // IOS Sign Up Screen

            <KeyboardAwareScrollView
              contentContainerStyle={{ alignItems: 'center' }}
              alwaysBounceVertical={true}
              keyboardDismissMode="on-drag"
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              // removeClippedSubviews={true}
              // endFillColor="white"
              overScrollMode="never"
              // bouncesZoom={true}
              // centerContent={true}
              indicatorStyle="white"
              snapToAlignment="center"
              snapToInterval={1000}
              decelerationRate="fast"
              // nestedScrollEnabled={true}
              // onMomentumScrollBegin={() => { this.setState({ scrollEnabled: true }) }}
              // onMomentumScrollEnd={() => { this.setState({ scrollEnabled: false }) }}
              // pagingEnabled={true}
              // scrollEventThrottle={16}
            >
              <Text
                style={{
                  alignSelf: 'flex-start',
                  color: '#fff',
                  marginTop: 15,
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
              <View style={styles.selector}>
                {this.state.isLoading ? (
                  <View style={{ height: 240, justifyContent: 'center' }}>
                    <ActivityIndicator />
                  </View>
                ) : (
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
                )}
                <Text
                  style={styles.selectorText}
                  onPress={this.handleCryptosLink}
                >
                  Why do I need to select cryptos?
                </Text>
              </View>
              <TouchableOpacity
                onPress={this.handleRegister}
                style={styles.createButton}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <Text style={styles.termsTop}>
                By creating an account you agree
              </Text>
              <Text style={styles.termsBottom}>to the Terms of Service</Text>
              {/* <View style={styles.registerGap} /> */}
            </KeyboardAwareScrollView>
          ) : (
            // Android Sign Up Screen
            <View
              style={{
                flex: 1,
                alignItems: 'center'
              }}
              behavior="padding"
            >
              <KeyboardAwareScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
                alwaysBounceVertical={true}
                keyboardDismissMode="on-drag"
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
                overScrollMode="never"
                // indicatorStyle="white"
                // snapToAlignment="center"
                // snapToInterval={1000}
                // decelerationRate="fast"
              >
                <Text
                  style={{
                    alignSelf: 'flex-start',
                    color: '#fff',
                    marginTop: 15,
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
                <TouchableOpacity
                  onPress={this.showCryptoSelection}
                  style={{
                    alignSelf: 'center',
                    margin: 5,
                    borderRadius: 25,
                    backgroundColor: '#52c4b9',
                    width: '70%',
                    marginTop: 15,
                    marginBottom: 15
                  }}
                >
                  <Text style={styles.buttonText}>Select Your Cryptos</Text>
                </TouchableOpacity>
              </KeyboardAwareScrollView>

              {isSelectingCryptos ? (
                <View>
                  <Modal
                    isVisible={true}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                  >
                    <View
                      style={{
                        backgroundColor: '#2e4158',
                        padding: 10,
                        justifyContent: 'center',
                        borderRadius: 4
                      }}
                    >
                      <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={this.hideCryptoSelection}
                      >
                        <Text style={{ fontSize: 20 }}>X</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#fff',
                          marginTop: 5,
                          marginLeft: 5
                        }}
                      >
                        YOUR CRYPTOCURRENCY PORTFOLIO
                      </Text>
                      {this.state.isLoading ? (
                        <View style={{ height: 240, justifyContent: 'center' }}>
                          <ActivityIndicator />
                        </View>
                      ) : (
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
                      )}
                      <Text
                        style={styles.selectorText}
                        onPress={this.handleCryptosLink}
                      >
                        Why do I need to select cryptos?
                      </Text>
                      <TouchableOpacity
                        onPress={this.handleRegister}
                        style={styles.createButton}
                      >
                        <Text style={styles.buttonText}>Create Account</Text>
                      </TouchableOpacity>
                      <Text style={styles.termsTop}>
                        By creating an account you agree
                      </Text>
                      <Text style={styles.termsBottom}>
                        to the Terms of Service
                      </Text>
                    </View>
                  </Modal>
                </View>
              ) : null}
            </View>
          )}
          <Text
            style={{ fontSize: 25, marginBottom: 25, alignSelf: 'center' }}
            onPress={() => this.setState({ firsLaunch: false })}
          >
            Already have an account?
          </Text>
        </View>
      );
    } else {
      // LOGIN PAGE
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {this.state.isLoggingIn ? (
            <View style={styles.container}>
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
              <ActivityIndicator
                style={{
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </View>
          ) : (
            <View style={styles.container}>
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
          )}
        </TouchableWithoutFeedback>
      );
    }
  }
}
