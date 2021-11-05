import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from "react";

const GoogleMap = (props) => {
	const mapStyles = {
		width: "100%",
		height: "100%",
		borderRadius: "10px",
	};

	const state = {
		stores: [
			{ lat: 47.49855629475769, lng: -122.14184416996333 },
			{ latitude: 47.359423, longitude: -122.021071 },
			{ latitude: 47.2052192687988, longitude: -121.988426208496 },
			{ latitude: 47.6307081, longitude: -122.1434325 },
			{ latitude: 47.3084488, longitude: -122.2140121 },
			{ latitude: 47.0, longitude: -122.34 },
			{ latitude: 46.5, longitude: 122.16 },
			{ latitude: 48.0, longitude: -122.17 },
		],
	};

	const displayMarkers = () => {
		return state.stores.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.latitude,
						lng: store.longitude,
					}}
				/>
			);
		});
	};

	return (
		<Map
			google={props.google}
			zoom={8}
			style={mapStyles}
			initialCenter={{ lat: 47.444, lng: -122.176 }}
		>
			{displayMarkers()}
		</Map>
	);
};

export default GoogleApiWrapper({
	apiKey: "AIzaSyCRrJGet_zu5uIF6rfYdjoYB0dswkh2h1k",
})(GoogleMap);
