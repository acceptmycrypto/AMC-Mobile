import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  AsyncStorage,
  BackHandler,
  Clipboard,
  Alert
  } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { _verifier, _loadCryptocurrencies } from "../../../../src/services/AuthService";
import { LinearGradient } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import { _fetchTransactionInfo } from '../../../../src/services/DealServices';
import TimerCountdown from 'react-native-timer-countdown';

export default class DealsCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      state: "",
      states:[ {label: 'AL', value: 'Alabama'},{label: 'AK', value: 'Alaska'},{label: 'AZ', value: 'Arizona'},{label: 'AR', value: 'Arkansas'},
        {label: 'CA', value: 'California'},{label: 'CO', value: 'Colorado'},{label: 'CT', value: 'Connecticut'},
        {label: 'DE', value: 'Delaware'},{label: 'FL', value: 'Florida'},{label: 'GA', value: 'Georgia'},{label: 'HI', value: 'Hawaii'},
        {label: 'ID', value: 'Idaho'},{label: 'IL', value: 'Illinois'},{label: 'IN', value: 'Indiana'},{label: 'IA', value: 'Iowa'},
        {label: 'KS', value: 'Kansas'},{label: 'KY', value: 'Kentucky'},{label: 'LA', value: 'Louisiana'},
        {label: 'ME', value: 'Maine'},{label: 'MD', value: 'Maryland'},{label: 'MA', value: 'Massachusetts'},{label: 'MI', value: 'Michigan'},
        {label: 'MN', value: 'Minnesota'},{label: 'MS', value: 'Mississippi'},{label: 'MO', value: 'Missouri'},{label: 'MT', value: 'Montana'},
        {label: 'NE', value: 'Nebraska'},{label: 'NV', value: 'Nevada'},{label: 'NH', value: 'New Hampshire'},{label: 'NJ', value: 'New Jersey'},
        {label: 'NM', value: 'New Mexico'},{label: 'NY', value: 'New York'},{label: 'NC', value: 'North Carolina'},{label: 'ND', value: 'North Dakota'},
        {label: 'OH', value: 'Ohio'},{label: 'OK', value: 'Oklahoma'},{label: 'OR', value: 'Oregon'},{label: 'PA', value: 'Pennsylvania'},
        {label: 'RI', value: 'Rhode Island'},{label: 'SC', value: 'South Carolina'},{label: 'SD', value: 'South Dakota'},{label: 'TN', value: 'Tennessee'},
        {label: 'TX', value: 'Texas'},{label: 'UT', value: 'Utah'},{label: 'VT', value: 'Vermont'},{label: 'VA', value: 'Virginia'},
        {label: 'WA', value: 'Washington'},{label: 'WV', value: 'West Virginia'},{label: 'WI', value: 'Wisconsin'},{label: 'WY', value: 'Wyoming'}
      ],
      amount: "",
      viewPaymentMethod: false,
      cryptoOptions: [],
      crypto_name: "",
      crypto_symbol: "",
      paymentSelected: false,
      transactionData: "",
      paymentReceived: false,
      deal_id: "",
      deal_name: "",
      featured_deal_image: "",
      pay_in_dollar: "",
      pay_in_crypto: "",
      size: "",
      color: "",
      timeout: null
    };
  }
  cancelPurchase = () => {
    this.setState({
      transactionData: "",
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      state: "",
      amount: "",
      crypto_name: "",
      crypto_symbol: "",
      viewPaymentMethod: false,
      paymentReceived: false,
      paymentSelected: false
    });
    this.props.navigation.navigate('Deals', {});
  }

  changePayment = () => {
    this.setState({
      transactionData: "",
      paymentSelected: false,
    });
  }

  checkAddress = () => {
    if(this.state.fullName && this.state.address && this.state.city && this.state.zipCode && this.state.state){
      this.setState({viewPaymentMethod: true});
    }else{
      this.setState({viewPaymentMethod: false, fadeValue: new Animated.Value(0)});
    }
  }

  fadeInAnimation = () => {
    Animated.timing(this.state.fadeValue,{
      toValue: 1,
      duration: 750,
    }).start()
  }

  getQRCode = async () => {
    const value = await AsyncStorage.getItem("token");
    let token = JSON.parse(JSON.stringify(value));
    console.log("what are you token? : " + token);

    let crypto_name = this.state.crypto_name;
    let crypto_symbol = this.state.crypto_symbol;
    let deal_id = this.state.deal_id;
    let amount = this.state.pay_in_crypto;
    let shippingAddress = this.state.address;
    let shippingCity = this.state.city;
    let zipcode = this.state.zipCode;
    let shippingState = this.state.state;
    let fullName = this.state.fullName;
    let selectedSize = this.state.size;
    let selectedColor = this.state.color;

    try {
      if (token !== null) {
        return _fetchTransactionInfo(
          crypto_name,
          crypto_symbol,
          deal_id,
          amount,
          token,
          shippingAddress,
          shippingCity,
          zipcode,
          shippingState,
          fullName,
          selectedSize,
          selectedColor
        ).then(
          transactionData => {
            this.setState({ transactionData });
            console.log(this.state.transactionData);
            console.log(this.state.transactionData.timeout);
            this.setState({timeout: this.state.transactionData.timeout});
          }, function(err){console.log(err);})
      }
    }catch (error) {
      console.log(error);
    }
  };

  checkToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        // let token = JSON.stringify(value);
        console.log("TOKEN!!" + value);
        return _verifier(value).then(res => {
          let tokenStr = JSON.stringify(res.verifiedToken);
          let userData = JSON.parse(tokenStr);
          console.log("STRING RETURN!!" + tokenStr);
          console.log("PARSED RETURN!!" + userData);
          if (userData.name === "TokenExpiredError") {
            Alert.alert("Session has expired");
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
      console.log("NO TOKEN!!!" + error);
    }
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack();
      return true;
    });
    const { navigation } = this.props;
      this.setState({
        deal_id: navigation.getParam('deal_id', ''),
        deal_name: navigation.getParam('deal_name', ''),
        featured_deal_image: navigation.getParam('featured_deal_image', ''),
        pay_in_dollar: navigation.getParam('pay_in_dollar',''),
        pay_in_crypto: navigation.getParam('pay_in_crypto',''),
        size: navigation.getParam('size', ''),
        color: navigation.getParam('color', '')
      });
  }

  componentWillMount() {
    this.checkToken();

    _loadCryptocurrencies().then(cryptos => {
      let cryptoOptions = [];

      cryptos.map(crypto => {
        let optionObj = {};
        optionObj.value = {crypto_symbol: crypto.crypto_symbol, crypto_name: crypto.crypto_metadata_name};
        optionObj.label = crypto.crypto_metadata_name + " (" + crypto.crypto_symbol + ")";

        cryptoOptions.push(optionObj);
      });
      this.setState({ cryptoOptions });
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    return (
    <View style={styles.container}>
      {/*Will include a sticky section at the top from previous page with the deals info but in a smaller form*/}
      <View style={{borderBottomColor: '#dbd8ce',
        borderBottomWidth: 1,
        flexDirection: 'row',
        padding: 10,}}>
        <Image
          style={{alignItems: 'center', width: 58, height: 58}}
          source={{uri:this.state.featured_deal_image}}
          />
        <View style={{flex:1, flexDirection:'column', marginLeft: 10,}}>
          <Text style={{fontWeight: 'bold', }}>{this.state.deal_name} </Text>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <View style={{flexDirection: 'row',width:'40%' }}>
              <Text style={{fontWeight: 'bold', }}>Size: </Text><Text>{this.state.size} </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 2}}>
              <Text style={{fontWeight: 'bold',}}>Color:</Text><Text> {this.state.color} </Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection: 'row', width: '40%'}}>
            <Text style={{fontWeight: 'bold', }}>Price: </Text><Text>${this.state.pay_in_dollar}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'green'}}>Cryptocurrency:</Text><Text style={{color: 'green'}}> ${this.state.pay_in_crypto}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        alwaysBounceVertical={true}
        keyboardDismissMode="on-drag"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
      >
        {/*Address View*/}
        <View style={[styles.postStyle, {borderBottomColor: '#000000', borderBottomWidth: 2, marginBottom: 10}]}>
          <Text style={{fontSize: 25, marginVertical: 5, borderBottomColor: '#dbd8ce', borderBottomWidth: 2, fontWeight: 'bold'}}>Shipping:</Text>
          <Text style={{fontSize: 16,}}>Full Name</Text>
          <TextInput
            ref="fullName"
            style={styles.inputStyle}
            placeholder="ex: John Smith"
            onChangeText={fullName => this.setState({ fullName }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.address.focus()}
          />
          <Text style={{fontSize: 16,}}>Address</Text>
          <TextInput
            ref={address => this.address = address}
            style={styles.inputStyle}
            placeholder="Ex: 123 Main Street"
            onChangeText={address => this.setState({ address }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.city.focus()}
          />
          <Text style={{fontSize: 16,}}>City</Text>
          <TextInput
            ref={city => this.city = city}
            style={styles.inputStyle}
            placeholder="Ex: San Francisco"
            onChangeText={city => this.setState({ city }, this.checkAddress)}
            returnKeyType={'next'}
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 125}}>
              <Dropdown
                baseColor="#000000"
                textColor="#000000"
                label='State'
                data={this.state.states}
                onChangeText= {(value, index) => this.setState({state: value,}, this.checkAddress) }
              />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <Text style={{fontSize: 16, textAlign: 'left'}}>Zip Code</Text>
              <TextInput
                ref={zipCode => this.zipCode = zipCode}
                keyboardType="numeric"
                style={[styles.inputStyle, {width: '95%'}]}
                maxLength={5}
                placeholder=""
                onChangeText={ zipCode => {
                this.setState({zipCode})
                }}
                returnKeyType={'done'}
                onSubmitEditing={() => {this.checkAddress()}}
              />
            </View>
          </View>
        </View>
        {/*Payment Method View*/}
        {
          this.state.viewPaymentMethod ?
            <Animated.View style={[styles.postStyle,{opacity: this.state.fadeValue, marginBottom: 10}]}>
              {this.fadeInAnimation()}
              <Text style={{fontSize: 25,fontWeight: 'bold', paddingVertical: 5, borderBottomColor: '#dbd8ce', borderBottomWidth: 2,}}>Form of Payment:</Text>
              <View style={{width: '100%'}}>
                <Dropdown
                  baseColor="#999999"
                  label='Select form of cryptocurrency'
                  data={this.state.cryptoOptions}
                  onChangeText= {(value, index) => {
                    this.setState({crypto_name: value.crypto_name, crypto_symbol: value.crypto_symbol, paymentSelected: true}, this.getQRCode)}}
                />
                {/*Image of QR code load here*/}
                {
                  (this.state.paymentSelected && this.state.transactionData) ?
                    <View>
                      <Modal
                        isVisible={this.state.transactionData != ""}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                      >
                        <View style={{
                          backgroundColor: "white",
                          padding: 22,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 4,
                          borderColor: "rgba(0, 0, 0, 0.1)"}}
                        >
                          <View>
                            <Text>Please send <Text style={{fontWeight: 'bold'}}>{this.state.transactionData.amount + " " + this.state.crypto_symbol}</Text> to the below address: </Text>
                            <Text>
                              AcceptMyCrypto Payment Address: { ' ' }
                              <Text
                                style={{fontWeight: 'bold'}}
                                selectable={true}
                                onPress={() => {
                                  Clipboard.setString(
                                    this.state.transactionData.txn_id
                                  );
                                  Alert.alert(
                                    "Payment Address has been copied, please proceed to your Crypto Wallet to Pay"
                                  );
                                }}
                              >
                                {this.state.transactionData.txn_id}
                              </Text>
                            </Text>
                          </View>
                          <View style={{justifyContent: 'center', alignItems: 'center', margin: 10, borderWidth: 2,}}>
                            <Image
                              style={{width: 300, height: 300,}}
                              source={{uri: this.state.transactionData.qrcode_url}}
                            />
                          </View>
                          {/*Countdown timer*/}
                          <View>
                            <Text>*Your order will cancel in {' '}
                              <Text style={{color: 'green', fontWeight: 'bold'}}>
                              {/*Timer goes here*/}
                                 <TimerCountdown
                                    initialSecondsRemaining={1000*this.state.transactionData.timeout}
                                    onTimeElapsed={() => this.setState({timeout: 0})}
                                    allowFontScaling={true}
                                    style={{ fontSize: 20 }}
                                 />
                                 { this.state.timeout == 0 ? this.cancelPurchase : null }
                              </Text>
                            </Text>
                          </View>

                          {/*Touchable to change form of payment or cancel*/}
                          {/* <View style={{width: '100%', height: 40 ,backgroundColor: '#66dac7', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 10}}> */}
                            <TouchableOpacity
                              style={{
                                width: '100%', 
                                height: 40 ,
                                backgroundColor: '#66dac7', 
                                borderRadius: 5, 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                marginVertical: 10
                              }} 
                              onPress={this.cancelPurchase}>
                              <Text style={{textAlign: 'center', color: 'green', fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                            </TouchableOpacity>
                         {/* </View> */}
                         {/*<View style={{width: '100%', height: 40 ,backgroundColor: 'red', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
                           <TouchableOpacity onPress={this.cancelPurchase}>
                             <Text style={{textAlign: 'center', color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Cancel Payment</Text>
                           </TouchableOpacity>
                          </View>*/}
                        </View>
                      </Modal>
                    </View>
                  : null
                }
              </View>
            </Animated.View>
          : null
         }
         {/*Checkout Button*/}
         <View style={{ flex: 1, flexDirection: 'column',}}>
           <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
             }}
           >
             <LinearGradient
             colors={ this.state.paymentReceived ? ['#fff4cc','#efb404','#d1a31d'] : ['#ffffff','#cccccc','#999999']}
             style={{flex: 1, borderWidth: 1, borderRadius: 5, padding: 15, width: 300,justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
               <Text
               style={{
               backgroundColor: 'transparent',
               fontSize: 15,
               color: 'black',
               textAlign: 'center',
               }}>
                 {
                  !this.state.viewPaymentMethod ?
                  "Proceed to Payment Method"
                  :
                  !this.state.paymentReceived ?
                  "Generate Payment Address"
                  :
                  "Review Order"
                 }
               </Text>
             </LinearGradient>
           </TouchableOpacity>
         </View>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  postStyle: {
    marginHorizontal: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#2e4158",
    backgroundColor: "white",
    marginBottom: 5,
    height: 40,
    paddingHorizontal: 5,
  },
});
