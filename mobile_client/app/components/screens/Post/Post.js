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
import { _loadPosts } from "./PostService";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isLoading: true,
      data: {},
      search: "",
      post: ""
    };
  }

  searchPost = () => {
    _loadPosts()
      .then(
        resJSON => {
          let searchData = resJSON.filter(postData => {
            return postData.information.includes(this.state.search);
          });
          this.setState({ data: searchData });
        },
        function() {
          this.setState({ search: "" });
        }
      )
      .catch(err => console.log(err));
  };


  viewPost = (post_id) => {
    this.props.navigation.navigate('PostInfo', { post_id });
  }

  buyPost = () => {
    Alert.alert("buy me");
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

  componentWillMount() {
    this.checkToken();
  }

  componentDidMount() {
    return (_loadPosts()
      .then(resJSON => {
        this.setState(
          {
            isLoading: false,
            data: resJSON
          },
          function() {}
        );
      })
      .catch(err => {
        console.error(err);
      })
      );
  }

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
            placeholder="enter search"
            onChangeText={search => this.setState({ search })}
            value={this.state.search}
          />
          <Button
            icon={{
              name: "search",
              size: 20
            }}
            buttonStyle={styles.searchButtonStyle}
            onPress={this.searchPost}
          />
        </View>
        <ScrollView>
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
        </ScrollView>
        <TouchableOpacity
          style={{
          borderWidth:1,
          borderColor: '#f4511e',
          alignItems:'center',
          justifyContent:'center',
          width:70,
          height:70,
          position: 'absolute',
          bottom: 0,
          marginLeft: 10,
          marginBottom: 10,
          backgroundColor:'#f4511e',
          borderRadius:100,
          }}
          onPress={() => this.props.navigation.navigate("AddPost")}
         >
          <Icon name="plus"  size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4511e",
    alignSelf: "stretch",
    flexDirection: "column"
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  postStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    flexDirection: "row"
  },
  searchStyle: {
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 5,
    marginLeft: 5,
    width: 300,
    height: 45
  },
  searchBarStyle: {
    flexDirection: "row",
    marginTop: 5
  },
  searchButtonStyle: {
    backgroundColor: "orange",
    width: 50,
    height: 45,
    alignContent: "center",
    borderRadius: 5
  },
  buyButtonStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 10,
    backgroundColor: "#f4511e",
    padding: 10,
    flex: 1,
    textAlign: "center"
  }
});
