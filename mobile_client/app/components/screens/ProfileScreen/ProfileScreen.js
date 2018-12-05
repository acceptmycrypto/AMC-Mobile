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
  NavigationActions,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Switch
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import {
  _updateCryptoTable,
  _loadProfile,
  _addCryptos
} from '../../../../src/services/UserProfileService';
import CustomMultiPicker from 'react-native-multiple-select-list';
import { _verifier } from '../../../../src/services/AuthService';
// import { Switch} from 'react-native-gesture-handler';


const styles = require('../../../assets/stylesheet/style');

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cryptoOptions:{},
      cryptoOptionsLeft: {},
      cryptoProfile: [],
      isLoggedIn: false,
      isPassingProps: false,
      crypto_view: "owned",
      user_info: [],
      user_crypto: [],
      add_address: false,
      users_cryptos_id: null,
      current_crypto_name: null,
      switchSelected: false,
      showCrytoAddress: false,
      new_address: "",
      add_cryptos: false,
    };
  }

  // updates state
  setCurrentState = (crypto_view, qr, add_address, users_cryptos_id, current_crypto_name) => {
    this.setState({ crypto_view, qr, add_address, users_cryptos_id, current_crypto_name });
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
  handleToggleChange = (value) => {

    if (value) { // if checkbox is checked show interested coins
      this.setCurrentState("interested", false, false, null, null); // crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      // this.hideOrShowCoin("show");
      this.setState({
        switchSelected: value
      })
      console.log(this.state);

    } else { // if checkbox is not checked show owned coins
      this.setCurrentState("owned", false, false, null, null); //crypto_view, qr, add_address, users_cryptos_id, current_crypto_name

      // this.hideOrShowCoin("show");
      this.setState({
        switchSelected: value
      })
    }
    console.log(this.state);
  }

  componentWillMount = async () => {
    try {
      const valueToken = await AsyncStorage.getItem('token');
      return _loadProfile(valueToken).then(res => {
        console.log(res);

        let { user_info, user_crypto, friends_array, transactions, remaining_cryptos } = res;
        console.log(user_info, user_crypto, friends_array, transactions, remaining_cryptos);


        let cryptoOptionsLeft = {};

        remaining_cryptos.map(crypto => {
          let value = crypto.crypto_name;
          let label =
            crypto.crypto_name + ' ' + '(' + crypto.crypto_symbol + ')';
          cryptoOptionsLeft[value] = label;
        });
        console.log("146 ", cryptoOptionsLeft);

        this.setState({ user_info, user_crypto, cryptoOptionsLeft });
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

  handleAddressFormChange = (event, id, name) => {
    console.log(id);
    if (this.state.add_address == false) {
      this.setState({
        add_address: true,
        users_cryptos_id: id,
        current_crypto_name: name,

      })
    } else {
      this.setState({
        add_address: false,
        users_cryptos_id: null,
        current_crypto_name: null,

      })
    }
  }

  showAddress = (event) => {

    if (this.state.showCrytoAddress) {
      this.setState({
        showCrytoAddress: false
      })
    } else {
      this.setState({
        showCrytoAddress: true
      })
    }

  }

  addAddress = async () => {
    try {
      let value = await AsyncStorage.getItem('token');
      return _updateCryptoTable(this.state.new_address, this.state.users_cryptos_id, value).then(res => {
        console.log(res);

        let { user_crypto, crypto_view, add_address } = res;
        console.log(user_crypto, crypto_view, add_address);

        this.setState({ user_crypto, crypto_view, add_address, switchSelected: false });
        console.log(this.state);
      });
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }

  }

  addMoreCryptos = () => {
    if (this.state.add_cryptos) {
      this.setState({
        add_cryptos: false,
        cryptoProfile: []
      })
    } else {
      this.setState({
        add_cryptos: true
      })
    }
  }

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
            let label = crypto.crypto_name + ' ' + '(' + crypto.crypto_symbol + ')';
            cryptoOptionsLeft[value] = label;
          });

          this.setState({
            add_cryptos: false,
            crypto_view: "interested",
            user_crypto, 
            cryptoOptionsLeft, 
            cryptoProfile: []
          });
        });
      }


    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }





  }



  render() {
    const { navigation } = this.props;
    // const id = navigation.getParam('_id', 'n/a');
    const username = navigation.getParam('username', 'n/a');
    // const email = navigation.getParam('email', 'n/a');
    // const firstname = navigation.getParam('firstname', 'n/a');
    // const lastname = navigation.getParam('lastname', 'n/a');
    // const create_date = navigation.getParam('create_date', 'n/a');
    // const status = navigation.getParam('isLoggedIn', 'n/a');

    // const validIcon = parseIconFromClassName('fas fa-chevron-left');

    return (
      <View style={additionalStyles.container}>

        {this.state.user_info.map((userData, i) =>
          <View style={additionalStyles.profileImageView} key={"user" + i} >
            <LinearGradient
              colors={['#49cdb7', '#1ab7db']}
              start={{ x: 0.85, y: 0.85 }}
              style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
            >
              {(userData.photo.indexOf("fa-user") == -1)
                ? <Image source={userData.photo}></Image>
                : null
              }
              {userData.photo == 'fa-user-tie' || userData.photo == 'fa-user-astronaut'
                ? <FontAwesome name="user" size={70} style={{ color: '#2e4158' }} />
                : <FontAwesome name={userData.photo.slice(3)} size={70} style={{ color: '#2e4158' }} />
              }
            </LinearGradient>
            <Text style={{ color: 'white', fontSize: 22, alignSelf: 'center', marginTop: 3 }}>{userData.username}</Text>

          </View>
        )}

        {!this.state.add_address && !this.state.add_cryptos && <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
          <Switch disabled={false} value={this.state.switchSelected} style={{ marginTop: 15, backgroundColor: '#49cdb7', borderRadius: 17, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} onTintColor={'#2196F3'} tintColor={'#49cdb7'}
            onValueChange={(value) => { this.handleToggleChange(value) }} ></Switch>

          <View style={{ flex: 1, marginTop: 10 }}>
            {this.state.crypto_view === "interested"
              ? <View>
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 5, alignSelf: "center" }}>CRYPTO YOU ARE INTERESTED IN</Text>
                <ScrollView className="cryptoWallet">
                  {this.state.user_crypto.map((crypto, i) =>
                    <View key={"interested " + i}>
                      {
                        (crypto.crypto_address === null)
                          ? <TouchableHighlight style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%' }} onPress={(event) => { this.handleAddressFormChange(event, crypto["id"], crypto["crypto_metadata_name"]) }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                              <Image className="cryptoImage" style={{ alignContent: "flex-start", width: 50, height: 50 }} data-name={crypto.crypto_metadata_name} source={{ url: crypto.crypto_logo }} data-id={crypto.id}></Image>
                              <Text style={{ marginLeft: 20, color: 'white', fontSize: 18 }}>{crypto.crypto_metadata_name}</Text>
                            </View>
                          </TouchableHighlight>
                          : null
                      }
                    </View>
                  )
                  }
                </ScrollView>
              </View>
              : <View>
                <Text style={{ color: 'white', fontSize: 16, marginBottom: 5, alignSelf: "center" }}>CRYPTO YOU OWN</Text>
                <ScrollView className="cryptoWallet">
                  {this.state.user_crypto.map((crypto, i) =>
                    <View key={"owned " + i} style={{ marginTop: 10 }}>
                      {
                        (crypto.crypto_address !== null)
                          ? <TouchableHighlight style={{ flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%' }} onPress={(event) => { this.showAddress(event) }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                              <Image className="cryptoImage" style={{ alignContent: "flex-start", width: 50, height: 50 }} data-name={crypto.crypto_metadata_name} source={{ url: crypto.crypto_logo }} data-id={crypto.id}></Image>
                              <Text style={{ marginLeft: 20, color: 'white', fontSize: 18 }}>{crypto.crypto_metadata_name}</Text>
                            </View>
                          </TouchableHighlight>
                          : null
                      }
                      {this.state.showCrytoAddress
                        ? <Text style={{ color: 'white', marginTop: 10, marginBottom: 10, textAlign: "center" }} selectable={true}>{crypto.crypto_address}</Text>
                        : null
                      }
                    </View>
                  )
                  }
                </ScrollView>

              </View>
            }
          </View>

        </View>}

        {this.state.add_address && <View style={{ flex: 2 }}>
          <ScrollView>
            <TouchableHighlight style={{ flexDirection: 'row' }} onPress={this.handleAddressFormChange}><Text style={{ marginLeft: 'auto', fontSize: 20, color: "white" }}>X</Text></TouchableHighlight>
            <TextInput
              style={additionalStyles.textInput}
              underlineColorAndroid="transparent"
              placeholder="Enter Address"
              placeholderTextColor="#58697e"
              onChangeText={new_address => this.setState({ new_address })}
            />
            <View style={{ backgroundColor: "green", borderRadius: 10, marginTop: 20 }}>
              <Button
                onPress={this.addAddress}
                title={"Add " + this.state.current_crypto_name + " Address"}
                color="white"
              ></Button>
            </View>
          </ScrollView>
        </View>

        }
        {this.state.add_cryptos && <View style={{ flex: 2, width: '90%' }}>
          <TouchableHighlight style={{ flexDirection: 'row' }} onPress={this.addMoreCryptos}><Text style={{ marginLeft: 'auto', fontSize: 20, color: "white" }}>X</Text></TouchableHighlight>
          <KeyboardAvoidingView style={{ width: "100%" }} behavior="position" enabled>
            <CustomMultiPicker
              style={{ width: "100%", marginBottom: 60 }}
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
              scrollViewHeight={163}
              selected={[]} // list of options which are selected by default
            />

          </KeyboardAvoidingView>
        </View>

        }


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
        <View style={{ flexDirection: "row", margin: 10 }}>
          {this.state.user_crypto.length < 10 && !this.state.add_cryptos
            ? <View style={{ backgroundColor: "green", borderRadius: 10 }}><Button color="white" title="Add Other Cryptos" onPress={this.addMoreCryptos}></Button></View>
            : null
          }
          {this.state.add_cryptos && <View style={{ backgroundColor: "green", borderRadius: 10 }}><Button title="Update Crypto Portfolio" color="white" onPress={this.updateCryptoPortfolio}></Button></View>
          }
          <View style={{ marginLeft: 10, backgroundColor: "black", borderRadius: 10 }}><Button color="white" title="Logout" onPress={this.handleLogout} /></View>
        </View>
      </View>

    );
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
    flex: 1,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 0,

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
