import * as React from "react";
import {
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Animated,
  AsyncStorage,
  BackHandler,
  Clipboard,
  Linking
} from "react-native";

export const states = [
  { label: "AL", value: "Alabama" },
  { label: "AK", value: "Alaska" },
  { label: "AZ", value: "Arizona" },
  { label: "AR", value: "Arkansas" },
  { label: "CA", value: "California" },
  { label: "CO", value: "Colorado" },
  { label: "CT", value: "Connecticut" },
  { label: "DE", value: "Delaware" },
  { label: "FL", value: "Florida" },
  { label: "GA", value: "Georgia" },
  { label: "HI", value: "Hawaii" },
  { label: "ID", value: "Idaho" },
  { label: "IL", value: "Illinois" },
  { label: "IN", value: "Indiana" },
  { label: "IA", value: "Iowa" },
  { label: "KS", value: "Kansas" },
  { label: "KY", value: "Kentucky" },
  { label: "LA", value: "Louisiana" },
  { label: "ME", value: "Maine" },
  { label: "MD", value: "Maryland" },
  { label: "MA", value: "Massachusetts" },
  { label: "MI", value: "Michigan" },
  { label: "MN", value: "Minnesota" },
  { label: "MS", value: "Mississippi" },
  { label: "MO", value: "Missouri" },
  { label: "MT", value: "Montana" },
  { label: "NE", value: "Nebraska" },
  { label: "NV", value: "Nevada" },
  { label: "NH", value: "New Hampshire" },
  { label: "NJ", value: "New Jersey" },
  { label: "NM", value: "New Mexico" },
  { label: "NY", value: "New York" },
  { label: "NC", value: "North Carolina" },
  { label: "ND", value: "North Dakota" },
  { label: "OH", value: "Ohio" },
  { label: "OK", value: "Oklahoma" },
  { label: "OR", value: "Oregon" },
  { label: "PA", value: "Pennsylvania" },
  { label: "RI", value: "Rhode Island" },
  { label: "SC", value: "South Carolina" },
  { label: "SD", value: "South Dakota" },
  { label: "TN", value: "Tennessee" },
  { label: "TX", value: "Texas" },
  { label: "UT", value: "Utah" },
  { label: "VT", value: "Vermont" },
  { label: "VA", value: "Virginia" },
  { label: "WA", value: "Washington" },
  { label: "WV", value: "West Virginia" },
  { label: "WI", value: "Wisconsin" },
  { label: "WY", value: "Wyoming" }
];

class DealItem extends React.Component {
  /*
    props: dealImage, dealName, size, color, dollar, crypto
  */
  render(){
    return(
      <View
        style={{
          borderBottomColor: "#dbd8ce",
          borderBottomWidth: 1,
          flexDirection: "row",
          padding: 10
        }}
      >
        <Image
          style={{ alignItems: "center", width: 58, height: 58 }}
          source={{ uri: this.props.dealImage }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginLeft: 10
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{this.props.dealName}</Text>
          <View style={{ flexDirection: "row", marginBottom: 2 }}>
            <View style={{ flexDirection: "row", width: "40%" }}>
              <Text style={{ fontWeight: "bold" }}>Size: </Text>
              <Text>{this.props.size} </Text>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <Text style={{ fontWeight: "bold" }}>Color:</Text>
              <Text> {this.props.color} </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", width: "40%" }}>
              <Text style={{ fontWeight: "bold" }}>Price: </Text>
              <Text>${this.props.dollar}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", color: "green" }}>
                Cryptocurrency:
              </Text>
              <Text style={{ color: "green" }}>
                {" "}
                ${this.props.crypto}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

//props
/*
  firstName, lastName, email, city, state, zipCode: string
*/
class Shipping extends React.Component {
  render(){
    return(
      <View
        style={{
          borderBottomColor: "#dbd8ce",
          borderBottomWidth: 1,
          flexDirection: "column",
          padding: 10
        }}
      >
        <View style={{flexDirection: "row"}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginRight: 10
            }}
          >
            Shipping To:
          </Text>

          <View style={{flexDirection: "column"}}>
            <View style={{flexDirection: "row"}}>
              <Text style={{fontWeight: "bold", fontSize: 16}}>{this.props.firstName + " " + this.props.lastName}</Text>
            </View>
            <Text style={{fontWeight: "bold", fontSize: 16}}>{this.props.address}</Text>
            <View style={{flexDirection: "row"}}>
              <Text style={{fontWeight: "bold", fontSize: 16}}>{this.props.city + ", " + this.props.state + ", " + this.props.zipCode}</Text>
            </View>
            { this.props.email ? (<Text style={{fontWeight: "bold", fontSize: 14}}>this.props.email</Text>): null}
          </View>
        </View>
      </View>
    );
  }
}

export {DealItem, Shipping};

