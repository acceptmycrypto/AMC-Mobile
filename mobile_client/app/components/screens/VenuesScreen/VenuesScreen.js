import React, { Component } from 'react';
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
// import "./CryptosRanking.css";

class CryptosRankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptosRanking: [],
      search: '',
      isViewingVenues: true
    };
  }

  componentWillMount = async () => {
    let url = 'https://acceptmycrypto.herokuapp.com' || 'http://localhost:3001';
    const cryptosList = await fetch(url + '/cryptos');
    const cryptosRanking = await cryptosList.json();
    
    this.setState({ cryptosRanking });
    console.log(this.state.cryptosRanking)
  };

  //   cryptoRankings = () => {
  //     {this.state.cryptosRanking.map((crypto, i) => (
  //         <tr key={crypto + i}>
  //           <th scope="row">{i + 1}</th>
  //           <td>
  //             <img src={crypto.crypto_logo} alt="crypto-logo" />{' '}
  //             {crypto.crypto_symbol}
  //           </td>
  //           <td>{crypto.venues_count}</td>
  //           <td>{crypto.crypto_price}</td>
  //         </tr>
  //       ))}
  //   }

  _keyExtractor = (item, index) => JSON.stringify(item.id);

  searchPost = async () => {
    let url = 'https://amc-web.herokuapp.com' || 'http://localhost:3001';
    try {
      const cryptosList = await fetch(url + '/cryptos');
      await cryptosList.json()
          .then(
            resJSON => {
              console.log(resJSON);
              let searchData = resJSON.filter(postData => {
                console.log('POST ' + JSON.stringify(postData));
                return postData.crypto_name.includes(this.state.search);
              });
              this.setState({ cryptosRanking: searchData });
            },
            function() {
              this.setState({ search: '' });
            }
          )
          .catch(err => console.log(err));
    } catch (error) {
      console.log('TOKEN ERROR' + error);
    }
  };

  render() {
    const isViewingVenues = this.state.isViewingVenues;
    const tableHeader = this.state.tableHeader;
    const tableRow = this.state.tableRow;

    // const cryptoData = [
    //   {
    //     title: tableHeader,
    //     data: [tableRow]
    //   },{
    //     title: tableHeader,
    //     data: [tableRow]
    //   }
    // ]

    // const sections = this.state.cryptosRanking.map((crypto, i) =>(
    //   {title: crypto.crypto_logo + crypto.crypto_symbol},
    //   {data: crypto.venues_count + crypto.crypto_price}
    // ))

    // console.log(sections)

    if (isViewingVenues === true) {
      return (
        <View style={styles.container}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2e4158' }}
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
                  alignSelf: 'center'
                }}
              >
                Transactions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBarStyle}>
            <TextInput
              style={styles.searchStyle}
              underlineColorAndroid="transparent"
              placeholder="Search through Accepted Cryptos"
              placeholderTextColor="#58697e"
              onChangeText={search => this.setState({ search })}
              onChange={this.searchPost}
              value={this.state.search}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2e4158', padding: 15 }}>
            {/* <Text style={{ color: '#66dac7', marginLeft: 25, marginRight: 25, fontSize: 20 }}>#</Text> */}
            <Text style={{ color: '#66dac7', fontSize: 20 }}>Cryptocurrency</Text>
            <Text style={{ color: '#66dac7', marginRight: 25, fontSize: 20 }}>Venues</Text>
            <Text style={{ color: '#66dac7', fontSize: 20 }}>Price $</Text>
          </View>

          <FlatList
            data={this.state.cryptosRanking}
            keyExtractor={this._keyExtractor}
            renderItem={({ item, index }) => {
              console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              return (
                <View style={{ backgroundColor: '#2e4158', borderBottomColor: 'black', borderBottomWidth: 1, padding: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', width: 120 }}>
                  <Image style={{ width: 30, height: 30, marginLeft: 20 }} source={{uri: item.crypto_logo}} />
                  <Text style={{ color: '#ffffff', marginTop: 5, marginLeft: 25, fontSize: 20 }}>{item.crypto_symbol}</Text>
                  </View>
                  {/* <Text style={{ color: '#66dac7', fontSize: 15, marginTop: 10, marginLeft: 10  }}>Venues</Text> */}
                  <Text style={{ color: '#ffffff', fontSize: 20, marginTop: 5, marginLeft: 50, marginRight: 10, width: 15  }}>{item.venues_count}</Text>
                  {/* <Text style={{ color: '#66dac7', fontSize: 15, marginTop: 10  }}>Price $</Text> */}
                  <Text style={{ color: '#ffffff', fontSize: 20, marginTop: 6, width: 120, textAlign: 'right'  }}>{item.crypto_price}</Text>
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
            style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2e4158' }}
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

          {/* <FlatList 
            data={this.state.cryptosRanking}
            keyExtractor={this._keyExtractor}
            renderItem={({cryptos}) => console.log(cryptos)}
          /> */}

        {/* <SectionList
          sections={sections}
          stickySectionHeadersEnabled={true}
          renderSectionHeader={({section}) => <Text style={{ height: 40, backgroundColor: 'yellow' }}>hi</Text>}
          renderItem={({item}) => <Text style={{ height: 40, backgroundColor: 'green' }}>{item}</Text>}
          keyExtractor={this._keyExtractor}
        /> */}

          {/* <SectionList
            contentContainerStyle={{  }}
            sections={sections}
            stickySectionHeadersEnabled={true}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => {
              return <View style={{height: 1, backgroundColor: 'red'}} />
            }}
            renderSectionHeader={() => {
              return <Text style={{height: 40, backgroundColor: 'green', width: '25%'}}>Section header</Text>
            }}
            renderItem={() => {
              return <Text style={{height: 40, backgroundColor: 'yellow', flexDirection: 'column'}}>{item}</Text>
            }}
            getItemLayout={(data, index) => {
              console.log(`getItemLayout called with index: ${index}`);
              return { length: 44, offset: 44 * index, index: index };
            }}
          /> */}

          {/* <ScrollView>
            {this.state.cryptosRanking.map(cryptosRankingInfo => {
              console.log(cryptosRankingInfo);
              return (
                <TouchableOpacity
                  style={styles.postStyle}
                  key={cryptosRankingInfo.id}
                  onPress={() => this.viewPost(cryptosRankingInfo.id)}
                >
                  <Image
                    style={{ width: 150, height: 150 }}
                    source={{ url: cryptosRankingInfo.crypto_logo }}
                  />
                  <View style={{ marginLeft: 20, flex: 1 }}>
                    <Text style={styles.textStyle}>
                      {cryptosRankingInfo.title}
                    </Text>
                    <Text>{cryptosRankingInfo.information}</Text>
                    <TouchableOpacity
                      style={{
                        alignContent: 'flex-end',
                        marginLeft: 120,
                        marginTop: 10
                      }}
                      onPress={this.buyPost}
                    >
                      <Text style={styles.buyButtonStyle}>
                        {'$' + cryptosRankingInfo.pay_in_crypto}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView> */}
        </View>
      );
    }

    {
      /* <Text style={{ flex: 1, flexDirection: 'row' }}>
          # Cryptocurrency Venues Price $
        </Text>
        <FlatList
          data={this.state.cryptosRanking}
          keyExtractor={this._keyExtractor}
          renderItem={({ crypto, i }) => {
            console.log(`Item = ${JSON.stringify(crypto)}, index = ${i}`);
            // console.log(crypto, i);
            return (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                style={styles.postStyle}
                key={crypto + i}
                // onPress={() => this.viewPost(item)}
              >
              <Text>{i + 1}</Text>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: crypto.crypto_logo }}
                />
                <View style={{ marginLeft: 20, flex: 1 }}>
                <Text style={styles.textStyle}>{crypto.crypto_symbol}</Text>

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
        } */
    }
    {
      /* <TouchableOpacity
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
        <Icon name="plus"  size={30} color="#ffffff" />
      </TouchableOpacity> */
    }

    // <SectionList
    //     renderItem={this.state.cryptosRanking.map((crypto, i) => ( <Text key={crypto + i}>{crypto}</Text>)}
    //     renderSectionHeader={({section: {title}}) => (
    //         <Text style={{fontWeight: 'bold'}}>{title}</Text>
    //     )}
    //     sections={[
    //         {title: '#', data: ['item1', 'item2']},
    //         {title: 'Cryptocurrency', data: ['item1', 'item2']},
    //         {title: 'Venues', data: ['item3', 'item4']},
    //         {title: 'Price', data: ['item5', 'item6']},
    //     ]}
    //     keyExtractor={(item, index) => item + index}
    // />

    //   <thead>
    //     <tr>
    //       <th scope="col">#</th>
    //       <th scope="col">Cryptocurrency</th>
    //       <th scope="col">Venues</th>
    //       <th scope="col">Price $</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {this.state.cryptosRanking.map((crypto, i) => (
    //       <tr key={crypto + i}>
    //         <th scope="row">{i + 1}</th>
    //         <td>
    //           <img src={crypto.crypto_logo} alt="crypto-logo" />{' '}
    //           {crypto.crypto_symbol}
    //         </td>
    //         <td>{crypto.venues_count}</td>
    //         <td>{crypto.crypto_price}</td>
    //       </tr>
    //     ))}
    //   </tbody>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e4158',
    alignSelf: 'stretch',
    flexDirection: 'column'
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
    flexDirection: 'row',
    marginTop: 5
  },
  searchStyle: {
    // backgroundColor: "#2e4158",
    // padding: 8,
    // marginBottom: 5,
    // marginLeft: 5,
    // width: '100%',
    // height: 45,

    // height: 35,
    flex: 1,
    // width: '95%',
    borderBottomWidth: 1,
    borderColor: '#445366',
    padding: 5,
    marginTop: 2,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    color: 'black'
  },
});

export default CryptosRankings;
