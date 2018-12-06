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
    // flexGrow: 1,
    backgroundColor: '#2e4158',
    alignItems: 'center',
    justifyContent: 'center'
    // flexDirection: 'column',
    // alignSelf: 'stretch',
  },
  logo: {
    flex: 0.8,
    resizeMode: 'contain',
    marginTop: 40
    // width: '100%',
    // height: '30%',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  logoText: {
    fontSize: 20,
    marginTop: -5,
    marginBottom: 40
  },
  nameInput: {
    height: 35,
    width: '38%',
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    // borderRadius: 4,
    borderColor: '#445366',
    padding: 5,
    margin: 8,
    fontSize: 15,
    color: '#fff'
    // fontWeight: 'bold',
    // textDecorationColor: 'gray',
  },
  textInput: {
    height: 35,
    // height: '5%',
    width: '80%',
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    // borderRadius: 4,
    borderColor: '#445366',
    padding: 5,
    // margin: 8,
    fontSize: 15,
    color: '#fff'
    // fontWeight: 'bold',
    // textDecorationColor: 'gray',
    // width: 85%;
    // background-color: initial;
    // color: #fff;
    // outline: none;
    // border: none;
    // border-bottom: 1px solid #445366;
    // font-size: 1em;
    // font-weight: 300;
    // padding-bottom: 10px;
    // margin-top: 10px;
  },
  //   signin: {
  //     height: 30,
  //     width: '80%',
  //     backgroundColor: '#fff',
  //     borderWidth: 2,
  //     // borderRadius: 4,
  //     borderColor: 'black',
  //     shadowColor: 'black',
  //     shadowOffset: {
  //       width: 5,
  //       height: 50
  //     },
  //     shadowOpacity: 100,
  //     padding: 5,
  //     margin: 8
  //   },
  createButton: {
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#52c4b9',
    width: '70%',
    // marginTop: 10,
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
    // width: '100%',
    backgroundColor: '#52c4b9',
    color: '#fff',
    // borderWidth: 2,
    // borderRadius: 25,
    // borderColor: 'black',
    padding: 7,
    margin: 5,
    textAlign: 'center',
    alignSelf: 'center',
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 5,
    //   height: 5
    // },
    // shadowOpacity: 100,
    fontSize: 13,
    fontWeight: '500'
    // fontWeight: 'bold',
    // background-color: #52c4b9;
    // color: #fff;
    // border: none;
    // outline: none;
    // border-radius: 25px;
    // padding: 15px 70px;
    // font-size: .8em;
    // font-weight: 500;
  },
  selector: {
    width: '80%'
    // marginTop: -15
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
    marginBottom: 30
  },
  loginGap: {
    flex: 1,
    justifyContent: 'space-around'
  },
  // registerGap: {
  //   flex: 0.8,
  //   justifyContent: 'space-around'
  // },

  // DEALS SCREEN
  dealsContainer: {
    flex: 1,
    backgroundColor: '#2e4158',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  textStyle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '200'
  },
  postStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    flexDirection: 'row'
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
    color: '#fff'
  },
  searchBarStyle: {
    flexDirection: 'row',
    marginTop: 5
  }
});
