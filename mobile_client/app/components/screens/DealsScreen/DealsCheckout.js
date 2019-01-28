import * as React from "react";
import {
  StyleSheet,
  Alert,
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
  Linking,
  Picker
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import {
  _verifier,
  _loadCryptocurrencies
} from "../../../../src/services/AuthService";
import { LinearGradient } from "expo";
import { Dropdown } from "react-native-material-dropdown";
import { _fetchTransactionInfo } from "../../../../src/services/DealServices";
import TimerCountdown from "react-native-timer-countdown";
import { states, DealItem, Shipping } from "./Checkout/Shipping";

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
      amount: "",
      cryptoOptions: [],
      crypto_name: "",
      crypto_symbol: "",
      transactionData: "",
      deal_id: "",
      deal_name: "",
      featured_deal_image: "",
      pay_in_dollar: "",
      pay_in_crypto: "",
      size: "",
      color: "",
      timeout: null,
      viewPaymentMethod: false,
      paymentSelected: false,
      paymentReceived: false,
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
    this.props.navigation.navigate("Deals", {});
  };

  changePayment = () => {
    this.setState({
      transactionData: "",
      paymentSelected: false
    });
  };

  checkAddress = () => {
    if (
      this.state.fullName &&
      this.state.address &&
      this.state.city &&
      this.state.zipCode &&
      this.state.state
    ) {
      this.setState({ viewPaymentMethod: true });
    } else {
      this.setState({
        viewPaymentMethod: false,
        fadeValue: new Animated.Value(0)
      });
    }
  };

  fadeInAnimation = () => {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 750
    }).start();
  };

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
            this.setState({ timeout: this.state.transactionData.timeout });
          },
          function(err) {
            console.log(err);
          }
        );
      }
    } catch (error) {
      console.log(err);
    }
  };

  redirect = () => {
    Clipboard.setString(this.state.transactionData.txn_id);
    Alert.alert("Payment Address has been copied, redirecting to CoinBase...");
    setTimeout(() => {
      Linking.canOpenURL("Coinbase://app")
        .then(supported => {
          if (!supported) {
            Linking.openURL("https://coinbase.com");
          } else {
            return Linking.openURL("Coinbase://app");
          }
        })
        .catch(err => console.error("An error occurred", err));
    }, 2500);
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
      deal_id: navigation.getParam("deal_id", ""),
      deal_name: navigation.getParam("deal_name", ""),
      featured_deal_image: navigation.getParam("featured_deal_image", ""),
      pay_in_dollar: navigation.getParam("pay_in_dollar", ""),
      pay_in_crypto: navigation.getParam("pay_in_crypto", ""),
      size: navigation.getParam("size", ""),
      color: navigation.getParam("color", "")
    });
  }

  componentWillMount() {
    this.checkToken();

    _loadCryptocurrencies().then(cryptos => {
      let cryptoOptions = [];

      cryptos.map(crypto => {
        let optionObj = {};
        optionObj.value = {
          crypto_symbol: crypto.crypto_symbol,
          crypto_name: crypto.crypto_metadata_name
        };
        optionObj.label =
          crypto.crypto_metadata_name + " (" + crypto.crypto_symbol + ")";

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
        <DealItem
          dealImage = {this.state.featured_deal_image}
          dealName = {this.state.deal_name}
          size = {this.state.size}
          color = {this.state.color}
          dollar = {this.state.pay_in_dollar}
          crypto = {this.state.pay_in_crypto}
        />
        <ScrollView
          alwaysBounceVertical={true}
          keyboardDismissMode="on-drag"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
        >
          {/*Address View*/}
          <View style={styles.postStyle}>
           { !this.state.viewPaymentMethod ? (
           <View>
             <Text
                style={{
                  fontSize: 25,
                  marginVertical: 5,
                  borderBottomColor: "#dbd8ce",
                  borderBottomWidth: 2,
                  fontWeight: "bold"
                }}
              >
                Shipping:
              </Text>
              <Text style={{ fontSize: 16 }}>Full Name</Text>
              <TextInput
                ref="fullName"
                style={styles.inputStyle}
                placeholder="ex: John Smith"
                onChangeText={fullName =>
                  this.setState({ fullName }, this.checkAddress)
                }
                returnKeyType={"next"}
                onSubmitEditing={() => this.address.focus()}
              />
              <Text style={{ fontSize: 16 }}>Address</Text>
              <TextInput
                ref={address => (this.address = address)}
                style={styles.inputStyle}
                placeholder="Ex: 123 Main Street"
                onChangeText={address =>
                  this.setState({ address }, this.checkAddress)
                }
                returnKeyType={"next"}
                onSubmitEditing={() => this.city.focus()}
              />
              <Text style={{ fontSize: 16 }}>City</Text>
              <TextInput
                ref={city => (this.city = city)}
                style={styles.inputStyle}
                placeholder="Ex: San Francisco"
                onChangeText={city => this.setState({ city }, this.checkAddress)}
                returnKeyType={"next"}
              />
              <View style={{ flex: 1, flexDirection: "row" }}>
                  {/*<Dropdown
                    baseColor="#000000"
                    textColor="#000000"
                    label="State"
                    data={states}
                    onChangeText={(value, index) =>
                      this.setState({ state: value[index] }, this.checkAddress)
                    }
                  />*/}
                  <Picker
                    style={{width: "50%", borderWidth: 1, marginTop: 5}}
                    selectedValue={this.state.state}
                    onValueChange={(value, index) => this.setState({state: value})}
                  >
                    <Picker.Item label="Select State" value=""/>
                    {states.map(state => {
                      return(
                        <Picker.Item
                          label={state.label + "  -  " + state.value} value={state.value}
                        />) })
                    }
                  </Picker>
                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text style={{ fontSize: 16, textAlign: "left" }}>
                    Zip Code
                  </Text>
                  <TextInput
                    ref={zipCode => (this.zipCode = zipCode)}
                    keyboardType="numeric"
                    style={[styles.inputStyle, { width: "50%" }]}
                    maxLength={5}
                    placeholder=""
                    onChangeText={zipCode => {
                      this.setState({ zipCode });
                    }}
                    returnKeyType={"done"}
                    onSubmitEditing={() => {
                      this.checkAddress();
                    }}
                  />
                </View>
              </View>
            </View>
            ) : (
              <Shipping
                fullName={this.state.fullName}
                address={this.state.address}
                city={this.state.city}
                state={this.state.state}
                zipCode={this.state.zipCode}
              />
            )}
            {/*Payment Method View*/}
            {this.state.viewPaymentMethod ? (
              <Animated.View
                style={[
                  styles.postStyle,
                  { opacity: this.state.fadeValue }
                ]}
              >
                {this.fadeInAnimation()}
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    paddingVertical: 5,
                    borderBottomColor: "#dbd8ce",
                    borderBottomWidth: 2
                  }}
                >
                  Form of Payment:
                </Text>
                <View style={{ width: "100%" }}>
                  <Dropdown
                    baseColor="#999999"
                    label="Select form of cryptocurrency"
                    data={this.state.cryptoOptions}
                    onChangeText={(value, index) => {
                      this.setState(
                        {
                          crypto_name: value.crypto_name,
                          crypto_symbol: value.crypto_symbol,
                          paymentSelected: true
                        },
                        this.getQRCode
                      );
                    }}
                  />
                  {/*Image of QR code load here*/}
                  {this.state.paymentSelected && this.state.transactionData ? (
                    <View>
                      <Modal
                        isVisible={this.state.transactionData != ""}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                      >
                        <View
                          style={{
                            backgroundColor: "white",
                            padding: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            borderColor: "rgba(0, 0, 0, 0.1)"
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              margin: 5,
                              padding: 15,
                              borderWidth: 2,
                              borderRadius: 5
                            }}
                          >
                            <View>
                              <Text>
                                Please send{" "}
                                <Text style={{ fontWeight: "bold" }}>
                                  {this.state.transactionData.amount +
                                    " " +
                                    this.state.crypto_symbol}
                                </Text>{" "}
                                to the below address:{" "}
                              </Text>
                              <Text>AcceptMyCrypto Payment Address: </Text>
                              <View
                                style={{
                                  borderWidth: 2,
                                  padding: 2,
                                  backgroundColor: "#ffffcc"
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    textAlign: "center"
                                  }}
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
                              </View>
                            </View>
                            <TouchableOpacity
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 10,
                                borderWidth: 2
                              }}
                              onPress={this.redirect}
                            >
                              <Image
                                style={{ width: 300, height: 300 }}
                                source={{
                                  uri: this.state.transactionData.qrcode_url
                                }}
                              />
                            </TouchableOpacity>
                            {/*Countdown timer*/}
                            <View>
                              <Text>
                                *Your order will cancel in{" "}
                                <Text
                                  style={{ color: "green", fontWeight: "bold" }}
                                >
                                  {/*Timer goes here*/}
                                  <TimerCountdown
                                    initialSecondsRemaining={
                                      1000 * this.state.transactionData.timeout
                                    }
                                    onTimeElapsed={() =>
                                      this.setState({ timeout: 0 })
                                    }
                                    allowFontScaling={true}
                                    style={{ fontSize: 20 }}
                                  />
                                  {this.state.timeout == 0
                                    ? this.cancelPurchase
                                    : null}
                                </Text>
                              </Text>
                            </View>

                            {/*Touchable to change form of payment or cancel*/}
                            <View
                              style={{
                                width: 300,
                                height: 40,
                                backgroundColor: "#66dac7",
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                marginVertical: 10
                              }}
                            >
                              <TouchableOpacity onPress={this.cancelPurchase}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#ffffff",
                                    fontSize: 20,
                                    fontWeight: "bold"
                                  }}
                                >
                                  Done
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  ) : null}
                </View>
              </Animated.View>
            ) : null}
            {/*Checkout Button*/}
            {/*<View style={{ flex: 1, flexDirection: "column" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LinearGradient
                  colors={
                    this.state.paymentReceived
                      ? ["#fff4cc", "#efb404", "#d1a31d"]
                      : ["#ffffff", "#cccccc", "#999999"]
                  }
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 15,
                    width: 300,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "transparent",
                      fontSize: 15,
                      color: "black",
                      textAlign: "center"
                    }}
                  >
                    {!this.state.viewPaymentMethod
                      ? "Proceed to Payment Method"
                      : !this.state.paymentReceived
                      ? "Generate Payment Address"
                      : "Review Order"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>*/}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignSelf: "stretch"
  },
  postStyle: {
    marginHorizontal: 10,
    marginBottom: 10
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "#2e4158",
    backgroundColor: "white",
    marginBottom: 5,
    height: 40,
    paddingHorizontal: 5
  }
});
