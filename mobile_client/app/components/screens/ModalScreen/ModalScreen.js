import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";

export default class ModalScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text style={{ fontSize: 30 }}>Search for some food!</Text>

				{/* <View style="">
					<TextInput
						type="text"
						placeholder=" search for food or chef.."
						style=""
					/>
				</View> */}
				{/* <View style="">
					<TextInput type="text" placeholder=" input your location" style="" />
				</View> */}

				<Button
					onPress={() => this.props.navigation.navigate('Main')}
					title="Dismiss"
				/>
			</View>
		);
	}
}
