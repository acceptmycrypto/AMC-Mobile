import * as React from 'react';
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
  BackHandler
} from 'react-native';
import {
  _loadDeals,
  _loadDealItem
} from '../../../../src/services/DealServices';
import { Button } from 'react-native-elements';
// import { _verifier } from "../../../../src/AuthentificationService";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { _loadPosts } from "./PostService";
// import { Component } from 'react';
// import { SearchBar } from 'react-native-elements';

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

// class FlatListItem extends Component {
//   render() {
//     return(
//       <View>
//         <TouchableOpacity style={styles.postStyle} key={this.props.item.id}>
//             <Image
//               style={{ width: 150, height: 150 }}
//               source={{ url: this.props.item.featured_deal_image }}
//             />
//             <View style={{ marginLeft: 20, flex: 1 }}>
//               <Text style={styles.textStyle}>{this.props.item.deal_name}</Text>
//               <Text>{this.props.item.information}</Text>

//                 <Text style={{
//                   alignContent: "flex-end",
//                   marginLeft: 120,
//                   marginTop: 10
//                 }}>
//                   {"$" + this.props.item.pay_in_crypto}
//                 </Text>
//             </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true,
      isFetching: false,
      data: {},
      search: '',
      post: '',
      dealsData: []
    };
  }

  componentDidMount = () => {
    this.getDealsData();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  };

  getDealsData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return _loadDeals(value).then(res => {
          console.log('FETCHING'+res);
          this.setState({
            isLoading: false,
            isFetching: false,
            dealsData: res.deals
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100);
  };

  searchPost = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        _loadDeals(value)
          .then(
            resJSON => {
              console.log(resJSON);
              let searchData = resJSON.deals.filter(postData => {
                console.log('POST ' + postData);
                return postData.deal_name.includes(this.state.search);
              });
              this.setState({ dealsData: searchData });
            }
          )
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

  viewPost = post => {
    console.log("LINE 115 IN POST.JS FILE: " + JSON.stringify(post));
    this.props.navigation.navigate('DealsInfo', { 
      id: post.id,
      deal_name: post.deal_name,
      description: post.deal_description,
      featured_deal_image: post.featured_deal_image,
      pay_in_dollar: post.pay_in_dollar.toFixed(2),
      pay_in_crypto: post.pay_in_crypto.toFixed(2)
     });
  };

  _keyExtractor = (item, index) => JSON.stringify(item.id);

  onRefresh = () => {
    this.setState({ isFetching: true }, function() { this.getDealsData() });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.dealsContainer}>
          <View style={styles.searchBarStyle}>
            <TextInput
              style={styles.searchStyle}
              underlineColorAndroid="transparent"
              placeholder="Search for Deals!"
              placeholderTextColor="#58697e"
              onChangeText={search => this.setState({ search })}
              onChange={this.searchPost}
              value={this.state.search}
            />
            {/* <Button
              icon={{
                name: "search",
                size: 20
              }}
              buttonStyle={styles.searchButtonStyle}
              onPress={this.searchPost}
            /> */}
          </View>
          {/* <ScrollView>
            {this.state.dealsData.map(dealsDataInfo => {
              return (        
                <TouchableOpacity style={styles.postStyle} key={dealsDataInfo.id} onPress={() => this.viewPost(dealsDataInfo.id)}>
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={{ url: dealsDataInfo.featured_deal_image }}
                  />
                  <View style={{ marginLeft: 20, flex: 1 }}>
                    <Text style={styles.textStyle}>{dealsDataInfo.title}</Text>
                    <Text>{dealsDataInfo.information}</Text>
                    <TouchableOpacity
                      style={{
                        alignContent: "flex-end",
                        marginLeft: 120,
                        marginTop: 10
                      }}
                      onPress={this.buyPost}
                    >
                      <Text style={styles.buyButtonStyle}>
                        {"$" + dealsDataInfo.pay_in_crypto}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView> */}
          <FlatList
            data={this.state.dealsData}
            keyExtractor={this._keyExtractor}
            refreshing={this.state.isFetching}
            onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => {
              console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              return (
                <View>
                  <TouchableOpacity
                    style={styles.postStyle}
                    key={item.id}
                    onPress={() => this.viewPost(item)}
                  >
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{ uri: item.featured_deal_image }}
                    />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text style={styles.textStyle}>{item.deal_name}</Text>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              // alignContent: "flex-end",
                              fontSize: 13,
                              opacity: 0.54,
                              marginTop: 20,
                              textAlign: 'right', 
                              width:50
                            }}
                          >
                            Dollar:
                          </Text>

                          <Text
                            style={{
                              // alignContent: "flex-end",
                              fontSize: 13,
                              marginLeft: 0,
                              marginTop: 20,
                              marginLeft: 10,
                              width: 60
                            }}
                          >
                            {'$' + item.pay_in_dollar.toFixed(2)}
                          </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              // alignContent: "flex-end",
                              fontSize: 13,
                              opacity: 0.54,
                              marginLeft: 0,
                              marginTop: 20,
                              textAlign: 'right', 
                              width:50
                            }}
                          >
                            Crypto:
                          </Text>

                          <Text
                            style={{
                              // alignContent: "flex-end",
                              fontSize: 13,
                              color: 'green',
                              marginLeft: 0,
                              marginTop: 20,
                              marginLeft: 10,
                              width: 60
                            }}
                          >
                            {'$' + item.pay_in_crypto.toFixed(2)}
                          </Text>

                          <Text
                            style={{
                              fontSize: 13,
                              color: 'green',
                              marginLeft: 0,
                              marginTop: 20,
                              borderWidth: 2,
                              borderColor: 'green',
                              borderRadius: 5
                            }}
                          >
                            {' ' +
                              this.convertToPercentage(
                                item.pay_in_dollar,
                                item.pay_in_crypto
                              ) +
                              '% OFF '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          {/*}
          <TouchableOpacity
            style={{
            borderWidth:1,
            borderColor: '#2e4158',
            alignItems:'center',
            justifyContent:'center',
            width:70,
            height:70,
            position: 'absolute',
            bottom: 0,
            marginLeft: 10,
            marginBottom: 10,
            backgroundColor:'#2e4158',
            borderRadius:100,
            }}
            onPress={() => this.props.navigation.navigate("AddPost")}
           >
            <Icon name="plus"  size={30} color="#fff" />
          </TouchableOpacity> */}
        </View>
      );
    }
  }
}

// const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#2e4158',
  //   alignSelf: 'stretch',
  //   flexDirection: 'column'
  // },
//   searchButtonStyle: {
//     backgroundColor: 'orange',
//     width: 50,
//     height: 45,
//     alignContent: 'center',
//     borderRadius: 5
//   },
//   buyButtonStyle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     borderRadius: 10,
//     backgroundColor: '#2e4158',
//     padding: 10,
//     flex: 1,
//     textAlign: 'center'
//   }
// });
{
  /*<FlatListItem item={item} index={index}>
              
              </FlatListItem>);*/
}
