import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  AsyncStorage,
  Alert,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StackActions,
  NavigationActions
} from 'react-native';
import { _verifier } from "../../../../src/AuthentificationService";
// import _tokenVerifier from '../TokenVerifier/TokenVerifier';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      id: 0,
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      create_date: '',
      isLoggedIn: false,
      isPassingProps: false
    };
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
            console.log('Session has expired');
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
		  isLoggedIn: true,
		  isPassingProps: true
	  })
  }

  removeData = async () => {
    try {
	  await AsyncStorage.removeItem('token');
	  this.setState({
		  isLoggedIn: false
	  })
    } catch (error) {
      // Error saving data
    }
  };

  render() {
	const isLoggedIn = this.state.isLoggedIn;
    console.log(this.state);
    const { navigation } = this.props;
    // const id = navigation.getParam('_id', 'n/a');
    const username = navigation.getParam('username', 'n/a');
    // const email = navigation.getParam('email', 'n/a');
    // const firstname = navigation.getParam('firstname', 'n/a');
    // const lastname = navigation.getParam('lastname', 'n/a');
    // const create_date = navigation.getParam('create_date', 'n/a');
	// const status = navigation.getParam('isLoggedIn', 'n/a');

    return (
      <View style={styles.container}>
        {isLoggedIn ? (
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <ImageBackground
              style={{
                flex: 1,
                width: undefined,
                height: undefined
              }}
              source={{}}
            >
              <View style={styles.container}>
                <View
                  style={{
                    margin: 10,
                    padding: 2,
                    backgroundColor: 'rgba(244, 81, 30, .8)',
                    alignItems: 'center',
                    borderRadius: 10
                  }}
                >
                  {this.state.isPassingProps === true && <Text
                    style={{
                      padding: 5,
                      marginTop: 5,
                      fontSize: 30
                    }}
                  >
                    Welcome Back {username}!
				  </Text>}
				  {this.state.isPassingProps === false && <Text
                    style={{
                      padding: 5,
                      marginTop: 5,
                      fontSize: 30
                    }}
                  >
                    Welcome Back {this.state.username}!
                  </Text>}
                  <Text
                    style={{
                      padding: 5,
                      marginTop: 5,
                      fontSize: 20
                    }}
                  >
                    Ready for a delicious homemade meal?
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row'
                    }}
                  >
                    <Text
                      style={{
                        marginTop: 6,
                        fontSize: 20
                      }}
                    >
                      Would you like to
                    </Text>
                    <Button
                      color="white"
                      title="Browse?"
                      onPress={() => this.props.navigation.navigate('Browse')}
                    />
                    <Text
                      style={{
                        marginTop: 6,
                        fontSize: 20
                      }}
                    >
                      Or
                    </Text>
                    <Button
                      color="white"
                      title="Search?"
                      onPress={() => this.props.navigation.navigate('Search')}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row'
                    }}
                  />{' '}
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 30
                    }}
                  >
                    Check out your previous orders for inspiration!
                  </Text>
                </View>
                <ScrollView style={{ flex: 1, margin: 5 }}>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Food</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                  <Text style={styles.prevOrder}>Beer</Text>
                </ScrollView>
                <View
                  style={{
                    margin: 5,
                    flexDirection: 'row',
                    backgroundColor: 'rgba(244, 81, 30, .8)',
                    alignItems: 'center',
                    borderRadius: 10
                  }}
                >
                  <Text
                    style={{
                      //   marginTop: 5,
                      marginLeft: 7,
                      fontSize: 20
                    }}
                  >
                    Or
                  </Text>
                  <Button
                    title="Logout"
                    onPress={this.removeData}
                    // onPress={() =>
                    //   this.props.navigation.dispatch(resetAction)
                    // }
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        ) : (
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <ImageBackground
              style={{
                flex: 1,
                width: undefined,
                height: undefined
              }}
              source={{}}
            >
              <View style={styles.container}>
                <Text style={styles.selectionText}>Ready to eat?</Text>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => this.props.navigation.navigate('Login')}
                >
                  <Text style={styles.buttonText}>Login!</Text>
                </TouchableOpacity>
                <Text style={styles.selectionText}>New Here?</Text>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => this.props.navigation.navigate('Register')}
                >
                  <Text style={styles.buttonText}>Get Registered!</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectionText: {
    backgroundColor: '#f4511e',
    borderWidth: 5,
    borderColor: '#f4511e',
    borderStyle: 'solid',
    borderRadius: 5,
    fontSize: 35,
    margin: 5
  },
  buttons: {
    margin: 5,
    padding: 5,
    width: 160,
    borderWidth: 5,
    borderColor: '#ffffff',
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  buttonText: {
    color: '#f4511e',
    fontSize: 20,
    textAlign: 'center'
  },
  prevOrder: {
    width: 350,
    fontSize: 25,
    color: '#f4511e',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    justifyContent: 'flex-start'
  }
});
