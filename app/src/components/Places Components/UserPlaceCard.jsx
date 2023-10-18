import React from 'react';
import "./PlacesPage.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import Image from '../AddPlace Components/Image';


function UserPlaceCard({ _id , images, title, type , reviews }) {


    const MainImage = images[0];

    const truncatetitle = title?.length > 35 ? title.slice(0, 35) + '...' : title;

    const calculateAverageRating = () => {
        if (reviews && reviews?.length === 0) {
            return 0;
        }

        const totalRating = reviews && reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews?.length;
    };

    const PlaceRate = calculateAverageRating().toFixed(1);
    
    return (
        <div className='user_place_card'>
            <Link to={'/place/'+_id}>
                <Image src={MainImage} alt="" className='place_card_image'/>
            </Link>
            <div className='place_card_info'>
                <div>
                    <h2>{type} <span><FontAwesomeIcon icon={faStar} id='userstar' /> {PlaceRate}</span></h2>
                    <h3>{truncatetitle}</h3>
                </div>
            </div>
        </div>
    )
}

export default UserPlaceCard;