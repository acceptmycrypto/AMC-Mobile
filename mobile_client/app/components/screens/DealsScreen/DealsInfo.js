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
  KeyboardAvoidingView,
  BackHandler,
  Share
} from "react-native";
import { Button } from "react-native-elements";
import { _verifier } from "../../../../src/services/AuthService";
import Icon from "react-native-vector-icons/FontAwesome";
import { _loadOnePosts } from './DealsService';
import { LinearGradient } from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
// import Carousel  from 'react-native-snap-carousel';
// import SliderEntry from './SliderEntry';
export default class PostInfo extends React.Component {

  constructor(props) {
    super(props);
    this._shareMessage = this._shareMessage.bind(this);
    // this._showResult = this._showResult.bind(this);
    
    this.state = {
      result: "",
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
      colorOption: [{value: 'Red',}, {value: 'Blue',}, {value: 'Green',}],
    //   images: [
    //     {
    //         title: 'Beautiful and dramatic Antelope Canyon',
    //         subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    //         illustration: 'https://i.imgur.com/UYiroysl.jpg'
    //     },
    //     {
    //         title: 'Earlier this morning, NYC',
    //         subtitle: 'Lorem ipsum dolor sit amet',
    //         illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    //     },
    //     {
    //         title: 'White Pocket Sunset',
    //         subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    //         illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    //     },
    //     {
    //         title: 'Acrocorinth, Greece',
    //         subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    //         illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    //     },
    //     {
    //         title: 'The lone tree, majestic landscape of New Zealand',
    //         subtitle: 'Lorem ipsum dolor sit amet',
    //         illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    //     },
    //     {
    //         title: 'Middle Earth, Germany',
    //         subtitle: 'Lorem ipsum dolor sit amet',
    //         illustration: 'https://ak1.ostkcdn.com/images/products/9542248/Safavieh-Malone-White-Chrome-Coffee-Table-a94e199e-40dd-42c9-9a08-510c6ab89575.jpg'
    //     }
    // ]
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
    
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true;
    });
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

  componentWillUnmount() {
    this.backHandler.remove();
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
        size: this.state.size,
        color: this.state.color,
      });
    }
  };
//   _renderItemWithParallax ({item, index}, parallaxProps) {
//     return (
//         <SliderEntry
//           data={item}
//           even={(index + 1) % 2 === 0}
//           parallax={true}
//           parallaxProps={parallaxProps}
//         />
//     );
// }
  _renderItem ({item, index}) {
    console.log("CHECKING IMAGES!!!!!!");
    console.log(item);
    console.log("CHECKING IMAGES!!!!!!");
    return (
        <View >
            <Text>{ item.title } </Text>
        </View>
    );
}

  _shareMessage() {
    // Save this commented link for when they update webpage and add deals id
    // let link = 'https://acceptmycrypto.herokuapp.com/feed/deals/'+this.state.deal_id+'/'+this.state.deal_name;
    let link = 'https://acceptmycrypto.herokuapp.com/feed/deals/'+this.state.deal_name;    
    link = link.split(' ').join('%20');
    let check = 'https://acceptmycrypto.herokuapp.com/feed/deals/Tech4Kids%20-%20Paw%20Patrol%20Soft%20Lite%20Figure'
 
    console.log("==========CHECKER==========", check==link)
    // console.log("-----Line 239-----", this.state);
    console.log(link);
    Share.share({
      message: '<Enter Message>',
      url: link
    }).then(this._showResult);
  }

  render() {

    console.log("-----Line 248-----", this.state);
    let colors = this.state.colorOption;
    let size = this.state.sizeOption;
    return(
      <View style={styles.container}>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <Image
            style={{ maxWidth: '100%', height: 250 }}
            source={{ uri: this.state.featured_deal_image }}
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
                      textAlign: 'left' 
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
                      color: 'green',
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
                      color: 'red',
                      borderWidth: 2,
                      borderColor: 'red',
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
                  {/* <Text style={{
                      width: 110,
                      textAlign: 'center', 
                      fontSize: 14,
                      color: 'blue',
                    }}>
                    FREE shipping
                  </Text> */}
                </View>
            </View>
          </View>
          <View style={{ 
            flex: 3,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            }}>                
              <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{
                    textAlign: 'left', 
                    fontSize: 20,
                    marginLeft: 0,
                  }}>
                  Item Description
                </Text>
 
                {/* <Text>
                    {JSON.stringify(this.state.result)}
                </Text> */}
              </View>
              <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'flex-end', backgroundColor: '#66dac7',borderRadius: 5 }}>
                <TouchableOpacity onPress={this._shareMessage}>
                  <Text style={{ fontSize: 20}}>
                    Share Item
                  </Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={{ 
            flex: 3,
            flexDirection: 'row',
            padding: 10,
            // borderBottomColor: '#dbd8ce',
            // borderBottomWidth: 1,
          }}>
            <Text style={{
              width: 110,
              textAlign: 'center', 
              fontSize: 14,
              color: 'blue',
            }}>
                    FREE shipping
            </Text>
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

          <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#dbd8ce',
              borderBottomWidth: 1, }}>     
            <View style={{marginLeft: 20, width: 150}}>
            {this.state.checkedbox1 == false && <Text style={{color: 'red'}}>Please Select A Size</Text>}
              <Dropdown
                label='Select a size...'
                data={size}
                onChangeText= {(value, index) => this.setState({size: value, checkedbox1: true}) }
                style={{width: 100}}
              />
            </View>

            <View style={{marginRight: 20, width: 150,}}>
              {this.state.checkedbox2 == false && <Text style={{color: 'red'}}>Please select a color</Text>}
              <Dropdown
                label='Select a color...'
                data={colors}
                onChangeText= {(value, index) => this.setState({color: value, checkedbox2: true}) }
                style={{width: 50}}
              />
            </View>
          </View>        
          <KeyboardAvoidingView behavior="padding">
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
                  colors={[  '#66dac7','#66dac7','#66dac7']}
                  style={{
                    width:300, height: 50,padding: 15, alignItems: 'center', borderRadius: 5 }}>
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
  },
  description: {
    borderBottomColor: '#dbd8ce',
    borderBottomWidth: 1,
    flex: 3,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'grey',
  },
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
