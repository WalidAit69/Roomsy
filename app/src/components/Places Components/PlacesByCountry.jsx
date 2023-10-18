import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import PlaceCard from './PlaceCard';
import { MyContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBed, faPlaceOfWorship, faGem, faBellConcierge, faCampground } from '@fortawesome/free-solid-svg-icons'
import RegisterWidget from '../../widgets/Home widgets/RegisterWidget';


function PlacesByCountry() {
    const { country } = useParams();
    const [placesByCountryandType, setplaces] = useState();
    const [placesByCountry, setplacesByCountry] = useState();
    const { showPopup, type, settype, selectedcategoryindex, setselectedcategoryindex } = useContext(MyContext);

    async function getPlacesBycountryandType() {
        const { data } = await axios.get(`http://localhost:3001/placesByCountryAndType/${country}/${type}`)
        setplaces(data);
    }

    async function getPlacesBycountry() {
        const { data } = await axios.get(`http://localhost:3001/placesByCountry/${country}`)
        setplacesByCountry(data);
    }

    useEffect(() => {
        getPlacesBycountry();
        settype('All');
        setselectedcategoryindex(0);
    }, [])

    useEffect(() => {
        getPlacesBycountryandType();
    }, [type])


    const categories = [
        { category: 'All', icon: faHouse },
        { category: 'Entire home', icon: faHouse },
        { category: 'Studio', icon: faBed },
        { category: 'Mansion', icon: faPlaceOfWorship },
        { category: 'Unique stays', icon: faGem },
        { category: 'Outdoor gateways', icon: faCampground },
        { category: 'Luxe', icon: faBellConcierge }
    ];

    function handlecategory(index) {
        setselectedcategoryindex(index)
        settype(categories[index].category)
    }

    return (
        <section>
            <div className='container dim_overlay'>
                <div className='places-header'>
                    <ul className='places-header-list'>
                        {categories.map((categorie, index) => {
                            return <div
                                key={index}
                                className={selectedcategoryindex === index ? 'places_category_active' : 'places_category'}
                                onClick={() => handlecategory(index)}
                            >
                                <FontAwesomeIcon icon={categorie.icon} />
                                <p>{categorie.category}</p>
                            </div>
                        })}
                    </ul>
                </div>

                {type === "All" && <div className='places_container'>
                    {placesByCountry?.length > 0 ? placesByCountry.map((place, index) => {
                        return <PlaceCard key={place._id} id={place._id}></PlaceCard>
                    }) : 'No Places Available'}
                </div>}

                {type !== "All" && <div className='places_container'>
                    {placesByCountryandType?.length > 0 ? placesByCountryandType.map((place, index) => {
                        return <PlaceCard key={place._id} id={place._id}></PlaceCard>
                    }) : 'No Places Available'}
                </div>}
            </div>
            {showPopup && <RegisterWidget></RegisterWidget>}
        </section>
    )
}

export default PlacesByCountry