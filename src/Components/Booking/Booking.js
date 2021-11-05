import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import "./Booking.css";

const Booking = () => {
	const { cardData, setDestination } = useContext(UserContext);
	const end_date = new Date();
	end_date.setDate(end_date.getDate() + 10);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(end_date);

	const handleStartBooking = () => {
		const newCard = { ...cardData };
		newCard.startDate = startDate;
		newCard.endDate = endDate;
		setDestination(newCard);
	};
	return (
		<div className='bookingContainer' style={{backgroundImage:`url(${cardData?.image})`}}>
			<Header />
			<div className="booking_area">
				<div className="booking_data">
					<h1>{cardData.destination}</h1>
					<p>{cardData.description}</p>
					<Link to="/" className="booking_btn">
						<FontAwesomeIcon icon={faArrowLeft} /> Back
					</Link>
				</div>
				<div className="booking_form">
					<form action="">
						<label>Origin</label>
						<p>{cardData.origin}</p>
						<label>Destination</label>
						<p>{cardData.destination}</p>
						<div className="d-flex justify-content-around">
							<div>
								<label>From</label>
								<DatePicker
									className="Custom_date"
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									selectsStart
									startDate={startDate}
									endDate={endDate}
									dateFormat="dd/MM/yyyy"
									showMonthYearPicker
								/>
							</div>
							<div>
								<label>To</label>
								<DatePicker
									className="Custom_date"
									selected={endDate}
									onChange={(date) => setEndDate(date)}
									selectsEnd
									startDate={startDate}
									endDate={endDate}
									dateFormat="dd/MM/yyyy"
									showMonthYearPicker
								/>
							</div>
						</div>
						<Link to="/hoteldetails">
							<button
								onClick={handleStartBooking}
								className="start_booking_btn"
							>
								Start Booking
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Booking;
