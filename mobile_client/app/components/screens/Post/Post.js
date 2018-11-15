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
  AsyncStorage,

} from 'react-native';
import { Button } from 'react-native-elements';
// import { _verifier } from "../../../../src/AuthentificationService";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { _loadPosts } from "./PostService";
import {
  _loadDeals,
  _loadDealItem
} from '../../../../src/services/DealServices';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: true,
      data: {},
      search: '',
      post: ''
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
          })
          console.log(this.state)
        });
      }
    } catch (error) {
      console.log('NO TOKEN!!!' + error);
    }
  };

  // searchPost = () => {
  //   _loadDeals()
  //     .then(
  //       resJSON => {
  //         let searchData = resJSON.filter(postData => {
  //           return postData.information.includes(this.state.search);
  //         });
  //         this.setState({ data: searchData });
  //       },
  //       function() {
  //         this.setState({ search: "" });
  //       }
  //     )
  //     .catch(err => console.log(err));
  // };

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
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchBarStyle}>
          <TextInput
            style={styles.searchStyle}
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
          {this.state.data.map(postInfo => {
            return (

              <TouchableOpacity style={styles.postStyle} key={postInfo.post_id} onPress={() => this.viewPost(postInfo.post_id)}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ url: "https://via.placeholder.com/50x50" }}
                />
                <View style={{ marginLeft: 20, flex: 1 }}>
                  <Text style={styles.textStyle}>{postInfo.title}</Text>
                  <Text>{postInfo.information}</Text>
                  <TouchableOpacity
                    style={{
                      alignContent: "flex-end",
                      marginLeft: 120,
                      marginTop: 10
                    }}
                    onPress={this.buyPost}
                  >
                    <Text style={styles.buyButtonStyle}>
                      {"$" + postInfo.price}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
        {/* <TouchableOpacity
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
    fontSize: 20,
    fontWeight: 'bold'
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
