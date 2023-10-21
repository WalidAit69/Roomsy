import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faStar as star } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Rating from 'react-rating-stars-component';
import axios from "axios";
import "../../components/Profile Components/BookingPage.css";
import { ToastContainer, toast } from 'react-toastify';

function Review({ placeid }) {
    const [isLoading, setisLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [Statut, setStatut] = useState(
        <div>
            <p>Poor</p>
            <FontAwesomeIcon icon={star}></FontAwesomeIcon>
        </div>
    );

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };


    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const Userid = localStorage.getItem("userID");

    const handleSubmit = async (e) => {
        const axiosConfig = {
            method: 'post',
            url: `/reviews/${placeid}/${Userid}`,
            data: {
                comment: comment,
                rating: rating,
            },
        };

        if (comment.length >= 20 && rating > 0) {
            try {
                setisLoading(true);
                const res = await axios(axiosConfig)
                toast.success(res.data.message);
                setisLoading(false);
            } catch (error) {
                console.log(error)
                setisLoading(false);
            }
        }
        if (comment.length < 10) {
            document.querySelector(".error-msg").classList.add("show-error-msg")
        }
        if (rating == 0) {
            document.querySelector(".star-msg").classList.add("show-error-msg")
        }

    };

    useEffect(() => {
        if (comment.length >= 20) {
            document.querySelector(".error-msg").classList.remove("show-error-msg")
        }
        if (rating > 0) {
            document.querySelector(".star-msg").classList.remove("show-error-msg")
        }
    }, [comment, rating])



    const customemptyStar = (
        <FontAwesomeIcon icon={faStar} />
    );

    const customfilledStar = (
        <FontAwesomeIcon icon={star} />
    );

    function RatingStatus() {
        if (rating <= 2) {
            setStatut(<div className='rate-div poor'>
                Poor
                <FontAwesomeIcon icon={faCircleExclamation}></FontAwesomeIcon>
            </div>)
        } else if (rating <= 4) {
            setStatut(<div className='rate-div good'>
                Good
                <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
            </div>)
        } else {
            setStatut(<div className='rate-div excelent'>
                Excelent
                <FontAwesomeIcon icon={star}></FontAwesomeIcon>
            </div>)
        }
    }

    useEffect(() => {
        RatingStatus();
    }, [rating])


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

    return (
        <div className='Review_container'>
            <ToastContainer></ToastContainer>
            <h2>Leave a review</h2>
            <textarea
                value={comment}
                onChange={handleCommentChange}
                rows={4}
                className='review_input'
                placeholder='Write your review'
            />
            <p className='error-msg'>Must have atleast 20 characters</p>
            <p className='error-msg star-msg'>Must have atleast 1 star</p>

            <div className='Rating_container'>
                {!isLoading ?
                    <button type='submit' className='btn' onClick={handleSubmit}>Submit Review</button> :
                    <button className="btn"><span className='loader'></span></button>}

                <div>
                    <label>Overall rating :</label>
                    <Rating
                        count={5}
                        size={screenWidth > 900 ? 30 : 20}
                        value={rating}
                        onChange={handleRatingChange}
                        edit={true}
                        isHalf={false}
                        emptyIcon={customemptyStar}
                        filledIcon={customfilledStar}
                    />
                </div>

                <div>
                    {Statut}
                </div>
            </div>
        </div>
    )
}

export default Review