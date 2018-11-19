import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Button } from "react-native-elements";
import { _verifier } from "../../../../src/AuthentificationService";
import Icon from "react-native-vector-icons/FontAwesome";
import { _loadOnePosts } from './PostService';
import { LinearGradient } from 'expo';

export default class PostInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
      id: "",
      deal_name:"",
      description:"",
      featured_deal_image:"",
      pay_in_dollar:"",
      pay_in_crypto:""
    }
  };
  
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

  // componentWillReceiveProps(){
  //   this.setState({
  //     isLoading: false,
  //   })
  // }
  
  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100);
  };

  getSavings = (priceInDollar, priceInCrypto) => {
    console.log("Line 83 price: " + priceInDollar);
    console.log("Line 83 price: " + priceInCrypto);
    console.log(priceInDollar-priceInCrypto)
    return Math.round((priceInDollar - priceInCrypto) *  100)/ 100;
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      id: navigation.getParam('id', 'Data Not Available'),
      deal_name: navigation.getParam("deal_name", "N/A"),
      description: navigation.getParam("description", "N/A"),
      featured_deal_image: navigation.getParam("featured_deal_image", "N/A"),
      pay_in_dollar: navigation.getParam("pay_in_dollar", "N/A"),
      pay_in_crypto: navigation.getParam("pay_in_crypto", "N/A")  
    });

    // return _loadOnePosts(id).then(resJSON => {
    //   console.log("Line 85");
    //   console.log(resJSON);
    //   this.setState(
    //     {
    //       isLoading: false,
    //       data: resJSON
    //     },
    //     function() {}
    //   );
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  checkOutPage = post => {
    console.log("LINE 115 IN POST.JS FILE: " + JSON.stringify(post));
    this.props.navigation.navigate('AddPost', { 
      id: post.id,
      deal_name: post.deal_name,
      description: post.deal_description,
      featured_deal_image: post.featured_deal_image,
      pay_in_dollar: post.pay_in_dollar,
      pay_in_crypto: post.pay_in_crypto
     });
  };

  render() {

    // if(this.state.isLoading){
    //   return (
    //     <View>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    console.log(this.state);
    return(
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={{ maxWidth: '100%', height: 250 }}
            source={{ url: this.state.featured_deal_image }}
          />
          <View style={styles.description}>
            <View style={{ 
              flexDirection: 'row' ,
              borderBottomColor: 'black',
              borderBottomWidth: 1 
            }}>
              <Text
                style={{
                  maxWidth: '100%',
                  fontSize: 20,
                  padding: 10,                  
                }}
              >      
                {this.state.description}
              </Text>
            </View>
            <View style={{ 
              flex: 3,
              flexDirection: 'row',
              padding: 10,
              }}>                
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <Text style={{
                      textAlign: 'right', 
                      fontSize: 13,
                      marginLeft: 0,
                      opacity: 0.54,
                    }}>
                    Dollar Price:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      textAlign: 'left', 
                      fontSize: 13,
                    }}
                  >      
                    {"$"+this.state.pay_in_dollar}
                  </Text>
                </View>
            </View>
            <View style={{ 
              flex: 3,
              flexDirection: 'row',
              padding: 10,
              }}>                
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <Text style={{
                      textAlign: 'right', 
                      fontSize: 15,
                      marginRight: 0,
                      opacity: 0.54,
                    }}>
                    Crypto Price:
                  </Text>
                  <Text
                    style={{
                      marginLeft: 0,
                      textAlign: 'left', 
                      fontSize: 15,
                    }}
                  >      
                    {"$"+this.state.pay_in_crypto}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      textAlign: 'left', 
                      fontSize: 15,
                      color: 'green',
                      borderWidth: 2,
                      borderColor: 'green',
                      borderRadius: 5
                    }}
                  >      
                    {' ' + this.convertToPercentage(
                    this.state.pay_in_dollar,
                    this.state.pay_in_crypto
                    ) +
                    '% OFF '}
                  </Text>
                  <Text style={{
                      marginLeft: 5,
                      textAlign: 'left', 
                      fontSize: 14,
                      color: 'blue',
                    }}>
                    FREE shipping
                  </Text>
                </View>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
          style={{                      
            borderWidth: 1,
            borderRadius: 5
          }}
          key={this.state.id}
          onPress={() => this.checkOutPage(this.state)}>
            <LinearGradient
              colors={[  '#fff4cc','#efb404','#d1a31d']}
              style={{width:300, padding: 15, alignItems: 'center', borderRadius: 5 }}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    // flexDirection: 'column',
  },
  description: {
    flex: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
  },
  // checkoutButton: {
  //   textAlign: 'center', 
  //   margin: 5,
  //   borderRadius: 25,
  //   backgroundColor: '#52c4b9',
  //   width: '70%',
  //   marginTop: 10,
  //   marginBottom: 15
  // },
  buttonText: {
    height: 30,
    backgroundColor: '#52c4b9',
    color: '#fff',
    padding: 7,
    margin: 5,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '500'
  }
});
