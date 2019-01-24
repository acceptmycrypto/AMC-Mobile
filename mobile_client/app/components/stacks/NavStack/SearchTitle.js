import * as React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class SearchTitle extends React.Component {

  searchNav = () => {
    this.props.navigation.navigate('Search');
  }

  render() {
    return (
      // <Image
      // 	source={require("../../../assets/images/logo.png")}
      // 	style={{ height: 30, width: 70, resizeMode: 'contain' }}
      // />
      <TouchableOpacity 
        style={styles.searchStyle} 
        onPress={this.searchNav}
      >
        <Image 
          source={require('../../../assets/images/search-icon.png')}
          style={{ height: 20, width: 50, resizeMode: 'contain', marginLeft: -10 }}
        />
        <Text style={{ marginTop: 2 }}>Search for anything</Text>
        {/* underlineColorAndroid="transparent"
        placeholder="Search for anything"
        placeholderTextColor="#58697e"
        onChangeText={search => this.setState({ search })}
        onChange={this.searchPost}
        value={this.state.search} */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#445366',
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 10,
    marginTop: 2,
    // marginBottom: 5,
    // marginLeft: 10,
    // marginRight: 10,
    fontSize: 15,
    color: '#fff'
  }
});

export default withNavigation(SearchTitle);
