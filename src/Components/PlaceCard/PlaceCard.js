import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './PlaceCard.css';


const PlaceCard = props => {
   
    const {cardProperty, cardSliderValue, handleCardData} = props;

    const firstCard = cardProperty[cardSliderValue];
    const secondCard = cardProperty[cardSliderValue + 1];
    const thirdCard = cardProperty[cardSliderValue + 2];


    useEffect(()=> {
        handleCardData(firstCard);
    },[])

    return (
        <>
            <Card onClick={() => handleCardData(firstCard)} className="card_item d-flex align-items-end text-white">
                <Card.Img className='card_image' src={firstCard.image} alt="Card image" />
                <Card.ImgOverlay className="img_overlay d-flex align-items-end">
                <Card.Title className='card_title'>{firstCard.destination}</Card.Title>
                </Card.ImgOverlay>
            </Card>
            <Card onClick={() => props.handleCardData(secondCard)} className="card_item d-flex align-items-end text-white">
                <Card.Img className='card_image' src={secondCard.image} alt="Card image" />
                <Card.ImgOverlay className="img_overlay d-flex align-items-end">
                <Card.Title className='card_title'>{secondCard.destination}</Card.Title>
                </Card.ImgOverlay>
            </Card>
            <Card onClick={() => props.handleCardData(thirdCard)} className="card_item d-flex align-items-end text-white">
                <Card.Img className='card_image' src={thirdCard.image} alt="Card image" />
                <Card.ImgOverlay className="img_overlay d-flex align-items-end">
                <Card.Title className='card_title'>{thirdCard.destination}</Card.Title>
                </Card.ImgOverlay>
            </Card>
        </>
    )      
};

export default PlaceCard;