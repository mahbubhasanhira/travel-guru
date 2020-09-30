import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import hotelData from '../fakeData/hotelData';
import GoogleMap from '../GoogleMap/GoogleMap';
import './HotelDetails.css';


const HotelDetails = () => {
    const [hotelDetails, setHotelDetails] = useState([]);
    const [loggedInUser, setLoggedInUser, destination,] = useContext(UserContext);
    const date = new Date().getDate()+ "/" + new Date().getMonth() + "/" + new Date().getFullYear();
    
    useEffect(()=> {
        setHotelDetails(hotelData);     
    }, [])
    
      
    return (
            <div className='hotel_details_container container d-flex justify-content-between'>
                <div className='hotel_card_container col-md-7 col-lg-7 col-sm-12'>
                    <p>252 stays {date}</p>
                    <h4>Stay in {destination.destination}</h4>
                    {
                        hotelDetails.map(singleDetail => 
                        <div className='hotel_details d-flex align-items-center justify-content-between'>
                            <img className='col-6' src={singleDetail.image} alt='hotel pic' />
                            <div className='col-lg-6 hotelDetails_data'>
                                <h5>{singleDetail.title}</h5>
                                <p className='bedrooms'><span>{singleDetail.guest} guest</span> <span>{singleDetail.bedrooms} bedrooms</span> <span>{singleDetail.beds} beds</span> <span></span>{singleDetail.baths} baths</p>
                                <p className='hotel_description'>{singleDetail.description}</p>
                                <p className='review_and_price'><FontAwesomeIcon style={{color:'gold'}} icon={faStar} /><span>{singleDetail.rating}</span> <span>${singleDetail.price}/</span>night ${singleDetail.totalPrice} total</p>
                            </div>
                        </div>)
                    }
                </div>
                <div className='google_map  col-md-5 col-lg-5 col-sm-12'>
                    <GoogleMap/>
                </div>
            </div> 
    );
};

export default HotelDetails;