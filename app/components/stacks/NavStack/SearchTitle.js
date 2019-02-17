import * as React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class SearchTitle extends React.Component {
  searchNav = () => {
    this.props.navigation.navigate('Search');
  };

  render() {
    return (
      <TouchableOpacity style={styles.searchStyle} onPress={this.searchNav}>
        <Image
          source={require('../../../assets/images/search-icon.png')}
          style={{
            height: 20,
            width: 50,
            resizeMode: 'contain',
            marginLeft: -10
          }}
        />
        <Text style={{ marginTop: 2 }}>Search for anything</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 11,
    marginTop: 2
  }
});

export default withNavigation(SearchTitle);
