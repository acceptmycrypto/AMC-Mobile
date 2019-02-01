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

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isLoading: false,
      isFetching: false,
      data: {},
      search: '',
      post: '',
      dealsData: []
    };
  }

  componentDidMount() {
    console.log('STATE'+JSON.stringify(this.props.navigation.state));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  handleBackPress = () => {
    if(this.props.navigation.state.routeName !== 'Home'){
      this.props.navigation.navigate('Home');
      return true;
    }else {
      BackHandler.exitApp();
      return true;  
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  getDealsData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        return _loadDeals(value).then(res => {
          console.log('FETCHING' + res);
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
  };

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100);
  };

  searchPost = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (this.state.search === '') {
        this.setState({
          dealsData: []
        });
      } else {
        if (value !== null) {
          _loadDeals(value)
            .then(resJSON => {
              console.log(resJSON);
              let searchData = resJSON.deals.filter(postData => {
                console.log('POST ' + postData);
                return postData.deal_name.includes(this.state.search);
              });
              this.setState({ dealsData: searchData });
            })
            .catch(err => console.log(err));
        }
      }
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

  viewPost = post => {
    console.log('LINE 115 IN POST.JS FILE: ' + JSON.stringify(post));
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
    this.setState({ isFetching: true }, function() {
      this.getDealsData();
    });
  };

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
            <Image
              source={require('../../../assets/images/search-icon.png')}
              style={{
                height: 20,
                width: 50,
                resizeMode: 'contain',
                alignSelf: 'center',
                justifyContent: 'center',
                // backgroundColor: 'white',
                // marginTop: 10,
                // marginLeft: 10,
                marginRight: -10
              }}
            />
            <TextInput
              style={styles.searchStyle}
              underlineColorAndroid="transparent"
              placeholder="Search for anything"
              placeholderTextColor="black"
              onChangeText={search => this.setState({ search })}
              onChange={this.searchPost}
              value={this.state.search}
              autoFocus={true}
              clearTextOnFocus={true}
            />
          </View>
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
                    style={styles.searchPostStyle}
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
                              fontSize: 11,
                              opacity: 0.54,
                              marginTop: 20,
                              textAlign: 'right',
                              width: 50
                            }}
                          >
                            Dollar:
                          </Text>

                          <Text
                            style={{
                              // alignContent: "flex-end",
                              fontSize: 11,
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
                              fontSize: 11,
                              opacity: 0.54,
                              marginLeft: 0,
                              marginTop: 20,
                              textAlign: 'right',
                              width: 50
                            }}
                          >
                            Crypto:
                          </Text>

                          <Text
                            style={{
                              // alignContent: "flex-end",
                              fontSize: 11,
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
                              fontSize: 11,
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
        </View>
      );
    }
  }
}
