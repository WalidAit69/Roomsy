import React from 'react';
import "../../components/Places Components/PlacesPage.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from '../../components/AddPlace Components/Image';


function PlaceBookCard({ images, title, bedrooms, bathrooms, country, city, type, reviews, PlaceRate }) {

    const MainImage = images[0];

    return (
        <div className='place_book_card'>
            <Link>
                <Image src={MainImage} alt="" className='place_card_image' />
            </Link>
            <div className='place_card_info'>
                <div>
                    <h2>{title}</h2>
                    <h3>Entire rental unit in {city},{country}</h3>
                    <p>{type} <span> · </span> {bedrooms} {bedrooms > 1 ? "beds" : "bed"} <span> · </span> {bathrooms} {bathrooms > 1 ? "baths" : "bath"}</p>
                    <div className='place_card_info_rate'>
                        <FontAwesomeIcon className='ratingicon' icon={faStar} />
                        <h2>{PlaceRate} <span>({reviews?.length} reviews)</span></h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PlaceBookCard