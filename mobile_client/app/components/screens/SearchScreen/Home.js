import PropTypes from "prop-types";
import * as React from "react";
import {
	Text,
	TextInput,
	Image,
	NavigatorIOS,
	TouchableOpacity,
	Button,
	Alert,
	StyleSheet,
	View,
	ScrollView
} from "react-native";
import Map from "../Map/Map";

export default class Home extends React.Component {
	drop = () => {
		Alert.alert("HEY!");
	};

	checkout = () => {
		Alert.alert("Good Pick!");
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.nav}>
					{/* <NavigatorIOS
						initialRoute={{
						component: MyScene,
						title: 'My Initial Scene',
						}}
						style={{flex: 1}}
					/> */}
					{/* <Text>Open up App.js to start working on your app!</Text> */}
					<TouchableOpacity onPress={this.drop}>
						<Image
							source={require("./assets/images/dropdown-menu.png")}
							style={styles.dropdown}
						/>
					</TouchableOpacity>
					<Text style={styles.header}>homemade</Text>
					<TouchableOpacity onPress={this.checkout}>
						<Image
							source={require("./assets/images/checkout.png")}
							style={styles.cart}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.search}>
					<TextInput
						type="text"
						placeholder=" search for food or chef.."
						style={styles.foodSearch}
					/>
				</View>
				<View style={styles.location}>
					<TextInput
						type="text"
						placeholder=" input your location"
						style={styles.inputLocation}
					/>
				</View>
				{/* <ScrollView style={{ flex: 1 }}> */}
					<View style={{ flex: .8 }}>
						<Map style={StyleSheet.absoluteFillObject} />
					</View>
				{/* </ScrollView> */}
			</View>
		);
	}
}

// class MyScene extends React.Component {
// 	static propTypes = {
// 	//   title: PropTypes.string.isRequired,
// 	  navigator: PropTypes.object.isRequired,
// 	}

// 	_onForward = () => {
// 	  this.props.navigator.push({
// 		title: 'Scene',
// 	  });
// 	}

// 	render() {
// 	  return (
// 		<View>
// 		  <Text>Current Scene: { this.props.title }</Text>
// 		  <TouchableHighlight onPress={this._onForward}>
// 			<Text>Tap me to load the next scene</Text>
// 		  </TouchableHighlight>
// 		</View>
// 	  )
// 	}
//   }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: "row",
		backgroundColor: "#fff",
		// alignItems: "center"
		// justifyContent: "center"
	},
	nav: {
		flex: 0.1,
		flexDirection: "row",
		backgroundColor: "#ffa500",
		// alignItems: "center",
		justifyContent: "space-between"
		// height: 200
	},
	dropdown: {
		// flex: 1,
		// height: undefined,
		// width: undefined,
		// resizeMode: 'contain',

		// flexDirection: 'column',
		// alignSelf: 'center',
		// position: 'absolute',
		// justifyContent: "flex-start",
		height: 40,
		width: 40,
		// borderRadius: 50,
		marginTop: 20,
		marginLeft: 10
	},
	header: {
		// flex: 1,
		fontSize: 35,
		marginTop: 15,
		marginLeft: 15,
		// marginRight: 40,
		// alignItems: "center",
		// alignSelf: "center",
		// justifyContent: "center"
	},
	cart: {
		// flex: 0.3,
		// height: undefined,
		// width: undefined,
		// resizeMode: 'contain',

		// flexDirection: "column",
		// alignSelf: "center",
		// position: 'absolute',
		// justifyContent: "flex-end",
		height: 50,
		width: 50,
		// borderRadius: 50,
		marginTop: 15,
		marginRight: 5
	},
	search: {
		flex: 0.1,
		flexDirection: "row",
		backgroundColor: "#ffa500"
	},
	foodSearch: {
		flex: 1,
		// flexDirection: 'row',
		borderWidth: 2,
		// width: 100,
		height: 40,
		// marginTop: 10
		marginLeft: 5,
		marginRight: 5
	},
	location: {
		flex: 0.03,
		flexDirection: "row",
		backgroundColor: "#ffa500"
	},
	inputLocation: {
		flex: 1,
		// flexDirection: 'row',
		borderWidth: 2,
		// width: 100,
		height: 40,
		marginTop: -24,
		marginLeft: 5,
		marginRight: 5
	}
});
