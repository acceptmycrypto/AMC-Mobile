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
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import { Button } from "react-native-elements";
import { _verifier } from "../../../../src/services/AuthService";
import Icon from "react-native-vector-icons/FontAwesome";
import { _loadOnePosts } from './DealsService';
import { LinearGradient } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';

export default class PostInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: {},
      id: "",
      deal_id: "",
      deal_name:"",
      description:"",
      featured_deal_image:"",
      pay_in_dollar:"",
      pay_in_crypto:"",
      size: "",
      color: "",
      checkedbox1: null,
      checkedbox2: null,
      sizeOption: [{value: 'Small',}, {value: 'Medium',}, {value: 'Large',}],
      colorOption: [{value: 'Red',}, {value: 'Blue',}, {value: 'Green',}]
    }
  };
  
  // checkOutpage = (post,theView) => {
  //   console.log("LINE 115 IN POST.JS FILE: " + JSON.stringify(post));
  //   theView.scrollToEnd();
  //     this.props.navigation.navigate('DealsInfo', { 
  //       id: post.id,
  //       deal_name: post.deal_name,
  //       description: post.deal_description,
  //       featured_deal_image: post.featured_deal_image,
  //       pay_in_dollar: post.pay_in_dollar,
  //       pay_in_crypto: post.pay_in_crypto,
  //       size: post.size,
  //       color: post.color
  //     });
  // };

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
    return Math.round((priceInDollar - priceInCrypto) *  100)/ 100;
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      deal_id: navigation.getParam('id', 'Data Not Available'),
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

  checkOutPage = (post,theView) => {
    console.log("HELLOOOOOOO LINE 141 "+ JSON.stringify(theView))
    this.scrollView.scrollToEnd();
    if (this.state.color == "" && this.state.size == "") {
      this.setState({checkedbox1: false, checkedbox2: false});
    }
    else if(this.state.size == "") {
      this.setState({checkedbox1: false, checkedbox2: true});
    }
    else if (this.state.color == "") {
      this.setState({checkedbox2: false, checkedbox1: true});
    } 
    else if(this.state.size != "" && this.state.color != "") {
      this.setState({checkedbox1: true, checkedbox2: true});
      this.props.navigation.navigate('DealsCheckout', {
        deal_id: this.state.deal_id,
        deal_name: this.state.deal_name,
        description: this.state.deal_description,
        featured_deal_image: this.state.featured_deal_image,
        pay_in_dollar: this.state.pay_in_dollar,
        pay_in_crypto: this.state.pay_in_crypto,
        size: this.state.sizeOption,
        color: this.state.colorOption,
      });
    }
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
    let colors = this.state.colorOption;
    let size = this.state.sizeOption;
    return(
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <Image
            style={{ maxWidth: '100%', height: 200 }}
            source={{ url: this.state.featured_deal_image }}
          />
          <View style={styles.description}>
            <View style={{ 
              flexDirection: 'row' ,
            }}>
              <Text
                style={{
                  maxWidth: '100%',
                  fontSize: 20,
                  padding: 10,                  
                }}
              >      
                {this.state.deal_name}
              </Text>
            </View>
            <View style={{ 
              flex: 3,
              flexDirection: 'row',
              padding: 10,
              }}>                
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <Text style={{ 
                      fontSize: 15,
                      marginLeft: 0,
                      opacity: 0.54,
                      width: 90,
                      textAlign: 'right' 
                    }}>
                    Dollar Price:
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left', 
                      fontSize: 15,
                      marginLeft: 10
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
                <View style={{ flexDirection: 'row', padding: 10, width: '100%'}}>
                  <Text style={{
                      fontSize: 15,
                      opacity: 0.54,
                      width: 90,
                      textAlign: 'right', 
                    }}>
                    Crypto Price:
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left', 
                      fontSize: 15,
                      width: 67,
                      marginLeft: 10,                
                    }}
                  >      
                    {"$"+this.state.pay_in_crypto}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center', 
                      fontSize: 15,
                      color: 'green',
                      borderWidth: 2,
                      borderColor: 'green',
                      borderRadius: 5,
                      marginBottom: 20,
                      width:80,
                    }}
                  >      
                    {+ this.convertToPercentage(
                    this.state.pay_in_dollar,
                    this.state.pay_in_crypto
                    ) +
                    '% OFF '}
                  </Text>
                  <Text style={{
                      width: 110,
                      textAlign: 'center', 
                      fontSize: 14,
                      color: 'blue',
                    }}>
                    FREE shipping
                  </Text>
                </View>
            </View>
          </View>
          <View style={{ 
            flex: 3,
            flexDirection: 'row',
            padding: 10,
            }}>                
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{
                    textAlign: 'left', 
                    fontSize: 20,
                    marginLeft: 0,
                  }}>
                  Item Description
                </Text>
              </View>
          </View>
          <View style={{ 
            flex: 3,
            flexDirection: 'row',
            padding: 10,
            borderBottomColor: '#dbd8ce',
            borderBottomWidth: 1,
          }}>                
            <View style={{ flexDirection: 'row', padding: 10, flex: 3 }}>
              <Text style={{
                  textAlign: 'left', 
                  fontSize: 13,
                  marginLeft: 0,
                  flex: 1,
                  flexWrap: 'wrap'
              }}>
                {this.state.description}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between',               borderBottomColor: '#dbd8ce',
              borderBottomWidth: 1, }}>     
            <View style={{marginLeft: 20, width: 150}}>
            {this.state.checkedbox1 == false && <Text style={{color: 'red'}}>Please Select A Size</Text>}
              <Dropdown
                label='Select a size...'
                data={size}
                onChangeText= {(value, index) => this.setState({size: value,}) }
                style={{width: 100}}
              />
            </View>

            <View style={{marginRight: 20, width: 150,}}>
              {this.state.checkedbox2 == false && <Text style={{color: 'red'}}>Please select a color</Text>}
              <Dropdown
                label='Select a color...'
                data={colors}
                onChangeText= {(value, index) => this.setState({color: value,}) }
                style={{width: 50}}
              />
            </View>
          </View>        
          <KeyboardAvoidingView behavior="padding">
          >
            <View style={{ flex: 1, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{                      
                  paddingTop:20,
                  paddingBottom:20,
                }}
                key={this.state.id}
                onPress={() => {
                  this.checkOutPage();                               
                }}                                
              >
                <LinearGradient
                  colors={[  '#fff4cc','#efb404','#d1a31d']}
                  style={{
                    borderWidth: 1,
                    borderRadius: 5, width:300, height: 50,padding: 15, alignItems: 'center', borderRadius: 5 }}>
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
          </KeyboardAvoidingView>
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
    borderBottomColor: '#dbd8ce',
    borderBottomWidth: 1,
    flex: 3,
    backgroundColor: 'white',
    borderWidth: 0,
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