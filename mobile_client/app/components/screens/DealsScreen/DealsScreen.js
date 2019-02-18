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

// EXTERNAL STYLESHEET
const styles = require('../../../assets/stylesheet/style');

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
      recentDeals: [],
      allResults: [],
      department: ''
    };
  }

  componentWillMount() {
    const category = this.props.navigation.state.params;
    const department = category.department;
    this.setState({ department });
  };

  componentDidMount() {
    this.getDealsData();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true;
    });
  };

  componentWillUnmount() {
    this.backHandler.remove();
  }

  getDealsData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      // if (value !== null) {
        return _loadDeals(value).then(res => {
          console.log('FETCHING' + JSON.stringify(res.deals.all_results));
          this.setState({
            isLoading: false,
            isFetching: false,
            recentDeals: res.deals.recent_deals,
            allResults: res.deals.all_results
          });
          // if (this.state.department !== 'All Categories') {
            this.filterDealsData();
          // }
        });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  filterDealsData = () => {
    let searchData = this.state.allResults[0].filter(postData => {
      console.log('POST ' + JSON.stringify(postData));
      if (postData.category_name !== null) {
        return postData.category_name.includes(this.state.department);
      }
    });
    this.setState({ dealsData: searchData });
  };

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100);
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
          <View style={styles.searchBarStyle} />
          <FlatList
            data={this.state.dealsData}
            keyExtractor={this._keyExtractor}
            refreshing={this.state.isFetching}
            onRefresh={() => this.onRefresh()}
            numColumns={2}
            renderItem={({ item, index }) => {
              if (item.empty === true) {
                return (
                  <View
                    style={{
                      width: '50%',
                      height: '30%',
                      backgroundColor: 'transparent'
                    }}
                  />
                );
              }
              console.log('ITEMS'+JSON.stringify(item));
              return (
                <View
                  style={{
                    width: '50%',
                    height: '30%'
                  }}
                >
                  <TouchableOpacity
                    style={styles.postStyle}
                    key={item.id}
                    onPress={() => this.viewPost(item)}
                  >
                    <Image
                      style={{
                        borderRadius: 5,
                        width: 165,
                        height: 165
                      }}
                      source={{ uri: item.featured_deal_image }}
                    />
                    <View
                      style={{
                        flex: 1,
                        margin: 5,
                        width: 165,
                        height: 40
                        // overflow: 'hidden',
                      }}
                    >
                      <Text
                        style={styles.textStyle}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {item.deal_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column'
                        // justifyContent: 'flex-end'
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignContent: 'flex-start'
                        }}
                      >
                        <Text
                          style={{
                            // alignContent: "flex-end",
                            fontSize: 13,
                            opacity: 0.54,
                            // marginTop: 20,
                            textAlign: 'right',
                            width: 50
                          }}
                        >
                          Dollar:
                        </Text>
                        <Text
                          style={{
                            // alignContent: "flex-end",
                            fontSize: 13,
                            marginLeft: 0,
                            // marginTop: 20,
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
                            width: 50
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
                            fontSize: 9,
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