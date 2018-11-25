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
  Animated
} from 'react-native';
import { Button } from 'react-native-elements';
import { _verifier } from "../../../../src//services/AuthService";

//creates a class for FadeIn View Animation
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class DealsCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      full_name: "",
      address: "",
      city: "",
      postal_code: "",
      state: "",
      status: false
    };
  }

  checkAddress = () => {
    if(this.state.full_name && this.state.address && this.state.city && this.state.postal_code && this.state.state){
      this.setState({status: true})
    }else{
      this.setState({status: false})
    }
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
      //Address View
        <View style={styles.postStyle}>
          <Text style={{fontSize: 20, marginBottom: 5}}>Shipping</Text>
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
          <TextInput
            ref={state => this.state_loc = state}
            style={styles.inputStyle}
            placeholder="State"
            onChangeText={state => this.setState({ state }, this.checkAddress)}
            returnKeyType={'next'}
            onSubmitEditing={()=>this.postal_code.focus()}
          />
          <TextInput
            ref={postal_code => this.postal_code = postal_code}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Zip Code"
            onChangeText={ postal_code => {
            this.setState({postal_code}, this.checkAddress)
            }}
            returnKeyType={'done'}
          />
        </View>
        {
        this.state.status ?
        <FadeInView>
          <TextInput
            ref={postal_code => this.postal_code = postal_code}
            keyboardType="numeric"
            style={styles.inputStyle}
            placeholder="Zip Code"
            onChangeText={ postal_code => {
            this.setState({postal_code}, this.checkAddress)
            }}
            returnKeyType={'done'}
          />
        </FadeInView>
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
  },
});
