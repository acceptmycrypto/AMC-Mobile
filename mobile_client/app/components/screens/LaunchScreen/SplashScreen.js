import * as React from "react";
import { View, Image } from "react-native";

export default class LogoTitle extends React.Component {
	render() {
		return (
            <View style={{flex: 1, flexDirection: "column", backgroundColor: '#66dac7', alignItems: 'center', justifyContent: 'center',  }}>
			<Image
				source={require("../../../assets/images/logo.png")}
				style={{ alignItems: 'center', justifyContent: 'center' }}
			/>
            </View>
		);
	}
}
