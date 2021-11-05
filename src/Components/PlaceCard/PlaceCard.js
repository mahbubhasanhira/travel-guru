import React from "react";
import { Card } from "react-bootstrap";
import "./PlaceCard.css";

const PlaceCard = ({ cardData, setCardData }) => {
	return (
		<Card
			onClick={() => setCardData(cardData)}
			className="card_item d-flex align-items-end text-white"
		>
			<Card.Img className="card_image" src={cardData?.image} alt="Card image" />
			<Card.ImgOverlay className="img_overlay d-flex align-items-end">
				<Card.Title className="card_title">{cardData?.destination}</Card.Title>
			</Card.ImgOverlay>
		</Card>
	);
};

export default PlaceCard;
