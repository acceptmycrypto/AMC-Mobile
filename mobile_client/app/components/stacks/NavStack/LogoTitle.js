import * as React from "react";
import { Image } from "react-native";

export default class LogoTitle extends React.Component {
	render() {
		return (
			<Image
				source={require("../../../assets/images/logo.png")}
<<<<<<< HEAD
				style={{ height: 30, width: 70, resizeMode: 'contain', justifyContent: 'center', marginBottom: 10 }}
=======
				style={{ height: 30, width: 70, resizeMode: 'contain' }}
>>>>>>> e932b9521e02a92ff1e15a5cb0fee4e00ab93fd4
			/>
		);
	}
}
