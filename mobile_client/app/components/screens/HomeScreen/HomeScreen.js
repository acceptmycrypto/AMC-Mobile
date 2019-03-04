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
  BackHandler,
  NetInfo
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
      isConnected: true,
      text: '',
      isLoading: true,
      isFetching: false,
      data: {},
      search: '',
      post: '',
      categories: [
        {
          category_name: 'Movies, Music & Games'
        },
        {
          category_name: 'Electronics, Computers & Office'
        },
        {
          category_name: 'Apparel & Accessories'
        },
        {
          category_name: 'Toys, Kids & Baby'
        },
        {
          category_name: 'Books & Audible'
        },
        {
          category_name: 'Health & Beauty'
        },
        {
          category_name: 'Charity'
        },
        {
          category_name: 'Home, Garden & Tools'
        },
        {
          category_name: 'Pet Supplies'
        },
        {
          category_name: 'Sports & Outdoors'
        },
        {
          category_name: 'Automotive & Industrial'
        },
        {
          category_name: 'Services'
        },
        {
          category_name: 'Food & Grocery'
        }
      ],
      navCategories: [
        {
          category_name: 'Most Recent Deals Listed',
          nav_name: 'Recent',
          image:
            'https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Movies, Music & Games',
          nav_name: 'Media',
          image:
            'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Electronics, Computers & Office',
          nav_name: 'Electronics',
          image:
            'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Apparel & Accessories',
          nav_name: 'Apparel',
          image:
            'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Toys, Kids & Baby',
          nav_name: 'Toys',
          image:
            'https://images.pexels.com/photos/591652/play-fun-blocks-block-591652.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Books & Audible',
          nav_name: 'Books',
          image:
            'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Health & Beauty',
          nav_name: 'Beauty',
          image:
            'https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Charity',
          nav_name: 'Charity',
          image:
            'https://images.pexels.com/photos/1409716/pexels-photo-1409716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Home, Garden & Tools',
          nav_name: 'Home',
          image:
            'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Pet Supplies',
          nav_name: 'Pet',
          image:
            'https://images.pexels.com/photos/545063/pexels-photo-545063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Sports & Outdoors',
          nav_name: 'Sports',
          image:
            'https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Automotive & Industrial',
          nav_name: 'Automotive',
          image:
            'https://images.pexels.com/photos/1476318/pexels-photo-1476318.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Services',
          nav_name: 'Services',
          image:
            'https://images.pexels.com/photos/1321730/pexels-photo-1321730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        {
          category_name: 'Food & Grocery',
          nav_name: 'Grocery',
          image:
            'https://images.pexels.com/photos/1327211/pexels-photo-1327211.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        }
      ],
      recentDeals: [],
      allResults: []
    };
  }

  componentWillMount() {
    if (NetInfo.isConnected === false) {
      this.setState({ isConnected: false });
    }
  }

  componentDidMount() {
    this.getDealsData();
    this.backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
  }

  componentWillUnmount() {
    this.backhandler.remove();
  }

  getDealsData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      // if (value !== null) {
      return _loadDeals(value).then(res => {
        // console.log('FETCHING' + JSON.stringify(res.deals));
        console.log('RECENT' + JSON.stringify(res.deals.recent_deals));
        console.log('ALL' + JSON.stringify(res.deals.all_results));
        this.setState({
          isLoading: false,
          isFetching: false,
          recentDeals: res.deals.recent_deals,
          allResults: res.deals.all_results
        });
      });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  convertToPercentage = (priceInDollar, priceInCrypto) => {
    return parseInt(((priceInDollar - priceInCrypto) / priceInDollar) * 100);
  };

  viewCategory = category => {
    console.log('LINE 115 IN category.JS FILE: ' + JSON.stringify(category));
    this.props.navigation.navigate('DealsScreen', {
      department: category
    });
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
    const deals = [];

    for (let i = 0; i < this.state.categories.length; i++) {
      deals.push(
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: 7, marginBottom: 7 }}
            onPress={() =>
              this.viewCategory(this.state.categories[i].category_name)
            }
          >
            <Text style={{ color: '#2e4158', padding: 10, fontSize: 25 }}>
              {this.state.categories[i].category_name}
            </Text>
            <Image
              source={require('../../../assets/images/category-icon.png')}
              style={{
                height: 20,
                width: 50,
                resizeMode: 'contain',
                marginTop: 17,
                marginLeft: -18
              }}
            />
          </TouchableOpacity>
          <FlatList
            data={this.state.allResults[i]}
            keyExtractor={this._keyExtractor}
            horizontal={true}
            // refreshing={this.state.isFetching}
            // onRefresh={() => this.onRefresh()}
            renderItem={({ item, index }) => {
              // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              if (item.deal_name !== null) {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.homePostStyle}
                      key={item.id}
                      onPress={() => this.viewPost(item)}
                    >
                      <Image
                        style={{ width: 150, height: 150, borderRadius: 20 }}
                        source={{ uri: item.featured_deal_image }}
                      />
                      <View
                        style={{
                          width: 80,
                          backgroundColor: 'white',
                          marginLeft: 5,
                          marginTop: -25,
                          borderWidth: 2,
                          borderColor: 'red',
                          borderRadius: 5
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'red'
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
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
          />
        </View>
      );
    }

    if (this.state.isConnected) {
      if (this.state.isLoading) {
        return (
          <View style={styles.container}>
            <Text style={{ marginBottom: 10 }}>
              Finding you great deals..
            </Text>
            <ActivityIndicator />
          </View>
        );
      } else {
        return (
          <View style={styles.dealsContainer}>
            <FlatList
              data={this.state.navCategories}
              keyExtractor={this._keyExtractor}
              horizontal={true}
              renderItem={({ item, index }) => {
                // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                return (
                  <View style={{ backgroundColor: '#e6e6e6' }}>
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() => this.viewCategory(item.category_name)}
                    >
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 40,
                          alignSelf: 'center'
                        }}
                        source={{ uri: item.image }}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 20,
                          marginTop: 5,
                          marginBottom: 20
                          // width: 140
                          // color: 'black'
                        }}
                      >
                        {item.nav_name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />

            <ScrollView>
              <TouchableOpacity
                style={{ flexDirection: 'row', marginBottom: 7 }}
                onPress={() => this.viewCategory('Most Recent Deals Listed')}
              >
                <Text style={{ color: '#2e4158', padding: 10, fontSize: 25 }}>
                  Most Recent Deals Listed
                </Text>
                <Image
                  source={require('../../../assets/images/category-icon.png')}
                  style={{
                    height: 20,
                    width: 50,
                    resizeMode: 'contain',
                    marginTop: 17,
                    marginLeft: -18
                  }}
                />
              </TouchableOpacity>
              <FlatList
                data={this.state.recentDeals}
                keyExtractor={this._keyExtractor}
                horizontal={true}
                // refreshing={this.state.isFetching}
                // onRefresh={() => this.onRefresh()}
                renderItem={({ item, index }) => {
                  // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                  if (item.deal_name !== null) {
                    return (
                      <View>
                        <TouchableOpacity
                          style={styles.homePostStyle}
                          key={item.id}
                          onPress={() => this.viewPost(item)}
                        >
                          <Image
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 20
                            }}
                            source={{ uri: item.featured_deal_image }}
                          />
                          <View
                            style={{
                              width: 80,
                              backgroundColor: 'white',
                              marginLeft: 5,
                              marginTop: -25,
                              borderWidth: 2,
                              borderColor: 'red',
                              borderRadius: 5
                            }}
                          >
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: 'red'
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
                        </TouchableOpacity>
                      </View>
                    );
                  }
                }}
              />

              {deals}
            </ScrollView>
          </View>
        );
      }
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2e4158'
          }}
        >
          <Image
            style={{
              height: 170,
              width: 170
            }}
            source={require('../../../assets/images/lost-signal.png')}
          />
          <Text style={{ fontSize: 20, color: 'white' }}>
            Looks like you lost signal, bummer..
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: '#66dac7', height: 30, width: 70, justifyContent: 'center', marginTop: 10, borderRadius: 5 }}
          >
            <Text style={{ textAlign: 'center' }}>try again</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
