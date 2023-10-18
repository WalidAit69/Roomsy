import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from '../AddPlace Components/Image';


function UserPlaceLikeCard({id}) {

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

    const calculateAverageRating = () => {
        if (place?.reviews && place?.reviews?.length === 0) {
            return 0;
        }

        const totalRating = place?.reviews && place?.reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / place?.reviews?.length;
    };


    const PlaceRate = calculateAverageRating().toFixed(1);

    const MainImage = images[0];

    const truncatetitle = place.title?.length > 35 ? place.title.slice(0, 35) + '...' : place.title;
    
    return (
        <div className='user_place_card'>
            <Link to={'/place/'+place._id}>
                {isLoading ? <Skeleton className='place_card_image'/> :<Image src={MainImage} alt="" className='place_card_image'/>}
            </Link>
            <div className='place_card_info'>
                {isLoading ? <Skeleton width={"250px"} count={2}/> :<div>
                    <h2>{place.type} <span><FontAwesomeIcon icon={faStar} id='userstar' /> {PlaceRate}</span></h2>
                    <h3>{truncatetitle}</h3>
                </div>}
            </div>
        </div>
    )
}

export default UserPlaceLikeCard