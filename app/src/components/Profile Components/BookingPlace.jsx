import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heart, faArrowLeft, faArrowUpFromBracket, faBriefcase, faExclamation, faLocationDot, faPlaneArrival, faPlaneDeparture, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faImages } from '@fortawesome/free-regular-svg-icons';
import PhotoGrid from '../Places Components/PhotoGrid';
import { differenceInCalendarDays } from 'date-fns';
import Review from '../../widgets/Profile Widgets/Review';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ImageSlider from '../../widgets/Place Widgets/ImageSlider';
import Image from '../AddPlace Components/Image';


function BookingPlace() {
    const [Booking, setBooking] = useState('');
    const [place, setplace] = useState('');
    const [host, sethost] = useState('');
    const [images, setimages] = useState('');
    const [photoGrid, setphotoGrid] = useState(false);
    const [isLiked, setisLiked] = useState();

    const Placeuserid = place?.owner;
    const currentuserid = localStorage.getItem("userID");
    const { id } = useParams();
    const like = place?.likedBy;

    const [isLoading, setisLoading] = useState(true);


    function handlephotoGrid() {
        document.querySelector(".header").classList.toggle("remove_header");
        document.querySelector(".footer").classList.toggle("remove_header");
        setphotoGrid(!photoGrid);
    }

    async function getBooking() {
        const { data } = await axios.get(`/Bookings/${id}`)
        setBooking(data);
        setplace(data.place);
        sethost(data.host);
        setimages(data.place.images);
        setisLoading(false);
    }
    useEffect(() => {
        getBooking();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    function goBack() {
        window.history.back();
    }

    const googleMapsURL = `https://www.google.com/maps?q=${encodeURIComponent(
        `${place?.address}, ${place?.city}, ${place?.country}`
    )}`;

    let numberofDays = 0;
    if (Booking.checkin && Booking.checkout) {
        numberofDays = differenceInCalendarDays(new Date(Booking.checkout), new Date(Booking.checkin));
    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    }

    const handleLikeClick = async () => {
        const axiosConfig = {
            method: 'post',
            url: `/save/${place?._id}`,
            withCredentials: true,
        };
        if (!currentuserid) {
            alert("Please log in first")
        } else {
            try {
                setisLiked(!isLiked);
                const { data } = await axios(axiosConfig);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleLike = async () => {
        if (place?.likedBy && place?.likedBy.includes(currentuserid)) {
            setisLiked(true);
        } else {
            setisLiked(false)
        }
    };
    useEffect(() => {
        handleLike();

    }, [like])

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

    const CurrentUser = localStorage.getItem("userID");

    let src = "";
    src = host?.profilepic && host?.profilepic.includes('https://') ? host?.profilepic
          : "https://roomsy-v3-server.vercel.app/" + host?.profilepic;


    return (
        <>
            {CurrentUser && <div>
                {!photoGrid ? <section section className='container_place container_book_place dim_overlay'>
                    <div className="Place_info_imgs">
                        {screenWidth > 550 ?
                            <>
                                <div className="Place_info">
                                    {!isLoading && <FontAwesomeIcon className='faicon' icon={faArrowLeft} onClick={goBack} />}
                                    <div className='Place_info_layout'>
                                        <div className='rating'>
                                            {!isLoading ? <h1>{place?.title}</h1> : <Skeleton width={"200px"} />}

                                            <div className="reviews">
                                                {!isLoading ? <div>
                                                    <FontAwesomeIcon className='ratingicon' icon={faLocationDot} />
                                                    <a href={googleMapsURL} target='_blank'>{place?.city} , {place?.country}</a>
                                                </div> : <Skeleton width={"150px"} />}
                                            </div>

                                        </div>

                                        {!isLoading && <div className="Place_cta">
                                            <div>
                                                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                                <p>Share</p>
                                            </div>
                                            <div onClick={handleLikeClick}>
                                                {isLiked ? <FontAwesomeIcon className='like' icon={heart} /> : <FontAwesomeIcon icon={faHeart} />}
                                                <p>{isLiked ? "Liked" : "Like"}</p>
                                            </div>
                                        </div>}
                                    </div>
                                </div>

                                <div className="Booking_info">
                                    {!isLoading ? <div>
                                        <p>{numberofDays} nights : <span><FontAwesomeIcon icon={faPlaneArrival}></FontAwesomeIcon>{formatDate(Booking.checkin)} &#8594; <FontAwesomeIcon icon={faPlaneDeparture}></FontAwesomeIcon>{formatDate(Booking.checkout)}</span></p>
                                        {Booking?.worktrip && <p><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon> Work trip</p>}
                                    </div> : <Skeleton width={"150px"} />}
                                    {!isLoading ? <div>
                                        {Booking?.fullprice ? <h4>Total Price : <span>${Booking?.fullprice}</span></h4> :
                                            <div>
                                                <h4>Total Price : <span>${Booking?.halfprice * 2}</span></h4>
                                            </div>
                                        }
                                    </div> : <Skeleton width={"120px"} height={"70px"} />}
                                </div>
                                {Booking?.halfprice && <p className='warning'>You only paid half price, The rest (${Booking?.halfprice}) will be automatically charged to the same payment method on {formatDate(Booking.checkout)} !</p>}

                                <div className='Place_photo_grid'>

                                    {!isLoading ? <div className="left-photo">
                                        {images && images.slice(0, 1).map((img, index) => (
                                            <Image src={img} alt="" key={index} onClick={handlephotoGrid} />
                                        ))}
                                    </div> : <Skeleton className='left-skele' />}

                                    {!isLoading ? <div className="middle-photos">
                                        {images && images.slice(1, 3).map((img, index) => (
                                            <Image src={img} alt="" key={index} onClick={handlephotoGrid} />
                                        ))}
                                    </div> : <div className='middle-photos'>
                                        <Skeleton className='middle-skele'/>
                                        <Skeleton className='middle-skele' />
                                    </div>}

                                    {!isLoading ? <div className="right-photo">
                                        {images && images.slice(images.length - 1).map((img, index) => (
                                            <Image src={img} alt="" key={index} onClick={handlephotoGrid} />
                                        ))}
                                        <button className='photo_btn' onClick={handlephotoGrid}>
                                            <FontAwesomeIcon className='icon' icon={faImages} />
                                            Show all photos
                                        </button>
                                    </div> : <Skeleton className='right-skele' />}
                                </div>
                            </> : <div>
                                <div className="Booking_info">
                                    {!isLoading ? <div>
                                        <p>{numberofDays} nights : <span><FontAwesomeIcon icon={faPlaneArrival}></FontAwesomeIcon>{formatDate(Booking.checkin)} &#8594; <FontAwesomeIcon icon={faPlaneDeparture}></FontAwesomeIcon>{formatDate(Booking.checkout)}</span></p>
                                        {Booking?.worktrip && <p><FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon> Work trip</p>}
                                    </div> : <Skeleton width={"150px"} />}
                                    {!isLoading ? <div>
                                        {Booking?.fullprice ? <h4>Total Price : <span>${Booking?.fullprice}</span></h4> :
                                            <div>
                                                <h4>Total Price : <span>${Booking?.halfprice * 2}</span></h4>
                                            </div>
                                        }
                                    </div> : <Skeleton width={"120px"} height={"70px"} />}
                                </div>
                                {Booking?.halfprice && <p className='warning'>You only paid half price, The rest (${Booking?.halfprice}) will be automatically charged to the same payment method on {formatDate(Booking.checkout)} !</p>}
                                <ImageSlider
                                    images={images}
                                    isLoading={isLoading}
                                    isLiked={isLiked}
                                    handleLikeClick={handleLikeClick}
                                    handleEditClick={""}
                                    Placeuserid={Placeuserid}
                                    currentuserid={""}
                                    PlaceRate={PlaceRate}
                                    place={place}
                                    googleMapsURL={googleMapsURL} />
                            </div>
                        }

                        <div className='meet_host'>
                            <div className="place_datails_host">
                                {!isLoading ? <div className='place_details'>
                                    <h2>Meet your host <Link to={`/user/show/${Placeuserid}`}>{host?.fullname}</Link></h2>
                                </div> : <Skeleton width={"250px"} />}

                                {!isLoading ? <Link to={`/user/show/${Placeuserid}`} className="place_host">
                                    <img src={src} alt="" />
                                    <FontAwesomeIcon className='ratingicon ratingicon_user' icon={faStar} />
                                </Link> : <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} />}
                            </div>

                            <div className='host_info'>
                                {!isLoading ? <p>{host.bio}</p> : <Skeleton count={3} width={"600px"} />}
                                {!isLoading ? <p>Member since {formatDate(host.createdAt)}</p> : <Skeleton width={"150px"} />}
                                {!isLoading ? <p>
                                    You can reach out to {host.email} if you have any questions or need assistance during your stay.
                                    Additionally, you can contact {host.phone} for immediate support.
                                </p> : <Skeleton width={"600px"} count={2} />}
                            </div>

                            {!isLoading && <div className='leave_review'>
                                <Review id={place?._id}></Review>
                            </div>}
                        </div>
                    </div>
                </section> : <PhotoGrid images={images} handlephotoGrid={handlephotoGrid} handleLikeClick={handleLikeClick} isLiked={isLiked}></PhotoGrid>}
            </div>}
        </>
    )
}

export default BookingPlace