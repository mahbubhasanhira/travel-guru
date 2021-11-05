import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { default as allCardData } from "../fakeData/destination";
import Header from "../Header/Header";
import PlaceCard from "../PlaceCard/PlaceCard";
import "./Home.css";

const Home = () => {
	const { cardData, setCardData } = useContext(UserContext);
	const responsive = {
		moreLarge: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		largeDevice: {
			breakpoint: { max: 3000, min: 1300 },
			items: 3,
		},
		desktop: {
			breakpoint: { max: 1300, min: 1024 },
			items: 2,
		},
		laptop: {
			breakpoint: { max: 1024, min: 768 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 767, min: 600 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: 1,
		},
	};

	return (
		<div
			style={{
				backgroundImage: `url(${cardData?.image})`,
			}}
			className="home"
		>
			<Header />
			<div className="homeWrapper">
				{cardData?.destination && (
					<div className="homeCenter">
						<div className="text_container">
							<h1>{cardData.destination}</h1>
							<p>{cardData.description.slice(0, 210)}...</p>
							<Link to={`/booking/${cardData?.origin}`} className="booking_btn">
								Booking <FontAwesomeIcon icon={faArrowRight} />
							</Link>
						</div>
						<div className="card_container">
							<Carousel
								responsive={responsive}
								swipeable={false}
								draggable={false}
								keyBoardControl={false}
								renderArrowsWhenDisabled={true}
								infinite={true}
							>
								{allCardData.map((item, index) => (
									<PlaceCard
										key={index}
										setCardData={setCardData}
										cardData={item}
									></PlaceCard>
								))}
							</Carousel>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
