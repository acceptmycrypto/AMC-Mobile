import * as React from "react";
import { Image } from "react-native";

export default class LaunchTitle extends React.Component {
	render() {
		return (
			<Image
				source={require("../../../assets/images/login_logo.png")}
				style={{ height: 115, resizeMode: 'contain' }}
			/>
		);
	}
}
