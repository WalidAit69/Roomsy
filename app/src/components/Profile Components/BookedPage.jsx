import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookedCard from '../../widgets/Profile Widgets/BookedCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function BookedPage() {
    const [Booked, setBooked] = useState();
    const [isLoading, setisLoading] = useState(true);

    async function getBooked() {
        try {
            const { data } = await axios.get("/Booked", {
                withCredentials: true
            })
            setBooked(data);
            setisLoading(false);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getBooked();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])

    const id = localStorage.getItem("userID");

    return (
        <section className='container bookings_section dim_overlay'>
             {id && <div className="bookings">
                {!isLoading ? (Booked?.length > 0 ? <h1>Your Booked Places</h1> : <h1>No Booked Places</h1>): (<Skeleton width={"200px"}/>)}
                {Booked && !isLoading ? Booked.map((booking) => {
                    return <BookedCard key={booking._id} {...booking}></BookedCard>
                }):<Skeleton width={'1000px'} height={'200px'}/>}
            </div>}
        </section>
    )
}

export default BookedPage