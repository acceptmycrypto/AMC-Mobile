import React from 'react';
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
} from 'react-native';
import { Button } from 'react-native-elements';
// import { _verifier } from "../../../../src/AuthentificationService";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { _loadPosts } from "./PostService";
import {
  _loadDeals,
  _loadDealItem
} from '../../../../src/services/DealServices';
import { Component } from 'react';
import { SearchBar } from 'react-native-elements';

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
      data: {},
      search: '',
      post: '',
      dealsData: []
    };
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // let token = JSON.stringify(value);
        console.log('TOKEN!!' + value);
        return _loadDeals(value).then(res => {
          console.log('DEALS!!' + res.deals);
          this.setState({
            dealsData: res.deals
          });
          console.log(this.state);
        });
      }
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

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
            },
            function() {
              this.setState({ search: '' });
            }
          )
          .catch(err => console.log(err));
      }
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

  viewPost = post_id => {
    this.props.navigation.navigate('PostInfo', { post_id });
  };

  buyPost = () => {
    Alert.alert('buy me');
  };

  // checkToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("token");
  //     if (value !== null) {
  //       // let token = JSON.stringify(value);
  //       console.log("TOKEN!!" + value);
  //       return _verifier(value).then(res => {
  //         let tokenStr = JSON.stringify(res.verifiedToken);
  //         let userData = JSON.parse(tokenStr);
  //         console.log("STRING RETURN!!" + tokenStr);
  //         console.log("PARSED RETURN!!" + userData);
  //         if (userData.name === "TokenExpiredError") {
  //           Alert.alert("Session has expired");
  //         } else {
  //           this.setState({
  //             isLoggedIn: userData.isLoggedIn,
  //             id: userData._id,
  //             username: userData.username,
  //             email: userData.email,
  //             firstname: userData.firstname,
  //             lastname: userData.lastname,
  //             create_date: userData.create_date
  //           });
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log("NO TOKEN!!!" + error);
  //   }
  // };

  // componentWillMount() {
  //   this.checkToken();
  // }

  // componentDidMount() {
  //   return (_loadDeals()
  //     .then(resJSON => {
  //       this.setState(
  //         {
  //           isLoading: false,
  //           data: resJSON
  //         },
  //         function() {}
  //       );
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  //     );
  // }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
        <View style={styles.searchBarStyle}>
          <TextInput
            style={styles.searchStyle}
            placeholder="Search by Deal Name"
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
          renderItem={({ item, index }) => {
            console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
            return (
              <View>
                <TouchableOpacity
                  style={styles.postStyle}
                  key={item.id}
                  onPress={() => this.viewPost(item.id)}
                >
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={{ url: item.featured_deal_image }}
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
                            opacity: 0.54,
                            marginLeft: 0,
                            marginTop: 20
                          }}
                        >
                          Dollar:
                        </Text>

                        <Text
                          style={{
                            // alignContent: "flex-end",
                            marginLeft: 0,
                            marginTop: 20,
                            marginLeft: 10
                          }}
                        >
                          {'$' + item.pay_in_dollar}
                        </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            // alignContent: "flex-end",
                            opacity: 0.54,
                            marginLeft: 0,
                            marginTop: 20
                          }}
                        >
                          Crypto:
                        </Text>

                        <Text
                          style={{
                            // alignContent: "flex-end",
                            color: 'green',
                            marginLeft: 0,
                            marginTop: 20,
                            marginLeft: 10
                          }}
                        >
                          {'$' + item.pay_in_crypto}
                        </Text>

                        <Text
                          style={{
                            // alignContent: "flex-end",
                            fontSize: 11,
                            color: 'green',
                            marginLeft: 0,
                            marginTop: 20,
                            marginLeft: 10,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e4158',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  textStyle: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '200'
  },
  postStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    flexDirection: 'row'
  },
  searchStyle: {
    // backgroundColor: "#2e4158",
    // padding: 8,
    // marginBottom: 5,
    // marginLeft: 5,
    // width: '100%',
    // height: 45,

    // height: 35,
    width: '95%',
    borderBottomWidth: 1,
    borderColor: '#445366',
    padding: 5,
    margin: 8,
    fontSize: 15,
    color: '#fff'
  },
  searchBarStyle: {
    flexDirection: 'row',
    marginTop: 5
  },
  searchButtonStyle: {
    backgroundColor: 'orange',
    width: 50,
    height: 45,
    alignContent: 'center',
    borderRadius: 5
  },
  buyButtonStyle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#2e4158',
    padding: 10,
    flex: 1,
    textAlign: 'center'
  }
});
{
  /*<FlatListItem item={item} index={index}>
              
              </FlatListItem>);*/
}
