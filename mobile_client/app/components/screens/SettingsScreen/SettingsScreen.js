import * as React from "react";
import { View, Text, Button } from "react-native";

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	fetcher = () => {
		return fetch("http://9e0eefb6.ngrok.io/posts").then(res => res.json());
	};

	handleSubmit() {
		this.fetcher().then(res => {
			console.log(res);
			// this.props.navigator.push({
			// 	passProps: { userInfo: res }
			// });
		});
	}

	static navigationOptions = ({ navigation }) => {
		// const params = navigation.state.params || {};

		return {
			// headerTitle: <LogoTitle />,
			// title: 'homemade'
			// headerRight: (
			// 	<Button
			// 		onPress={() =>
			// 			navigation.navigate("Cart", {
			// 				_id: 1,
			// 				name: "Taylor",
			// 				age: 25,
			// 				sex: "Male",
			// 				foodPreference: "Vegan"
			// 			})
			// 		}
			// 		// onPress={() => Alert.alert("this is a button!")}
			// 		title="cart"
			// 		// title="+1"
			// 		color="#fff"
			// 	/>
			// )
		};
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Settings!</Text>
				<Button
					title="Go to Browse"
					onPress={() => this.props.navigation.navigate("Browse")}
				/>
				<Button
					title="Go to Cart"
					onPress={() => this.props.navigation.navigate("Cart")}
				/>
				<Button
					title="Pull Data"
					onPress={() => this.handleSubmit()}
				/>
			</View>
		);
	}
}
