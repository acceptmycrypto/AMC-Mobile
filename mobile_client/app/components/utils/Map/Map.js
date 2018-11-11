// import * as React from "react";
// import { MapView } from "expo";
//
// export default class Map extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       latitude: 0,
//       longitude: 0,
//       name: "",
//       crypto: ""
//     };
//   }
//
//   // componentWillMount() {
//   //   this.setState({
//   //     latitude: this.props.latitude,
//   //     longitude: this.props.longitude,
//   //     name: this.props.crypto,
//   //     crypto: this.props.name
//   //   });
//   // }
//
//   render() {
//     let mapMarker = "";
//     console.log(this.props.latitude);
//     if (this.props.latitude != 0 && this.props.latitude != undefined) {
//       console.log(this.props.latitude);
//       mapMarker = (
//         <MapView.Marker
//           onPress={event => this.handleMarkerPress(event)}
//           coordinate={{
//             latitude: this.props.latitude,
//             longitude: this.props.longitude
//           }}
//           title={this.state.crypto}
//           description={this.state.name}
//         />
//       );
//     }
//
//     return (
//       // In the Mapview we will get the use the users location to
//       // get the initialRegion or figure out another way to get
//       // general location
//       <MapView
//         style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421
//         }}
//       >
//         {mapMarker}
//       </MapView>
//     );
//   }
// }

import * as React from "react";
import { MapView, TextInput } from "expo";
import { coordinate } from "./coordinates";

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userSearch: "",
      latitude: 0,
      longitude: 0,
      name: "",
      crypto: "",
      isSearching: false
    };
  }

  _coordinates = (lat, lng, name, crypto) => {
    this.setState({
      isSearching: true,
      latitude: lat,
      longitude: lng,
      name: name,
      crypto: crypto,
    })
  }

  render() {
    return (
      // In the Mapview we will get the use the users location to
      // get the initialRegion or figure out another way to get
      // general location
      <MapView
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
      {isSearching ? (
          <MapView.Marker
          coordinate={{
            latitude: this.state.lat,
            longitude: this.state.lng
          }}
          title={this.state.name}
          description={this.state.crypto}
        />
      ) : (
        coordinate.map(item => (
          <MapView.Marker
            coordinate={{
              latitude: item.lat,
              longitude: item.lng
            }}
            title={item.name}
            description={item.crypto}
          />
        ))
      )}

      </MapView>
    );
  }
}
