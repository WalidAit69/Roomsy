import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../App';
import RegisterWidget from '../../widgets/Home widgets/RegisterWidget';
import "./placePage.css";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heart, faStar, faArrowLeft, faLocationDot, faArrowUpFromBracket, faFlag, faWifi, faHouse, faCar, faTv, faPaw, faDoorClosed, faDumbbell, faKitchenSet, faCouch, faTriangleExclamation, faList, faPhone, faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faImages, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import PhotoGrid from './PhotoGrid';
import Map from '../Map';
import AddPlace from '../BecomeHost Components/AddPlace';
import { useDisclosure } from '@mantine/hooks';
import { Notification } from '@mantine/core';
import Reviews from '../../widgets/Place Widgets/Reviews';
import CheckAvailability from '../../widgets/Place Widgets/CheckAvailability';
import BookingCard from '../../widgets/Place Widgets/BookingCard';
import ImageSlider from '../../widgets/Place Widgets/ImageSlider';
import "../../widgets/Skeleton.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton';
import { ToastContainer, toast } from 'react-toastify';
import Image from '../AddPlace Components/Image';


function PlacePage() {
    const { showPopup, isEdit, setIsEdit } = useContext(MyContext);
    const [place, setplace] = useState('');
    const [perks, setperks] = useState('');
    const [images, setimages] = useState('');
    const [photoGrid, setphotoGrid] = useState(false);
    const [modelOpen, setmodelOpen] = useState(false);
    const [modeelOpen, setmodeelOpen] = useState(false);
    const [isLiked, setisLiked] = useState();
    const { id } = useParams();
    const Placeuserid = place?.owner?._id;
    const currentuserid = localStorage.getItem("userID");
    const like = place?.likedBy;
    const [isLoading, setisLoading] = useState(true);

    const [bookinfo, setbookinfo] = useState('');


    function handlephotoGrid() {
        document.querySelector(".header").classList.toggle("remove_header");
        document.querySelector(".footer").classList.toggle("remove_header");
        setphotoGrid(!photoGrid);
    }

    async function getPlace() {
        const { data } = await axios.get(`/place/${id}`)
        setplace(data);
        setperks(data.perks);
        setimages(data.images);
        setisLoading(false);
    }
    useEffect(() => {
        getPlace();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    function checkIfPerkExists(perks, perk) {
        return perks && perks.includes(perk);
    }

    const googleMapsURL = `https://www.google.com/maps?q=${encodeURIComponent(
        `${place?.address}, ${place?.city}, ${place?.country}`
    )}`;

    function goBack() {
        window.history.back();
    }

    const handleEditClick = () => {
        setmodelOpen(true);
        setIsEdit(true);
    }

    const handleLikeClick = async () => {
        const axiosConfig = {
            method: 'post',
            url: `/save/${id}/${currentuserid}`,
        };
        if (!currentuserid) {
            toast.error("Please log in first")
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

    const [Hidden, setHidden] = useState(true);

    function ShowNumber() {
        document.querySelector(".user_phone").classList.toggle("user_phone_show_click");
        setHidden(!Hidden);
    }

    const [isNotificationVisible, setNotificationVisible] = useState(false);


    async function getBookinfo() {
        if (currentuserid) {
            try {
                const { data } = await axios.get(`/BookPlace/${id}`)
                setbookinfo(data);
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        getBookinfo();
    }, [])

    useEffect(() => {
        if (isLoading) {
            document.querySelector('body').style.overflow = "hidden"
        } else {
            document.querySelector('body').style.overflowY = "scroll"
        }

    }, [isLoading])


    function handlesubmit(e) {
        e.preventDefault();
        if (!checkin) {
            document.querySelector(".checkin_input").classList.add("book-error");
            document.querySelector(".book-error-msg").classList.add("book-error-msg-show");
        }
        if (!checkout) {
            document.querySelector(".checkout_input").classList.add("book-error");
            document.querySelector(".book-error-msg").classList.add("book-error-msg-show");
        }
        if (!guests) {
            document.querySelector(".guests").classList.add("book-error");
            document.querySelector(".book-error-msg").classList.add("book-error-msg-show");
        }
        if (!Username) {
            document.querySelector(".UserName").classList.add("book-error");
            document.querySelector(".book-error-msg").classList.add("book-error-msg-show");
        }
        if (!Userphone) {
            document.querySelector(".UserPhone").classList.add("book-error");
            document.querySelector(".book-error-msg").classList.add("book-error-msg-show");
        }

        if (bookinfo && checkin && checkout && guests && Username && Userphone) {
            if ((checkin >= bookinfo?.checkout || checkout <= bookinfo?.checkin) && checkin < checkout) {
                open();
                setNotificationVisible(false);
            } else {
                setOpened(false);
                setNotificationVisible(true);
            }
        } else if (checkin && checkout && guests && Username && Userphone) {
            open();
        } else {
            return null;
        }
    }

    const [opened, { open, close }] = useDisclosure(false);

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


    let src = "";
    src = place?.owner?.profilepic && place?.owner?.profilepic.includes('https://') ? place?.owner?.profilepic
          : "https://roomsy-v3-server.vercel.app/" + place?.owner?.profilepic;

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            {!photoGrid ? <section className='container_place Place_page dim_overlay'>
                <AddPlace opened={modelOpen} setOpened={setmodelOpen} id={id} placeimages={images}></AddPlace>

                {screenWidth > 550 ? <div className="Place_info_imgs">

                    <div className="Place_info">
                        {!isLoading && <FontAwesomeIcon className='faicon' icon={faArrowLeft} onClick={goBack} />}
                        <div className='Place_info_layout'>
                            <div className='rating'>
                                <h1>{place?.title || <Skeleton width={"500px"} />}</h1>

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

                    <div className='Place_photo_grid'>

                        <div className="left-photo">
                            {images ? images.slice(0, 1).map((img, index) => (
                                <Image src={img} alt="" key={index} onClick={handlephotoGrid} />
                            )) : <Skeleton className='left-skele' />}
                        </div>

                        <div className="middle-photos">
                            {images ? images.slice(1, 3).map((img, index) => (
                                <Image src={img} alt="" key={index} onClick={handlephotoGrid} />
                            )) :
                                <div className='middle-photos'>
                                    <Skeleton className='middle-skele' />
                                    <Skeleton className='middle-skele' />
                                </div>
                            }
                        </div>

                        <div className="right-photo">
                            {images ? images.slice(images.length - 1).map((img, index) => (
                                <Image src={img} alt="" key={index} onClick={handlephotoGrid} />
                            )) : <Skeleton className='right-skele' />}
                            <button className='photo_btn' onClick={handlephotoGrid}>
                                <FontAwesomeIcon className='icon' icon={faImages} />
                                Show all photos
                            </button>
                        </div>
                    </div>

                </div> :
                    <ImageSlider
                        images={images}
                        isLoading={isLoading}
                        isLiked={isLiked}
                        handleLikeClick={handleLikeClick}
                        handleEditClick={handleEditClick}
                        Placeuserid={Placeuserid}
                        currentuserid={currentuserid}
                        PlaceRate={PlaceRate}
                        place={place}
                        googleMapsURL={googleMapsURL}
                    />}


                <div className="Place_details">
                    <div className="Place_details_left">
                        <div className="place_datails_host">
                            {!isLoading ? <div className='place_details'>
                                <h2>{place.type} hosted by <Link to={`/user/show/${Placeuserid}`}>{place?.owner?.fullname}</Link></h2>
                                <p> {place.maxGuests} guests<span> · </span> {place.type} <span> · </span> {place.bedrooms} {place.bedrooms > 1 ? "bedrooms" : "bedroom"} <span> · </span> {place.bathrooms} {place.bathrooms > 1 ? "bathrooms" : "bathroom"}</p>
                            </div> : <Skeleton width={screenWidth > 650 ? "400px" : "250px"} height={8} count={2} />}

                            {!isLoading ? <Link to={`/user/show/${Placeuserid}`} className="place_host">
                                <img src={src} alt="" />
                                <FontAwesomeIcon className='ratingicon ratingicon_user' icon={faStar} />
                            </Link> : <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} />}
                        </div>

                        {screenWidth <= 1000 && !isLoading ?
                            <>
                                <div className="price_rating_mobile">
                                    <div>
                                        <h3>${place.price} <span>/ night</span></h3>
                                        <div>
                                            <FontAwesomeIcon className='ratingicon' icon={faStar} />
                                            <p>{PlaceRate} <span>({place?.reviews?.length} reviews)</span></p>
                                        </div>
                                    </div>

                                    <div>
                                        <button type='button' onClick={() => setmodeelOpen(true)}>Check availability</button>
                                    </div>

                                    <CheckAvailability
                                        opened={modeelOpen}
                                        setOpened={setmodeelOpen}
                                        place={place}
                                        PlaceRate={PlaceRate}
                                        host={Placeuserid}
                                        handlesubmit={handlesubmit}
                                        setNotificationVisible={setNotificationVisible}
                                        open={open}
                                        bookinfo={bookinfo}
                                    />
                                </div>
                                <div className='notify'>
                                    {isNotificationVisible && <Notification withCloseButton={false} color='orange' title="We notify you that">
                                        This Place is booked from {bookinfo.checkin} to {bookinfo.checkout}
                                    </Notification>}

                                    {isNotificationVisible && <FontAwesomeIcon icon={faXmark} className='notify-icon' onClick={() => setNotificationVisible(false)}></FontAwesomeIcon>}
                                </div>
                            </> : <></>
                        }

                        <div className="perks">

                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                place?.livingRooms >= 1 && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faHouse} />
                                    <div>
                                        <h2>Entire house</h2>
                                        <p>You'll have the house to yourself</p>
                                    </div>
                                </div>}


                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                checkIfPerkExists(perks, 'wifi') && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faWifi} />
                                    <div>
                                        <h2>Wifi</h2>
                                        <p>Guests often search for this popular amenity</p>
                                    </div>
                                </div>
                            }


                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                checkIfPerkExists(perks, 'parking') && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faCar} />
                                    <div>
                                        <h2>Parking</h2>
                                        <p>Free parking on premises</p>
                                    </div>
                                </div>

                            }

                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} />
                                : checkIfPerkExists(perks, 'tv') && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faTv} />
                                    <div>
                                        <h2>TV</h2>
                                        <p>42" HDTV</p>
                                    </div>
                                </div>
                            }

                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                checkIfPerkExists(perks, 'pets') &&
                                <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faPaw} />
                                    <div>
                                        <h2>Pets</h2>
                                        <p>Pets allowed</p>
                                    </div>
                                </div>
                            }


                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                checkIfPerkExists(perks, 'privateentrance') &&
                                <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faDoorClosed} />
                                    <div>
                                        <h2>Private Entrance</h2>
                                        <p>You'll have a private entrance to yourself</p>
                                    </div>
                                </div>
                            }

                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                checkIfPerkExists(perks, 'fitness') &&
                                <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faDumbbell} />
                                    <div>
                                        <h2>Gym</h2>
                                        <p>Private gym access and exercise equipment</p>
                                    </div>
                                </div>
                            }

                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                place?.livingRooms >= 1 &&
                                <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faCouch} />
                                    <div>
                                        <h2>Living room</h2>
                                        <p>{place?.livingRooms} {place?.livingRooms === 1 ? "Living room available" : "Living rooms available"}</p>
                                    </div>
                                </div>
                            }

                            {isLoading ? <Skeleton height={8} width={"200px"} count={2} /> :
                                place?.kitchens >= 1 &&
                                <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faKitchenSet} />
                                    <div>
                                        <h2>Kitchen</h2>
                                        <p>{place?.kitchens} {place?.kitchens === 1 ? "Kitchen available" : "Kitchens available"}</p>
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="house_rules">

                            {isLoading ? <Skeleton height={10} width={screenWidth > 650 ? "500px" : "300px"} count={2} /> :
                                place?.description && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faList} />
                                    <div>
                                        <h2>Description</h2>
                                        <p>{place?.description}</p>
                                    </div>
                                </div>}

                            <div className='perk_container'>
                                {!isLoading && <FontAwesomeIcon className='ico' icon={faTriangleExclamation} />}
                                {!isLoading ? <div>
                                    <h2>House Rules</h2>
                                    <ul>
                                        <li>Please check-in before {place?.checkIn}</li>
                                        <li>Please check-out before {place?.checkOut}</li>
                                        <li>Max number of guests {place?.maxGuests}</li>
                                        {!checkIfPerkExists(perks, 'pets') && <li>Pets not allowed</li>}
                                    </ul>
                                </div> : <Skeleton height={10} width={"300px"} count={5} />}
                            </div>

                            {isLoading ? <Skeleton height={10} width={screenWidth > 650 ? "500px" : "300px"} count={2} /> :
                                place?.extrainfo && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faComment} />
                                    <div>
                                        <h2>Extra Info</h2>
                                        <p>{place?.extrainfo}</p>
                                    </div>
                                </div>}


                            {isLoading ? <Skeleton height={10} width={"200px"} count={2} /> :
                                place?.owner?.phone && <div className='perk_container'>
                                    <FontAwesomeIcon className='ico' icon={faPhone} />
                                    <div>
                                        <h2>Host Phone Number</h2>

                                        <div className='user_phone_show'>
                                            <p className='user_phone user_phone_show_click'>{place?.owner?.phone}</p>
                                            <p onClick={ShowNumber}> {Hidden ? <FontAwesomeIcon className='ico' icon={faEye} /> : <FontAwesomeIcon className='ico' icon={faEyeSlash} />} </p>
                                        </div>
                                    </div>
                                </div>}

                        </div>

                    </div>

                    {screenWidth > 1000 && <div className="Place_details_right">

                        {(!isLoading ? <BookingCard bookinfo={bookinfo} place={place} PlaceRate={PlaceRate} />
                            : <Skeleton className='book_card-ske' />)}

                        <div className='notify'>
                            {isNotificationVisible && <Notification withCloseButton={false} color='orange' title="We notify you that">
                                This Place is booked from {bookinfo?.checkin} to {bookinfo?.checkout}
                            </Notification>}

                            {isNotificationVisible && <FontAwesomeIcon icon={faXmark} className='notify-icon' onClick={() => setNotificationVisible(false)}></FontAwesomeIcon>}
                        </div>

                        {!isLoading && <div className='report'>
                            <FontAwesomeIcon className='ratingicon' icon={faFlag} />
                            <p>Report this listing</p>
                        </div>}

                    </div>}

                </div>


                {!isLoading ? <div className="Place_map">
                    <h1>House Location</h1>
                    <Map address={place?.address} city={place?.city} country={place?.country}></Map>
                </div> : <Skeleton className="Place_map" />}

                <div className="Place_reviews">
                    {place?.reviews?.length > 0 && <Reviews id={id} place={place}></Reviews>}
                </div>

            </section> : <PhotoGrid images={images} handlephotoGrid={handlephotoGrid} handleLikeClick={handleLikeClick} isLiked={isLiked}></PhotoGrid>}

            {showPopup && <RegisterWidget></RegisterWidget>}
        </>
    )
}

export default PlacePage