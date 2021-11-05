import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import blackLogo from "../../travel-guru-resource/Logo.png";
import whiteLogo from "../../travel-guru-resource/Logo2.png";
import "./Header.css";

const Header = () => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	const location = window.location.pathname;
	let customClassName =
		location === "/" || location.split("/")[1] === "booking"
			? "navForHome"
			: "navForOther";

	const handleLogout = () => {
		localStorage.removeItem("user");
		setLoggedInUser({ isSignIn: false });
	};

	return (
		<nav className="container navbar navbar-expand-lg navbar-light">
			<Link className="navbar-brand" to="/">
				{location === "/" || location.split("/")[1] === "booking" ? (
					<img className="travel_logo" src={whiteLogo} alt="home" />
				) : (
					<img className="travel_logo" src={blackLogo} alt="home" />
				)}
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="false"
				aria-label="Toggle navigation"
				style={{
					borderColor: location === "/" ? "white" : "black",
				}}
			>
				<span
					style={{ backgroundColor: location === "/" ? "white" : "black" }}
					className="navbar-toggle-span"
				/>
				<span
					style={{ backgroundColor: location === "/" ? "white" : "black" }}
					className="navbar-toggle-span"
				/>
				<span
					style={{ backgroundColor: location === "/" ? "white" : "black" }}
					className="navbar-toggle-span"
				/>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div className="navbar-nav ml-auto">
					<Link className={customClassName} to="#">
						News <span className="sr-only">(current)</span>
					</Link>
					<Link className={customClassName} to="#">
						Destination
					</Link>
					<Link className={customClassName} to="#">
						Blog
					</Link>
					<Link className={customClassName} to="#">
						Contact
					</Link>

					{loggedInUser.isSignIn && (
						<Link to="/hoteldetails" id="name" className={customClassName}>
							{loggedInUser.fullName}
						</Link>
					)}
					{loggedInUser.isSignIn ? (
						<Link
							to="#"
							id="login_btn"
							className={customClassName}
							onClick={handleLogout}
						>
							Logout
						</Link>
					) : (
						<Link id="login_btn" className={customClassName} to="/login">
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
