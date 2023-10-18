import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookingCard from '../../widgets/Profile Widgets/BookingCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function BookingPage() {

    const [bookings, setbookings] = useState();
    const [isLoading, setisLoading] = useState(true);


    async function getBookings() {
        try {
            const { data } = await axios.get("http://localhost:3001/Bookings", {
                withCredentials: true
            })
            setbookings(data);
            setisLoading(false);
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getBookings();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])


    const id = localStorage.getItem("userID");


    return (
        <section className='container bookings_section dim_overlay '>
            {id && <div className="bookings">
                {!isLoading ? (bookings?.length > 0 ? <h1>Your Bookings</h1> : <h1>No Bookings</h1>) : (<Skeleton width={"200px"} />)}
                {bookings && !isLoading ? bookings.map((booking) => {
                    return <BookingCard key={booking._id} {...booking}></BookingCard>
                }) : <Skeleton width={'1000px'} height={'200px'} />}

                {bookings?.length == 0 && <div className='space'></div>}
            </div>}
        </section>
    )
}

export default BookingPage