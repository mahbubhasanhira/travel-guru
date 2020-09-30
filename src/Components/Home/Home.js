import React, { useContext, useEffect, useState } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import './Home.css'
import fakeDataDestination from '../fakeData/destination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../App';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const Home = () => {
    const end_date = new Date()
    end_date.setDate(end_date.getDate() + 10)
    const [allCard, setAllCard] = useState([]);
    const [cardData, setCardData] = useState({});
    const [toggleBooking, setToggleBooking] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(end_date);
    
    const [loggedInUser, setLoggedInUser, destination, setDestination] = useContext(UserContext);

    const handleStartBooking = () => {
        const newCard = {...cardData};
        newCard.startDate = startDate;
        newCard.endDate = endDate;
        setDestination(newCard);
    }
    
   const [cardSliderValue, setCardSliderValue] = useState(0);
       
    const handleToggleBooking = condition => {
        setToggleBooking(condition); 
    }
    
    const handleCardData = singleData => {
        setCardData(singleData);
        
    }

    useEffect(()=> {
        setAllCard(fakeDataDestination);
        handleCardData(fakeDataDestination[0]);
        setDestination(fakeDataDestination[0]);
    },[])

    return (
       <div  className='home'>
            {
                toggleBooking ?   
                    <>
                        {
                            cardData.destination && 
                            <div>    
                                <div className=' d-flex justify-content-around'>
                                    <div className='text_container'>
                                        <h1>{cardData.destination}</h1>
                                        <p>{cardData.description.slice(0,210)}...</p>
                                        <button onClick={() => handleToggleBooking(false)} className='booking_btn'>Booking  <FontAwesomeIcon icon={faArrowRight} /></button>
                                    </div>  
                                    <div className='card_container d-flex justify-content-around'>
                                        <PlaceCard cardSliderValue={cardSliderValue} handleCardData={handleCardData}  cardProperty={allCard}></PlaceCard>
                                    </div> 
                                </div>
                                <div className='slider_btn d-flex justify-content-center'>
                                    <p onClick={()=> {if(cardSliderValue > 0){setCardSliderValue(cardSliderValue - 1)}}}><FontAwesomeIcon icon={faChevronLeft} /></p>
                                    <p onClick={()=> {if(cardSliderValue < (allCard.length - 3)){setCardSliderValue(cardSliderValue + 1) }}}><FontAwesomeIcon icon={faChevronRight} /></p>
                                </div>
                            </div>
                        }
                    </>:


                    <>
                        {
                            cardData.destination &&
                            <div className='booking_area container d-flex justify-content-between'>
                                <div className='booking_data'>
                                    <h1>{cardData.destination}</h1>
                                    <p>{cardData.description}</p>
                                    <button onClick={() => handleToggleBooking(true)} className='booking_btn back_btn'><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
                                </div>
                                <div className='d-flex align-items-center booking_form'>
                                    <form action="">
                                        <label>Origin</label>
                                        <p>{cardData.origin}</p>
                                        <label>Destination</label>
                                        <p>{cardData.destination}</p>
                                        <div className='d-flex justify-content-around'>
                                            <div>
                                                <label>From</label>
                                                <DatePicker
                                                    className='Custom_date'
                                                    selected={startDate}
                                                    onChange={date => setStartDate(date)}
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
                                                    className='Custom_date'
                                                    selected={endDate}
                                                    onChange={date => setEndDate(date)}
                                                    selectsEnd
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    dateFormat="dd/MM/yyyy"
                                                    showMonthYearPicker
                                                />
                                            </div>
                                        </div>
                                        <Link to='/hoteldetails'><button onClick={handleStartBooking} className='start_booking_btn'>Start Booking</button></Link>
                                    </form>
                                </div>
                            </div>
                        }
                    </>
            }
       </div>
    );
};

export default Home;