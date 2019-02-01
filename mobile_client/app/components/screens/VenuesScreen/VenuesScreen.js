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
  SectionList
} from 'react-native';
import { Button } from 'react-native-elements';

export default class CryptosRankings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFetching: false,
      cryptosRanking: [],
      cryptosTransactions: [],
      cryptoData: [],
      venueSearch: '',
      transactionsSearch: '',
      isViewingVenues: true
    };
  }

  componentWillMount = () => {
    this.getCryptoData();
  };

  getCryptoData = async () => {
    let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';
    const cryptosList = await fetch(url + '/api/cryptosranking_venues');
    const cryptosPurchases = await fetch(
      url + '/api/cryptosranking_transactions'
    );
    const cryptosRanking = await cryptosList.json();
    const cryptosTransactions = await cryptosPurchases.json();

    this.setState({
      isLoading: false,
      isFetching: false,
      cryptosRanking,
      cryptosTransactions
    });
  };

  _keyExtractor = (item, index) => JSON.stringify(item.crypto_symbol);

  // _transactionsKeyExtractor = (item, index) => JSON.stringify(item.crypto_symbol);

  searchCryptosRanking = async () => {
    let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';
    try {
      const cryptosList = await fetch(url + '/api/cryptosranking_venues');
      await cryptosList
        .json()
        .then(resJSON => {
          console.log(resJSON);
          let searchData = resJSON.filter(postData => {
            console.log('POST ' + JSON.stringify(postData));
            return postData.crypto_name.includes(this.state.venueSearch);
          });
          this.setState({ cryptosRanking: searchData });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

  searchCryptosTransactions = async () => {
    let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';
    try {
      const cryptosPurchases = await fetch(
        url + '/api/cryptosranking_transactions'
      );
      await cryptosPurchases
        .json()
        .then(resJSON => {
          console.log(resJSON);
          let searchData = resJSON.filter(postData => {
            console.log('POST ' + JSON.stringify(postData));
            return postData.crypto_name.includes(this.state.transactionsSearch);
          });
          this.setState({ cryptosTransactions: searchData });
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

  onRefresh = () => {
    this.setState({ isFetching: true }, function() {
      this.getCryptoData();
    });
  };

  render() {
    const isViewingVenues = this.state.isViewingVenues;

    if (this.state.isLoading) {
      return (
        <View style={styles.loadContainer}>
          <ActivityIndicator />
        </View>
      );
    } else {
      if (isViewingVenues === true) {
        return (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#2e4158'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  // borderWidth: 2,
                  // borderColor: '#2e4158',
                  backgroundColor: '#66dac7',
                  shadowColor: 'black',
                  shadowOffset: {
                    height: 2,
                    width: -2
                  },
                  shadowOpacity: 100,
                  elevation: 20,
                  alignSelf: 'center',
                  // margin: 3,
                  marginTop: 6,
                  marginLeft: 6,
                  marginRight: 3,
                  marginBottom: 6,
                  padding: 8
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center'
                  }}
                >
                  Venues
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  // borderWidth: 2,
                  // borderColor: '#2e4158',
                  backgroundColor: '#2e4158',
                  alignSelf: 'center',
                  // margin: 3,
                  marginTop: 6,
                  marginLeft: 3,
                  marginRight: 6,
                  marginBottom: 6,
                  padding: 8
                }}
                onPress={() => this.setState({ isViewingVenues: false })}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#66dac7'
                  }}
                >
                  Transactions
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchBarStyle}>
              {/* <View
                style={{
                  // flex: 1,
                  // width: '95%',
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                  borderColor: '#445366',
                  // padding: 10,
                  marginTop: 2,
                  // marginBottom: 5,
                  marginLeft: 10,
                  marginRight: -22
                  // fontSize: 15,
                  // color: 'black'
                }}
              > */}
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
              {/* </View> */}
              <TextInput
                style={styles.searchStyle}
                underlineColorAndroid="transparent"
                placeholder="Search through Cryptos"
                placeholderTextColor="black"
                onChangeText={venueSearch => this.setState({ venueSearch })}
                onChange={this.searchCryptosRanking}
                value={this.state.venueSearch}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#2e4158',
                padding: 15
              }}
            >
              {/* <Text style={{ color: '#66dac7', marginLeft: 25, marginRight: 25, fontSize: 20 }}>#</Text> */}
              <Text style={{ color: '#66dac7', fontSize: 20 }}>
                Cryptocurrency
              </Text>
              <Text style={{ color: '#66dac7', marginRight: 25, fontSize: 20 }}>
                Venues
              </Text>
              <Text style={{ color: '#66dac7', fontSize: 20 }}>Price $</Text>
            </View>

            <FlatList
              data={this.state.cryptosRanking}
              keyExtractor={this._keyExtractor}
              refreshing={this.state.isFetching}
              onRefresh={() => this.onRefresh()}
              renderItem={({ item, index }) => {
                console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                return (
                  <View
                    style={{
                      backgroundColor: '#2e4158',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      padding: 10
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <View style={{ flexDirection: 'row', width: 120 }}>
                        <Image
                          style={{ width: 30, height: 30, marginLeft: 20 }}
                          source={{ uri: item.crypto_logo }}
                        />
                        <Text
                          style={{
                            color: '#ffffff',
                            marginTop: 5,
                            marginLeft: 25,
                            fontSize: 20
                          }}
                        >
                          {item.crypto_symbol}
                        </Text>
                      </View>
                      {/* <Text style={{ color: '#66dac7', fontSize: 15, marginTop: 10, marginLeft: 10  }}>Venues</Text> */}
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 20,
                          marginTop: 5,
                          marginLeft: 50,
                          marginRight: 10,
                          width: 'auto'
                        }}
                      >
                        {item.venues_count}
                      </Text>
                      {/* <Text style={{ color: '#66dac7', fontSize: 15, marginTop: 10  }}>Price $</Text> */}
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 20,
                          marginTop: 6,
                          width: 140,
                          textAlign: 'right'
                        }}
                      >
                        {item.crypto_price}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#2e4158'
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  // borderWidth: 2,
                  // borderColor: '#2e4158',
                  backgroundColor: '#2e4158',
                  alignSelf: 'center',
                  // margin: 3,
                  marginTop: 6,
                  marginLeft: 6,
                  marginRight: 3,
                  marginBottom: 6,
                  padding: 8
                }}
                onPress={() => this.setState({ isViewingVenues: true })}
              >
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#66dac7'
                  }}
                >
                  Venues
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  // borderWidth: 2,
                  // borderColor: '#2e4158',
                  backgroundColor: '#66dac7',
                  shadowColor: 'black',
                  shadowOffset: {
                    height: 2,
                    width: 2
                  },
                  shadowOpacity: 100,
                  elevation: 20,
                  alignSelf: 'center',
                  // margin: 3,
                  marginTop: 6,
                  marginLeft: 3,
                  marginRight: 6,
                  marginBottom: 6,
                  padding: 8
                }}
              >
                <Text
                  style={{
                    alignSelf: 'center'
                  }}
                >
                  Transactions
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchBarStyle}>
              {/* <View
                style={{
                  // flex: 1,
                  // width: '95%',
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                  borderColor: '#445366',
                  // padding: 10,
                  marginTop: 2,
                  // marginBottom: 5,
                  marginLeft: 10,
                  marginRight: -22
                  // fontSize: 15,
                  // color: 'black'
                }}
              > */}
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
              {/* </View> */}
              <TextInput
                style={styles.searchStyle}
                underlineColorAndroid="transparent"
                placeholder="Search through Transactions"
                placeholderTextColor="black"
                onChangeText={transactionsSearch =>
                  this.setState({ transactionsSearch })
                }
                onChange={this.searchCryptosTransactions}
                value={this.state.transactionsSearch}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#2e4158',
                padding: 15
              }}
            >
              {/* <Text style={{ color: '#66dac7', marginLeft: 25, marginRight: 25, fontSize: 20 }}>#</Text> */}
              <Text style={{ color: '#66dac7', fontSize: 20 }}>
                Cryptocurrency
              </Text>
              <Text
                style={{
                  color: '#66dac7',
                  marginLeft: 10,
                  marginRight: 25,
                  fontSize: 20
                }}
              >
                Transactions
              </Text>
              <Text style={{ color: '#66dac7', fontSize: 20 }}>Price $</Text>
            </View>

            <FlatList
              data={this.state.cryptosTransactions}
              keyExtractor={this._keyExtractor}
              refreshing={this.state.isFetching}
              onRefresh={() => this.onRefresh()}
              renderItem={({ item, index }) => {
                console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                return (
                  <View
                    style={{
                      backgroundColor: '#2e4158',
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      padding: 10
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <View style={{ flexDirection: 'row', width: 120 }}>
                        <Image
                          style={{ width: 30, height: 30, marginLeft: 20 }}
                          source={{ uri: item.crypto_logo }}
                        />
                        <Text
                          style={{
                            color: '#ffffff',
                            marginTop: 5,
                            marginLeft: 25,
                            fontSize: 20
                          }}
                        >
                          {item.crypto_symbol}
                        </Text>
                      </View>
                      {/* <Text style={{ color: '#66dac7', fontSize: 15, marginTop: 10, marginLeft: 10  }}>Venues</Text> */}
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 20,
                          marginTop: 5,
                          marginLeft: 50,
                          marginRight: 10,
                          width: 'auto'
                        }}
                      >
                        {item.total_transactions}
                      </Text>
                      {/* <Text style={{ color: '#66dac7', fontSize: 15, marginTop: 10  }}>Price $</Text> */}
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 20,
                          marginTop: 6,
                          width: 140,
                          textAlign: 'right'
                        }}
                      >
                        {item.crypto_price}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    backgroundColor: '#2e4158',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#2e4158'
    // alignSelf: 'stretch',
    // flexDirection: 'column'
  },
  searchButtonStyle: {
    backgroundColor: 'orange',
    width: 50,
    height: 45,
    alignContent: 'center',
    borderRadius: 5
  },
  buyButtonStyle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#2e4158',
    padding: 10,
    flex: 1,
    textAlign: 'center'
  },
  searchBarStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#445366',
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 5,
    marginTop: 6,
    marginBottom: 5
    // marginLeft: 10,
    // marginRight: 10,
    // fontSize: 15,
    // color: 'black'
  }
});
