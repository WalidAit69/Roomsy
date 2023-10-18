import { useDisclosure } from '@mantine/hooks';
import { differenceInCalendarDays } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-number-input';
import PlaceBook from '../../components/Places Components/PlaceBook';
import { ToastContainer, toast } from 'react-toastify';



function BookingCard({ place, PlaceRate, bookinfo, setOpened, setNotificationVisible }) {

    const Placeuserid = place?.owner?._id;

    // booking vars
    const [checkin, setcheckin] = useState();
    const [checkout, setcheckout] = useState();
    const [guests, setguests] = useState();
    const [Username, setUsername] = useState('');
    const [Userphone, setUserphone] = useState('');
    let numberofDays = 0;
    if (checkin && checkout) {
        numberofDays = differenceInCalendarDays(new Date(checkout), new Date(checkin));
    }

    const id = localStorage.getItem("userID");


    function handlesubmit(e) {
        e.preventDefault();

        if (!id) {
            toast.error("Log in first")
        } else {
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
    }


    useEffect(() => {
        if (checkin) {
            document.querySelector(".checkin_input").classList.remove("book-error");
            document.querySelector(".book-error-msg").classList.remove("book-error-msg-show");
        }
        if (checkout) {
            document.querySelector(".checkout_input").classList.remove("book-error");
            document.querySelector(".book-error-msg").classList.remove("book-error-msg-show");
        }
        if (guests) {
            document.querySelector(".guests").classList.remove("book-error");
            document.querySelector(".book-error-msg").classList.remove("book-error-msg-show");
        }
        if (Username) {
            document.querySelector(".UserName").classList.remove("book-error");
            document.querySelector(".book-error-msg").classList.remove("book-error-msg-show");
        }
        if (Userphone) {
            document.querySelector(".UserPhone").classList.remove("book-error");
            document.querySelector(".book-error-msg").classList.remove("book-error-msg-show");
        }
    }, [checkin, checkout, guests, Username, Userphone])


    useEffect(() => {
        if (numberofDays > 0) {
            document.querySelector(".guests").classList.add("guestsborder");
            document.querySelector(".book_card-ref").classList.add("book_cardheight");
        }
    }, [numberofDays])

    const [ScreenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    const [opened, { open, close }] = useDisclosure(false);


    return (
        <div className={ScreenWidth > 1000 ? "book_card book_card-ref" : "book_card-ref book_card_mobile"}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <div className="book_card_container">
                <div className="price_rating">
                    <h1>${place.price} <span>/ night</span></h1>
                    <div>
                        <FontAwesomeIcon className='ratingicon' icon={faStar} />
                        <h2>{PlaceRate} <span>({place?.reviews?.length} reviews)</span></h2>
                    </div>
                </div>

                <form className='check_form' onSubmit={handlesubmit}>
                    <div className="checkin_out">
                        <div className='checkin_input checkin_out_input'>
                            <label htmlFor="checkin">Check-In</label>
                            <input value={checkin} type="date" name="checkin" id="checkin" min={new Date().toISOString().split('T')[0]} onChange={(e) => setcheckin(e.target.value)} />
                        </div>

                        <div className='checkout_input checkin_out_input'>
                            <label htmlFor="checkout">Check-Out</label>
                            <input value={checkout} type="date" name="checkout" id="checkout" min={new Date().toISOString().split('T')[0]} onChange={(e) => setcheckout(e.target.value)} />
                        </div>
                    </div>

                    <div className="guests">
                        <label htmlFor="guests">Guests</label>
                        <input value={guests} type="number" min={1} max={place.maxGuests} name="guests" id="guests" placeholder='guests' onChange={(e) => setguests(e.target.value)} />
                    </div>

                    {numberofDays > 0 && <div className="UserName">
                        <label htmlFor="guests">Your fullname</label>
                        <input value={Username} type="text" name="UserName" id="UserName" onChange={(e) => setUsername(e.target.value)} />
                    </div>}

                    {numberofDays > 0 && <div className="UserPhone">
                        <label htmlFor="UserPhone">Your Phone Number</label>
                        <PhoneInput
                            id="UserPhone"
                            name="UserPhone"
                            onChange={setUserphone}
                            value={Userphone}
                        />
                    </div>}

                    <div className='check_form_cta'>
                        <button type='submit'>Check availability</button>
                    </div>

                    <div>
                        <p className='book-error-msg'>Please enter all informations</p>
                    </div>

                    <PlaceBook
                        opened={opened}
                        close={close}
                        numberofDays={numberofDays}
                        PlaceRate={PlaceRate}
                        place={place}
                        checkin={checkin}
                        checkout={checkout}
                        guests={guests}
                        Username={Username}
                        Userphone={Userphone}
                        host={Placeuserid}
                    ></PlaceBook>
                </form>
            </div>
        </div>
    )
}

export default BookingCard