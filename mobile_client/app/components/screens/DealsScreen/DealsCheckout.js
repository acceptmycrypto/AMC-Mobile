import * as React from 'react';
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
  } from 'react-native';
import { Button } from 'react-native-elements';
import { _verifier } from "../../../../src//services/AuthService";

export default class DealsCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      full_name: "",
      address: "",
      city: "",
      postal_code: "",
      state: "",
      paymentViewStatus: false,
      payment: ""
    };
  }

  checkAddress = () => {
    if(this.state.full_name && this.state.address && this.state.city && this.state.postal_code && this.state.state){
      this.setState({paymentViewStatus: true})
    }else{
      this.setState({paymentViewStatus: false, fadeValue: new Animated.Value(0)})
    }
  }

   fadeInAnimation = () => {
    Animated.timing(this.state.fadeValue,{
      toValue: 1,
      duration: 750,
    }).start()
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
            Alert.alert('Session has expired');
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

  componentWillMount() {
    this.checkToken();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/*Will include a sticky section at the top from previous page with the deals info but in a smaller form*/}
        {/*Address View*/}
        <View style={styles.postStyle}>
          <Text style={{fontSize: 25, marginBottom: 5, textAlign: 'center'}}>Shipping</Text>
          <TextInput
            ref="full_name"
            style={styles.inputStyle}
            placeholder="Full name"
            onChangeText={full_name => this.setState({ full_name }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.address.focus()}
          />
          <TextInput
            ref={address => this.address = address}
            style={styles.inputStyle}
            placeholder="Address"
            onChangeText={address => this.setState({ address }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.city.focus()}
          />
          <TextInput
            ref={city => this.city = city}
            style={styles.inputStyle}
            placeholder="City"
            onChangeText={city => this.setState({ city }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.state_loc.focus()}
          />
          {/*State TextInput will be a dropdown menu with USA states*/}
          <TextInput
            ref={state => this.state_loc = state}
            style={[styles.inputStyle, {width: '50%'}]}
            placeholder="State"
            onChangeText={state => this.setState({ state }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.postal_code.focus()}
          />
          <TextInput
            ref={postal_code => this.postal_code = postal_code}
            keyboardType="numeric"
            style={[styles.inputStyle, {width: '50%'}]}
            placeholder="Zip Code"
            onChangeText={ postal_code => {
            this.setState({postal_code}, this.checkAddress)
            }}
          />
        </View>
        {/*Payment Method View*/}
        {
          this.state.paymentViewStatus ?
            <Animated.View style={[styles.postStyle,{opacity: this.state.fadeValue}]}>
              {this.fadeInAnimation()}
              <Text style={{fontSize: 25, marginBottom: 5, textAlign: 'center'}}>Form of Payment</Text>
              {/*This TextInput needs to be a dropdown*/}
              <TextInput
                ref="payment_type"
                style={styles.inputStyle}
                placeholder="Form of Payment"
                onChangeText={ payment => this.setState({ payment })}
                returnKeyType={'done'}
              />
            </Animated.View>
          : null
         }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
  postStyle: {
    marginHorizontal: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: '#2e4158',
    backgroundColor: 'white',
    marginBottom: 5,
    height: 30,
    paddingHorizontal: 5,
  },
});
