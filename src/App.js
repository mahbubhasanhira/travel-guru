import React, { createContext, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import "./App.css";
import Booking from "./Components/Booking/Booking";
import fakeDataDestination from "./Components/fakeData/destination";
import Home from "./Components/Home/Home";
import HotelDetails from "./Components/HotelDetails/HotelDetails";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
	const [loggedInUser, setLoggedInUser] = useState({});
	const [destination, setDestination] = useState({});
	const [cardData, setCardData] = useState(fakeDataDestination[0]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("user"));
		if (data?.fullName) {
			setLoggedInUser(data);
		}
	}, []);
	return (
		<UserContext.Provider
			value={{
				loggedInUser,
				setLoggedInUser,
				destination,
				setDestination,
				cardData,
				setCardData,
			}}
		>
			<Router>
				<Switch>
					<Route exact path="/login">
						{localStorage.getItem("user") ? (
							<Redirect to="/hoteldetails" />
						) : (
							<Login />
						)}
					</Route>
					<PrivateRoute exact path="/hoteldetails">
						<HotelDetails />
					</PrivateRoute>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/booking/:destination">
						<Booking />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
