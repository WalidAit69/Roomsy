import React, { useEffect, useState } from 'react';
import "./PlacesPage.css";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from "axios";
import Image from '../AddPlace Components/Image';


function PlaceCard({ id }) {
    const [place, setplace] = useState('');
    const [images, setimages] = useState('');
    const [isLoading, setisLoading] = useState(true);

    async function getPlace() {
        const { data } = await axios.get(`/place/${id}`)
        setplace(data);
        setimages(data.images);
        setisLoading(false);
    }

    useEffect(() => {
        getPlace();
    }, [])

    const MainImage = images[0];

    const calculateAverageRating = () => {
        if (place?.reviews && place?.reviews?.length === 0) {
            return 0;
        }

        const totalRating = place?.reviews && place?.reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / place?.reviews?.length;
    };

    const PlaceRate = calculateAverageRating().toFixed(1);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const truncateTitle = place?.title?.slice(0, 30) + "...";


    return (
        <div className='place_card'>
            <Link to={'/place/' + id} className='place_card_img'>
                {isLoading ? <Skeleton className='place_card_image' /> : <Image src={MainImage} alt="" className='place_card_image' />}
                <div className='place_card_rate'>
                    {PlaceRate}
                </div>
            </Link>
            <div className='place_card_info'>
                <div>
                    {isLoading ? <Skeleton width={'200px'} /> : <h2>{screenWidth < 500 ? truncateTitle : place.title}</h2>}
                    {isLoading ? <Skeleton width={'250px'} /> : <h3>{screenWidth > 500 && "Entire rental unit in"} {place.city},{place.country}</h3>}
                    {isLoading ? <Skeleton width={'150px'} /> : <p>{place.type} <span> · </span> {place.bedrooms} {place.bedrooms > 1 ? "beds" : "bed"} <span> · </span> {place.bathrooms} {place.bathrooms > 1 ? "baths" : "bath"}</p>}
                </div>

                {isLoading ? <Skeleton width={'70px'} /> : <h4>${place.price}/night</h4>}
            </div>
        </div>
    )
}

export default PlaceCard