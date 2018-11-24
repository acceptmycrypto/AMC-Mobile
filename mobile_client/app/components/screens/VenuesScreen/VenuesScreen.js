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
// import "./CryptosRanking.css";

class CryptosRankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptosRanking: []
    };
  }

  componentWillMount = async () => {
    let url = 'https://amc-web.herokuapp.com' || 'http://localhost:3001';
    const cryptosList = await fetch(url + '/cryptos');
    console.log(cryptosList);
    const cryptosRanking = await JSON.stringify(cryptosList);
    console.log(cryptosRanking);

    this.setState({ cryptosRanking });
    console.log(this.state);
  }

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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBarStyle}>
          <TextInput
            style={styles.searchStyle}
            underlineColorAndroid="transparent"
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
        {this.state.dealsData.map(dealsDataInfo => {
          return (        
            <TouchableOpacity style={styles.postStyle} key={dealsDataInfo.id} onPress={() => this.viewPost(dealsDataInfo.id)}>
              <Image
                style={{ width: 150, height: 150 }}
                source={{ url: dealsDataInfo.featured_deal_image }}
              />
              <View style={{ marginLeft: 20, flex: 1 }}>
                <Text style={styles.textStyle}>{dealsDataInfo.title}</Text>
                <Text>{dealsDataInfo.information}</Text>
                <TouchableOpacity
                  style={{
                    alignContent: "flex-end",
                    marginLeft: 120,
                    marginTop: 10
                  }}
                  onPress={this.buyPost}
                >
                  <Text style={styles.buyButtonStyle}>
                    {"$" + dealsDataInfo.pay_in_crypto}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */}
        <Text style={{ flex: 1, flexDirection: 'row' }}>
          # Cryptocurrency Venues Price $
        </Text>
        <FlatList
          // data={this.state.cryptosRanking}
          keyExtractor={this._keyExtractor}
          renderItem={({ crypto, i }) => {
            // console.log(`Item = ${JSON.stringify(crypto)}, index = ${i}`);
            console.log(crypto, i);
            return (
              <View style={{ flexDirection: 'row' }}>
                {/* <TouchableOpacity
                style={styles.postStyle}
                key={crypto + i}
                // onPress={() => this.viewPost(item)}
              >
              <Text>{i + 1}</Text>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: crypto.crypto_logo }}
                /> */}
                {/* <View style={{ marginLeft: 20, flex: 1 }}> */}
                {/* <Text style={styles.textStyle}>{crypto.crypto_symbol}</Text> */}

                {/* <View
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
                </View> */}
                {/* </TouchableOpacity> */}
              </View>
            );
          }}
        />
        {/*}
      <TouchableOpacity
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

      // <SectionList
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
      // />
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

export default CryptosRankings;
