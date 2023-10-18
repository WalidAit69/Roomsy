import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./PlaceSearch.css";
import axios from "axios";
import PlaceCard from '../components/Places Components/PlaceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MyContext } from '../App';
import RegisterWidget from '../widgets/Home widgets/RegisterWidget';


function PlacesSearch() {
    const { showPopup } = useContext(MyContext);

    const { country, checkin, checkout, guests } = useParams();
    const [SearchRes, setSearchRes] = useState();
    const [SortDirection, setSortDirection] = useState('');
    const [isLoading, setisLoading] = useState(true);


    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    }

    async function GetPlaces() {
        const { data } = await axios.get(`/placesBySearch/${country}/${checkin}/${checkout}/${guests}`)
        setSearchRes(data);
        setisLoading(false);
    }

    useEffect(() => {
        GetPlaces();

    }, [])

    const sortByPriceHighToLow = () => {
        const sortedResults = [...SearchRes].sort((a, b) => b.price - a.price);
        setSortDirection("highToLow");
        setSearchRes(sortedResults);
    };

    const sortByPriceLowToHigh = () => {
        const sortedResults = [...SearchRes].sort((a, b) => a.price - b.price);
        setSortDirection("lowToHigh");
        setSearchRes(sortedResults);
    };


    const handleSortClick = () => {
        if (SortDirection === "" || SortDirection === "lowToHigh") {
            sortByPriceHighToLow();
            setSortDirection("highToLow")
        }
        if (SortDirection === 'highToLow') {
            sortByPriceLowToHigh();
            setSortDirection("lowToHigh")
        }
    }

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

    function goBack() {
        window.history.back();
    }

    return (
        <>
            <section className='Search_container dim_overlay '>
                {screenWidth > 450 && <div className='search_bar'>
                    <div>
                        {<p>Location</p>}
                        <h4>{country}</h4>
                    </div>

                    <div>
                        {<p>Check in</p>}
                        <h4>{formatDate(checkin)}</h4>
                    </div>

                    <div>
                        {<p>Check out</p>}
                        <h4>{formatDate(checkout)}</h4>
                    </div>

                    <div>
                        {<p>Guests</p>}
                        <h4>{guests} {guests > 1 ? "Guests" : "Guest"}</h4>
                    </div>
                </div>}

                {screenWidth < 450 && <div className='search_bar_mobile'>
                    <div>
                        <FontAwesomeIcon className='backicon' onClick={goBack} icon={faArrowLeft} />
                        <h4>{country}</h4>
                    </div>

                    <div>
                        <p>{formatDate(checkin)}</p>
                        <span>-</span>
                        <p>{formatDate(checkout).split('.')[1]}</p>
                        <span> · </span>
                        <p>{guests} {guests > 1 ? "Guests" : "Guest"}</p>
                    </div>
                </div>}

                <div className='Searchinfo_container'>
                    <div className='search_info'>
                        <div>
                            {isLoading ? <Skeleton width={"200px"} /> : <h4>{SearchRes?.length > 1 ? SearchRes?.length + " Places" : SearchRes?.length + " Place"}
                                <span> · </span>
                                {formatDate(checkin)}
                                <span> - </span>
                                {formatDate(checkout).split('.')[1]}
                            </h4>}

                            {isLoading ? <Skeleton width={"250px"} /> : <h2>Places in selected area</h2>}
                        </div>

                        <div>
                            <label htmlFor="">Filter by</label>
                            <button onClick={handleSortClick} className={(SortDirection === "highToLow" || SortDirection === "lowToHigh") && 'filter_btn'}>
                                Price
                                <span><FontAwesomeIcon icon={faArrowUp} className={SortDirection === "lowToHigh" ? 'sort_icon-show' : "sort_icon"}></FontAwesomeIcon></span>
                                <span><FontAwesomeIcon icon={faArrowDown} className={SortDirection === "highToLow" ? 'sort_icon-show' : "sort_icon"}></FontAwesomeIcon></span>
                            </button>
                        </div>
                    </div>

                    <div className='search_result'>
                        {SearchRes && SearchRes.map((place) => {
                            return <PlaceCard key={place._id} id={place._id}></PlaceCard>
                        })}
                    </div>

                    {SearchRes && SearchRes.length == 0 && <div className='space'></div>}

                </div>

            </section>

            {showPopup && <RegisterWidget></RegisterWidget>}

        </>
    )
}

export default PlacesSearch