'use strict';
const React = require('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create({
  // LAUNCH SCREEN
  flexRow: {
    flexDirection: 'row',
    marginTop: 25
  },
  font25: {
    fontSize: 25,
    marginBottom: 25
  },
  font12: {
    fontSize: 12
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  container: {
    flex: 1,
    backgroundColor: '#2e4158',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    flex: 0.8,
    resizeMode: 'contain',
    marginTop: 40
  },
  logoText: {
    fontSize: 20,
    marginTop: -5,
    marginBottom: 40
  },
  nameInput: {
    height: 35,
    width: '38%',
    borderBottomWidth: 1,
    borderColor: '#445366',
    padding: 5,
    margin: 8,
    fontSize: 15,
    color: '#fff'
  },
  textInput: {
    height: 35,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#445366',
    padding: 5,
    fontSize: 15,
    color: '#fff'
  },
  createButton: {
    alignSelf: 'center',
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#52c4b9',
    width: '70%',
    marginBottom: 15
  },
  signinButton: {
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#52c4b9',
    width: '70%',
    marginTop: 15,
    marginBottom: 15
  },
  buttonText: {
    height: 30,
    backgroundColor: '#52c4b9',
    color: '#fff',
    padding: 7,
    margin: 5,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 13,
    fontWeight: '500'
  },
  selector: {
    width: '80%'
  },
  selectorText: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#66dac7',
    textDecorationLine: 'underline'
  },
  termsTop: {
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 5
  },
  termsBottom: {
    fontSize: 12,
    alignSelf: 'center',
    marginBottom: 20
  },
  loginGap: {
    flex: 1,
    justifyContent: 'space-around'
  },

  // DEALS SCREEN
  dealsContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  textStyle: {
    // marginTop: 10,
    fontSize: 15,
    fontWeight: '200'
  },
  homePostStyle: {
    padding: 5
  },
  searchPostStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    height: 300,
    borderColor: '#dbd8ce',
    padding: 10,
    flexDirection: 'row'
  },
  postStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    height: 300,
    borderColor: '#dbd8ce',
    padding: 10
    // flexDirection: 'row',
  },
  searchPostStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    flexDirection: 'row'
  },
  searchStyle: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#445366',
    backgroundColor: 'white',
    // borderRadius: 20,
    padding: 7,
    marginTop: 8,
    marginBottom: 7
    // marginLeft: 10,
    // marginRight: 10,
    // fontSize: 15,
    // color: 'black'
  },
  searchBarStyle: {
    backgroundColor: 'white',
    flexDirection: 'row'
    // marginTop: 5,
    // marginBottom: 7,
    // marginLeft: 10,
    // marginRight: 10,
  }
});
