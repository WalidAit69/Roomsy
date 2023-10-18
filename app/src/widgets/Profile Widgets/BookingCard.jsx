import React from 'react';
import { differenceInCalendarDays } from "date-fns";
import "../../components/Profile Components/BookingPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faLocationDot, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Image from '../../components/AddPlace Components/Image';



function BookingCard(booking) {

    let numberofDays = 0;
    if (booking.checkin && booking.checkout) {
        numberofDays = differenceInCalendarDays(new Date(booking.checkout), new Date(booking.checkin));
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    }


    return (
        <Link to={`/user/bookings/${booking._id}`} className='booking_card'>
            <Image src={booking.place.images[0]} alt="" />
            <div>
                <h3>{booking.place.title}</h3>
                <p><FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon> {booking.place.country}, {booking.place.city}</p>
                <p>{numberofDays} nights : <span><FontAwesomeIcon icon={faPlaneArrival}></FontAwesomeIcon>{formatDate(booking.checkin)} &#8594; <FontAwesomeIcon icon={faPlaneDeparture}></FontAwesomeIcon>{formatDate(booking.checkout)}</span></p>
                {booking?.worktrip && <p><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon> Work trip</p>}
                {booking?.fullprice ? <h4>Total Price ${booking?.fullprice}</h4> :
                    <div>
                        <h4>Half Price ${booking?.halfprice}</h4>
                        <p>You only paid half price, The rest (${booking?.halfprice}) will be automatically charged to the same payment method on {formatDate(booking.checkout)}</p>
                    </div>}
            </div>
        </Link>
    )
}

export default BookingCard