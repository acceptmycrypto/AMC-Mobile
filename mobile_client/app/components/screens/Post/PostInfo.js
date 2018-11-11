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

export default class PostInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: {},
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

  componentWillReceiveProps(){
    this.setState({
      isLoading: false,
    })
  }

  componentDidMount() {
    const { navigation } = this.props;
    console.log(this.state);
    let post_id = navigation.getParam('post_id', 'n/a');

    return _loadOnePosts(post_id).then(resJSON => {
      this.setState(
        {
          isLoading: false,
          data: resJSON
        },
        function() {}
      );
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {

    if(this.state.isLoading){
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <View>
        <ScrollView>
        {this.state.data.map(postInfo => {
          return(
            <View>
              <Text>postInfo.title</Text>
            </View>
          );
        })}
        </ScrollView>
      </View>
    );
  }
}