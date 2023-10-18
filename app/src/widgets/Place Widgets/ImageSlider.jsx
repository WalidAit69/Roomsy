import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../components/Places Components/placePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart, faArrowLeft, faArrowUpFromBracket, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPenToSquare, faStar } from '@fortawesome/free-regular-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function ImageSlider({ images, isLoading, isLiked, handleLikeClick, handleEditClick, Placeuserid, currentuserid, PlaceRate, place, googleMapsURL }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <></>,
        nextArrow: <></>,
    };

    function goBack() {
        window.history.back();
    }
    return (
        <section className='dim_overlay Place_slider'>
            <div className='Place_slider_div'>
                <div className='Place_slider_nav'>

                    {!isLoading && <div className="Place_slider_nav_left" onClick={goBack}>
                        <FontAwesomeIcon className='' icon={faArrowLeft} />
                        <h4>Go back</h4>
                    </div>}

                    <div className="Place_slider_nav_right">
                        <div className="Place_cta">
                            {!isLoading && <div>
                                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                <p>Share</p>
                            </div>}
                            {!isLoading && <div onClick={handleLikeClick}>
                                {isLiked ? <FontAwesomeIcon className='like' icon={heart} /> : <FontAwesomeIcon icon={faHeart} />}
                                <p>{isLiked ? "Liked" : "Like"}</p>
                            </div>}
                            {Placeuserid === currentuserid && <div onClick={handleEditClick}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <p>Edit</p>
                            </div>}
                        </div>
                    </div>

                </div>
                <Slider {...settings}>
                    {images && !isLoading ? images.map((image, index) => {
                        return <div className='Place_slider_img' key={index}>
                            <p>{index + 1}/{images.length}</p>
                            <img src={`http://localhost:3001/server/routes/uploads/${image}`} alt="" />
                        </div>
                    }) : <Skeleton height={"500px"} width={"500px"} className='' />}
                </Slider>

                <div className='Place_slider_info'>
                    <div className='rating'>
                        <h1>{place?.title || <Skeleton width={"250px"} />}</h1>

                        <div className="reviews">
                            <div>
                                {!isLoading && <FontAwesomeIcon className='ratingicon' icon={faStar} />}
                                <h2> {isLoading ? <Skeleton width={"200px"} /> : PlaceRate} <span>{!isLoading && "(" + place?.reviews?.length + " reviews" + ")"}</span></h2>
                            </div>
                            <div>

                                {!isLoading && <FontAwesomeIcon className='ratingicon' icon={faLocationDot} />}
                                <a href={googleMapsURL} target='_blank'>{place?.city} , {place?.country}</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ImageSlider