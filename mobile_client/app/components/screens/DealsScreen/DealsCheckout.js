import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
// import { _addPosts } from './PostService'
import { _verifier } from "../../../../src//services/AuthService";

export default class DealsCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      location_id: 2,
      title: 'Untitled',
      price: 0,
      information: 'Contact chef for description',
      ingredients: '',
    };
  }

  createPost = () => {
    let title = this.state.title;
    let location_id = this.state.location_id;
    let user_id = this.state.id;
    let price = parseFloat(this.state.price);
    let information = this.state.information;
    let ingredients = [];

    ingredients.push(this.state.ingredients);

    _addPosts(title, location_id, user_id, price, information, ingredients);

    this.props.navigation.navigate('Search')
    //then redirects to post tab
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.postStyle}>
          <Text>Title: </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Title..."
            onChangeText={title => this.setState({ title })}
          />

          <Text style={styles.spacing}>Description:</Text>
          <TextInput
            style={(styles.inputStyle, styles.descriptionStyle)}
            multiline={false}
            placeholder="Description..."
            onChangeText={information => this.setState({ information })}
          />

          <Text style={styles.spacing}>Ingredients:</Text>
          <TextInput
            style={styles.inputStyle}
            multiline={true}
            placeholder="Insert a comma after every ingredients..."
            onChangeText={ingredients => this.setState({ ingredients })}
          />

          <Text style={styles.spacing}>Price:</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="$0.00"
            onChangeText={price => this.setState({ price })}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            color="white"
            title="Submit"
            onPress={this.createPost}
          />
        </View>
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
    borderColor: '#f4511e',
    backgroundColor: 'white',
    height: 50,
  },
  spacing: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  descriptionStyle: {
    height: 200,
    borderWidth: 1,
    borderColor: '#f4511e',
    backgroundColor: 'white',
  },
  buttonStyle: {
    backgroundColor: 'tomato',
    marginTop: 20,
    borderRadius: 5,
  },
});
