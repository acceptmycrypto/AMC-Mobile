import * as React from "react";
import { Image } from "react-native";

export default class LogoTitle extends React.Component {
	render() {
		return (
			<Image
				source={require("../../../assets/images/logo.png")}
				style={{ height: 30, width: 70, resizeMode: 'contain', justifyContent: 'center', marginBottom: 10 }}
			/>
		);
	}
}
