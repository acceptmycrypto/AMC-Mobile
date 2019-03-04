import * as React from 'react';
import {
  Platform,
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
  NavigationActions,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Switch,
  BackHandler
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import {
  _signUp,
  _login,
  _verifier,
  _loadCryptocurrencies
} from '../../../../src/services/AuthService';
import {
  _updateCryptoTable,
  _loadProfile,
  _addCryptos
} from '../../../../src/services/UserProfileService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CustomMultiPicker from 'react-native-multiple-select-list';
import Modal from 'react-native-modal';
// import { Switch } from 'react-native-gesture-handler';

const styles = require('../../../assets/stylesheet/style');

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      firsLaunch: null,
      isSelectingCryptos: false,
      username: '',
      email: 'audiopunk252@yahoo.com',
      password: 'taylora',
      isLoading: true,
      isLoadingCryptos: true,
      cryptoOptions: {},
      cryptoOptionsLeft: {},
      cryptoProfile: [],
      isLoggedIn: false,
      isPassingProps: false,
      crypto_view: 'owned',
      user_info: [],
      user_crypto: [],
      add_address: false,
      users_cryptos_id: null,
      current_crypto_name: null,
      switchSelected: false,
      showCrytoAddress: false,
      new_address: '',
      add_cryptos: false
    };
  }

  // updates state
  setCurrentState = (
    crypto_view,
    qr,
    add_address,
    users_cryptos_id,
    current_crypto_name
  ) => {
    this.setState({
      crypto_view,
      qr,
      add_address,
      users_cryptos_id,
      current_crypto_name
    });
  };

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
              isLoggedIn: true,
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
            // this.props.navigation.navigate('Home', {
            //   _id: this.state._id,
            //   user_name: this.state.user_name,
            //   first_name: this.state.first_name,
            //   last_name: this.state.last_name,
            //   email: this.state.email,
            //   bio: this.state.bio,
            //   photo: this.state.photo,
            //   user_location: this.state.user_location,
            //   birthday: this.state.birthday
            // });
          }
        });
      }
    } catch (error) {
      // this.setState({ isLoggedIn: false });
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

  handleToggleChange = value => {
    if (value) {
      // if checkbox is checked show interested coins
      this.setCurrentState('interested', false, false, null, null); // crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      // this.hideOrShowCoin("show");
      this.setState({
        switchSelected: value
      });
      console.log(this.state);
    } else {
      // if checkbox is not checked show owned coins
      this.setCurrentState('owned', false, false, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      // this.hideOrShowCoin("show");
      this.setState({
        switchSelected: value
      });
    }
    console.log(this.state);
  };

  componentWillMount = async () => {
    AsyncStorage.getItem('beenLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('beenLaunched', 'true');
        this.setState({ firsLaunch: true });
      } else {
        this.setState({ firsLaunch: false });
        this.checkToken();
        this.loadProfile();
      }
    });
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
        isLoadingCryptos: false
      });
    });
  }

  loadProfile = async () => {
    try {
      const valueToken = await AsyncStorage.getItem('token');
      return _loadProfile(valueToken).then(res => {
        console.log(res);

        let {
          user_info,
          user_crypto,
          friends_array,
          transactions,
          remaining_cryptos
        } = res;
        console.log(
          user_info,
          user_crypto,
          friends_array,
          transactions,
          remaining_cryptos
        );

        let cryptoOptionsLeft = {};

        remaining_cryptos.map(crypto => {
          let value = crypto.crypto_name;
          let label =
            crypto.crypto_name + ' ' + '(' + crypto.crypto_symbol + ')';
          cryptoOptionsLeft[value] = label;
        });
        console.log('146 ', cryptoOptionsLeft);

        this.setState({
          user_info,
          user_crypto,
          cryptoOptionsLeft,
          isLoading: false
        });
        console.log(this.state);
      });
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }
  };

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
          this.loadProfile();
          // this.props.navigation.navigate('Home', {
          //   _id: this.state.id,
          //   username: this.state.username,
          //   email: this.state.email,
          //   firstname: this.state.firstname,
          //   lastname: this.state.lastname,
          //   create_date: this.state.create_date
          // });
          this.setState({ isLoggingIn: false, isLoggedIn: true });
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

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      this.setState({
        isLoggedIn: false
      });
      // this.props.navigation.navigate('Launch', {
      //   isLoggedIn: false
      // });
    } catch (error) {
      // Error saving data
    }
  };

  handleAddressFormChange = (event, id, name) => {
    console.log(id);
    if (this.state.add_address == false) {
      this.setState({
        add_address: true,
        users_cryptos_id: id,
        current_crypto_name: name
      });
    } else {
      this.setState({
        add_address: false,
        users_cryptos_id: null,
        current_crypto_name: null
      });
    }
  };

  showAddress = event => {
    if (this.state.showCrytoAddress) {
      this.setState({
        showCrytoAddress: false
      });
    } else {
      this.setState({
        showCrytoAddress: true
      });
    }
  };

  addAddress = async () => {
    try {
      let value = await AsyncStorage.getItem('token');
      return _updateCryptoTable(
        this.state.new_address,
        this.state.users_cryptos_id,
        value
      ).then(res => {
        console.log(res);

        let { user_crypto, crypto_view, add_address } = res;
        console.log(user_crypto, crypto_view, add_address);

        this.setState({
          user_crypto,
          crypto_view,
          add_address,
          switchSelected: false
        });
        console.log(this.state);
      });
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }
  };

  addMoreCryptos = () => {
    if (this.state.add_cryptos) {
      this.setState({
        add_cryptos: false,
        cryptoProfile: []
      });
    } else {
      this.setState({
        add_cryptos: true
      });
    }
  };

  updateCryptoPortfolio = async () => {
    try {
      let cryptoProfile = await this.state.cryptoProfile;
      const value = await AsyncStorage.getItem('token');
      await console.log(cryptoProfile);
      if (cryptoProfile.length > 0) {
        await _addCryptos(value, cryptoProfile);
        await _loadProfile(value).then(res => {
          let { user_crypto, remaining_cryptos } = res;
          let cryptoOptionsLeft = {};

          remaining_cryptos.map(crypto => {
            let value = crypto.crypto_name;
            let label =
              crypto.crypto_name + ' ' + '(' + crypto.crypto_symbol + ')';
            cryptoOptionsLeft[value] = label;
          });

          this.setState({
            add_cryptos: false,
            crypto_view: 'interested',
            user_crypto,
            cryptoOptionsLeft,
            cryptoProfile: []
          });
        });
      }
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }
  };

  render() {
    // const validIcon = parseIconFromClassName('fas fa-chevron-left');
    const firsLaunch = this.state.firsLaunch;
    const isSelectingCryptos = this.state.isSelectingCryptos;

    if (this.state.isLoggedIn) {
      if (this.state.isLoading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        );
      } else {
        return (
          <View style={additionalStyles.container}>
            {this.state.user_info.map((userData, i) => (
              <View style={additionalStyles.profileImageView} key={'user' + i}>
                <LinearGradient
                  colors={['#49cdb7', '#1ab7db']}
                  start={{ x: 0.85, y: 0.85 }}
                  style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
                >
                  {userData.photo.indexOf('fa-user') == -1 ? (
                    <Image source={userData.photo} />
                  ) : null}
                  {userData.photo == 'fa-user-tie' ||
                  userData.photo == 'fa-user-astronaut' ? (
                    <FontAwesome
                      name="user"
                      size={70}
                      style={{ color: '#2e4158' }}
                    />
                  ) : (
                    <FontAwesome
                      name={userData.photo.slice(3)}
                      size={70}
                      style={{ color: '#2e4158' }}
                    />
                  )}
                </LinearGradient>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    alignSelf: 'center',
                    marginTop: 3
                  }}
                >
                  {userData.username}
                </Text>
              </View>
            ))}

            {!this.state.add_address && !this.state.add_cryptos && (
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {Platform.OS === 'ios' ? (
                  <Switch
                    disabled={false}
                    value={this.state.switchSelected}
                    style={{
                      marginTop: 15,
                      backgroundColor: '#49cdb7',
                      borderRadius: 17,
                      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
                    }}
                    onTintColor={'#2196F3'}
                    tintColor={'#49cdb7'}
                    onValueChange={value => {
                      this.handleToggleChange(value);
                    }}
                  />
                ) : (
                  <Switch
                    disabled={false}
                    value={this.state.switchSelected}
                    style={{
                      marginTop: 15,
                      transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
                    }}
                    onTintColor={'#2196F3'}
                    tintColor={'#49cdb7'}
                    onValueChange={value => {
                      this.handleToggleChange(value);
                    }}
                  />
                )}

                <View style={{ flex: 1, marginTop: 10 }}>
                  {this.state.crypto_view === 'interested' ? (
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginBottom: 5,
                          alignSelf: 'center'
                        }}
                      >
                        CRYPTO YOU ARE INTERESTED IN
                      </Text>
                      <ScrollView className="cryptoWallet">
                        {this.state.user_crypto.map((crypto, i) => (
                          <View key={'interested ' + i}>
                            {crypto.crypto_address === null ? (
                              <TouchableHighlight
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  width: '100%'
                                }}
                                onPress={event => {
                                  this.handleAddressFormChange(
                                    event,
                                    crypto['id'],
                                    crypto['crypto_metadata_name']
                                  );
                                }}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%'
                                  }}
                                >
                                  <Image
                                    className="cryptoImage"
                                    style={{
                                      alignContent: 'flex-start',
                                      width: 50,
                                      height: 50
                                    }}
                                    data-name={crypto.crypto_metadata_name}
                                    source={{ uri: crypto.crypto_logo }}
                                    data-id={crypto.id}
                                  />
                                  <Text
                                    style={{
                                      marginLeft: 20,
                                      color: 'white',
                                      fontSize: 18
                                    }}
                                  >
                                    {crypto.crypto_metadata_name}
                                  </Text>
                                </View>
                              </TouchableHighlight>
                            ) : null}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 16,
                          marginBottom: 5,
                          alignSelf: 'center'
                        }}
                      >
                        CRYPTO YOU OWN
                      </Text>
                      <ScrollView className="cryptoWallet">
                        {this.state.user_crypto.map((crypto, i) => (
                          <View key={'owned ' + i} style={{ marginTop: 10 }}>
                            {crypto.crypto_address !== null ? (
                              <TouchableHighlight
                                style={{
                                  flex: 1,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  width: '100%'
                                }}
                                onPress={event => {
                                  this.showAddress(event);
                                }}
                              >
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%'
                                  }}
                                >
                                  <Image
                                    className="cryptoImage"
                                    style={{
                                      alignContent: 'flex-start',
                                      width: 50,
                                      height: 50
                                    }}
                                    data-name={crypto.crypto_metadata_name}
                                    source={{ uri: crypto.crypto_logo }}
                                    data-id={crypto.id}
                                  />
                                  <Text
                                    style={{
                                      marginLeft: 20,
                                      color: 'white',
                                      fontSize: 18
                                    }}
                                  >
                                    {crypto.crypto_metadata_name}
                                  </Text>
                                </View>
                              </TouchableHighlight>
                            ) : null}
                            {this.state.showCrytoAddress ? (
                              <Text
                                style={{
                                  color: 'white',
                                  marginTop: 10,
                                  marginBottom: 10,
                                  textAlign: 'center'
                                }}
                                selectable={true}
                              >
                                {crypto.crypto_address}
                              </Text>
                            ) : null}
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            )}

            {this.state.add_address && (
              <View style={{ flex: 2 }}>
                <ScrollView>
                  <TouchableHighlight
                    style={{ flexDirection: 'row' }}
                    onPress={this.handleAddressFormChange}
                  >
                    <Text
                      style={{
                        marginLeft: 'auto',
                        fontSize: 20,
                        color: 'white'
                      }}
                    >
                      X
                    </Text>
                  </TouchableHighlight>
                  <TextInput
                    style={additionalStyles.textInput}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Address"
                    placeholderTextColor="#58697e"
                    onChangeText={new_address => this.setState({ new_address })}
                  />
                  <View
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 10,
                      marginTop: 20
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        backgroundColor: 'green'
                      }}
                      onPress={this.addAddress}
                    >
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          padding: 8,
                          fontSize: 18
                        }}
                      >
                        Add {this.state.current_crypto_name} Address
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            )}
            {this.state.add_cryptos && (
              <View style={{ flex: 2, width: '90%' }}>
                <TouchableHighlight
                  style={{ flexDirection: 'row' }}
                  onPress={this.addMoreCryptos}
                >
                  <Text
                    style={{ marginLeft: 'auto', fontSize: 20, color: 'white' }}
                  >
                    X
                  </Text>
                </TouchableHighlight>
                <KeyboardAvoidingView
                  style={{ width: '100%' }}
                  behavior="position"
                  enabled
                >
                  <CustomMultiPicker
                    style={{ width: '100%' }}
                    options={this.state.cryptoOptionsLeft}
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
                    rowHeight={51}
                    rowRadius={10}
                    iconColor={'black'}
                    iconSize={30}
                    selectedIconName={'md-checkmark-circle-outline'}
                    unselectedIconName={'ios-radio-button-off-outline'}
                    scrollViewHeight={'80%'}
                    selected={[]} // list of options which are selected by default
                  />
                </KeyboardAvoidingView>
              </View>
            )}
            <View style={{ flexDirection: 'row', margin: 10 }}>
              {this.state.user_crypto.length < 10 && !this.state.add_cryptos ? (
                // <View style={{ width: '100%', backgroundColor: 'green', borderRadius: 10 }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'green'
                  }}
                  onPress={this.addMoreCryptos}
                >
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      padding: 8,
                      fontSize: 18
                    }}
                  >
                    Add Other Cryptos
                  </Text>
                </TouchableOpacity>
              ) : // </View>
              null}
              {this.state.add_cryptos && (
                <TouchableOpacity
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'green'
                  }}
                  onPress={this.updateCryptoPortfolio}
                >
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      padding: 8,
                      fontSize: 18
                    }}
                  >
                    Update Crypto Portfolio
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  borderRadius: 10,
                  backgroundColor: 'black'
                }}
                onPress={this.handleLogout}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    padding: 8,
                    fontSize: 18
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    } else {
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
                  {this.state.isLoadingCryptos ? (
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
                        {this.state.isLoadingCryptos ? (
                          <View
                            style={{ height: 240, justifyContent: 'center' }}
                          >
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
}

const additionalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e4158',
    margin: 0,
    marginBottom: 0
  },
  profileImageView: {
    // flex: 1,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10

    // position: 'absolute',
  },
  textInput: {
    flex: 2,
    // height: 55,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#445366',
    padding: 5,
    fontSize: 20,
    color: '#fff'
  }
});
