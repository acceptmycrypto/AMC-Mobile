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
import { LinearGradient } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';

export default class DealsCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      state: undefined,
      states:[
        {label: 'AL', Value: 'Alabama'},{label: 'AK', Value: 'Alaska'},{label: 'AZ', Value: 'Arizona'},{label: 'AR', Value: 'Arkansas'},
        {label: 'CA', Value: 'California'},{label: 'CO', Value: 'Colorado'},{label: 'CT', Value: 'Connecticut'},
        {label: 'DE', Value: 'Delaware'},{label: 'FL', Value: 'Florida'},{label: 'GA', Value: 'Georgia'},{label: 'HI', Value: 'Hawaii'},
        {label: 'ID', Value: 'Idaho'},{label: 'IL', Value: 'Illinois'},{label: 'IN', Value: 'Indiana'},{label: 'IA', Value: 'Iowa'},
        {label: 'KS', Value: 'Kansas'},{label: 'KY', Value: 'Kentucky'},{label: 'LA', Value: 'Louisiana'},
        {label: 'ME', Value: 'Maine'},{label: 'MD', Value: 'Maryland'},{label: 'MA', Value: 'Massachusetts'},{label: 'MI', Value: 'Michigan'},
        {label: 'MN', Value: 'Minnesota'},{label: 'MS', Value: 'Mississippi'},{label: 'MO', Value: 'Missouri'},{label: 'MT', Value: 'Montana'},
        {label: 'NE', Value: 'Nebraska'},{label: 'NV', Value: 'Nevada'},{label: 'NH', Value: 'New Hampshire'},{label: 'NJ', Value: 'New Jersey'},
        {label: 'NM', Value: 'New Mexico'},{label: 'NY', Value: 'New York'},{label: 'NC', Value: 'North Carolina'},{label: 'ND', Value: 'North Dakota'},
        {label: 'OH', Value: 'Ohio'},{label: 'OK', Value: 'Oklahoma'},{label: 'OR', Value: 'Oregon'},{label: 'PA', Value: 'Pennsylvania'},
        {label: 'RI', Value: 'Rhode Island'},{label: 'SC', Value: 'South Carolina'},{label: 'SD', Value: 'South Dakota'},{label: 'TN', Value: 'Tennessee'},
        {label: 'TX', Value: 'Texas'},{label: 'UT', Value: 'Utah'},{label: 'VT', Value: 'Vermont'},{label: 'VA', Value: 'Virginia'},
        {label: 'WA', Value: 'Washington'},{label: 'WV', Value: 'West Virginia'},{label: 'WI', Value: 'Wisconsin'},{label: 'WY', Value: 'Wyoming'},
      ],
      payment: "",
      viewPaymentMethod: false,
      formOfPayment: "",
      paymentSelected: false,
      paymentReceived: false,
    };
  }

  checkAddress = () => {
    if(this.state.fullName && this.state.address && this.state.city && this.state.zipCode && this.state.state){
      this.setState({viewPaymentMethod: true})
    }else{
      this.setState({viewPaymentMethod: false, fadeValue: new Animated.Value(0)})
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
          <Text style={{fontSize: 25, marginBottom: 10, textAlign: 'center', borderBottomColor: '#dbd8ce', borderBottomWidth: 2}}>Shipping</Text>
          <Text style={{fontSize: 12, color: '#cccccc'}}>Full Name</Text>
          <TextInput
            ref="fullName"
            style={styles.inputStyle}
            placeholder="Full name"
            onChangeText={fullName => this.setState({ fullName }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.address.focus()}
          />
          <Text style={{fontSize: 12, color: '#cccccc'}}>Address</Text>
          <TextInput
            ref={address => this.address = address}
            style={styles.inputStyle}
            placeholder="Address"
            onChangeText={address => this.setState({ address }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.city.focus()}
          />
          <Text style={{fontSize: 12, color: '#cccccc'}}>City</Text>
          <TextInput
            ref={city => this.city = city}
            style={styles.inputStyle}
            placeholder="City"
            onChangeText={city => this.setState({ city }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={() => {this.states}}
          />
          {/*State TextInput will be a dropdown menu with USA states*/}
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 100}}>
           { /*<TextInput
              ref={state => this.state_loc = state}
              style={[styles.inputStyle, {width: '98%'}]}
              placeholder="State"
              onChangeText={state => this.setState({ state }, this.checkAddress)}
              returnKeyType={'next'}
              onSubmitEditing={()=>this.zipCode.focus()}
            />*/}
              <Dropdown
                label='State'
                data={this.state.states}
                onChangeText= {(value) => this.setState({state: value,}, this.checkAddress) }
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 12, color: '#cccccc', textAlign: 'left'}}>Zip Code</Text>
              <TextInput
                ref={zipCode => this.zipCode = zipCode}
                keyboardType="numeric"
                style={[styles.inputStyle, {width: '98%'}]}
                maxLength={5}
                placeholder="Zip Code"
                onChangeText={ zipCode => {
                this.setState({zipCode}, this.checkAddress)
                }}
              />
            </View>
          </View>
        </View>
        {/*Payment Method View*/}
        {
          this.state.viewPaymentMethod ?
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

       <View style={{ flex: 1, flexDirection: 'column' ,marginTop: 10, alignItems: 'center', justifyContent: 'flex-end', position: 'relative', bottom: 0 }}>
         <TouchableOpacity
           style={{
             paddingTop:20,
             paddingBottom:20,
           }}
         >
           <LinearGradient
             colors={ this.state.paymentReceived ? ['#fff4cc','#efb404','#d1a31d'] : ['#ffffff','#cccccc','#999999']}
             style={{
               borderWidth: 1,
               borderRadius: 5, width:390, padding: 15, alignItems: 'center', borderRadius: 5,}}>
             <Text
               style={{
                 backgroundColor: 'transparent',
                 fontSize: 15,
                 color: 'black',
               }}>
               Checkout
             </Text>
           </LinearGradient>
         </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderColor: '#2e4158',
    backgroundColor: 'white',
    marginBottom: 5,
    height: 40,
    paddingHorizontal: 5,
  },
});