import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as star } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import "./Reviews.css";
import Rating from 'react-rating-stars-component';
import axios from "axios";


function Reviews({ id }) {
    const currentuserid = localStorage.getItem("userID");
    const [place, setplace] = useState();
    const [reviews, setreviews] = useState();

    async function getPlace() {
        const { data } = await axios.get(`/place/${id}`)
        setplace(data);
    }

    const handleDeleteClick = async (index) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        if (isConfirmed) {
            const res = await axios.delete(`/deletereview/${id}/${index}/${currentuserid}`)
            getPlace();
        } else {
            return null;
        }
    };

    useEffect(() => {
        getPlace();
    }, [])

    useEffect(() => {
        setreviews(place?.reviews);
    }, [place])


    const customemptyStar = (
        <FontAwesomeIcon icon={faStar} />
    );

    const customfilledStar = (
        <FontAwesomeIcon icon={star} />
    );

    const [ScreenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        };

    }, [])


    let src = "";
    {
        reviews && reviews.map((review) => {
            src = review?.userPhoto && review?.userPhoto.includes('https://') ? review?.userPhoto
                : "https://roomsy-v3-server.vercel.app/" + review?.userPhoto;
        })
    }


    return (
        <>
            {<div className='Reviews_container Place_reviews'>
                {reviews?.length > 0 && <h2>Reviews</h2>}
                <div className='Review_Container'>
                    <ul>
                        {reviews && reviews.map((review, index) => (
                            <div key={index}>
                                <div className='review'>
                                    <img src={src} alt="" />

                                    <div className='review_info'>
                                        <div className='review_author'>
                                            <div>
                                                <Rating
                                                    count={5}
                                                    size={ScreenWidth > 550 ? 20 : 15}
                                                    value={review.rating}
                                                    edit={false}
                                                    isHalf={false}
                                                    emptyIcon={customemptyStar}
                                                    filledIcon={customfilledStar}
                                                />
                                            </div>

                                            <div>
                                                <h3>{review.userName}</h3>
                                                <p>2 days ago</p>
                                            </div>
                                        </div>
                                        <div className='review_content'>
                                            <p>{review.comment}</p>
                                        </div>
                                        <div className='review_cta'>
                                            <p>Like</p>
                                            <p>Dislike</p>
                                            <p>Reply</p>
                                            <p>{review.userId === currentuserid && "Edit"}</p>
                                            <p onClick={() => handleDeleteClick(index)}>{review.userId === currentuserid && "Delete"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>}
        </>
    );
}



export default Reviews