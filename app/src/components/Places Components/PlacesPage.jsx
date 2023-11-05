import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./PlacesPage.css";
import PlaceCard from './PlaceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBed, faPlaceOfWorship, faGem, faBellConcierge, faCampground } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../../App';
import RegisterWidget from '../../widgets/Home widgets/RegisterWidget';
import PlaceCardSkeleton from '../../widgets/Place Widgets/PlaceCardSkeleton';
import PaginationButtons from '../../widgets/Place Widgets/Pagination';


function PlacesPage() {
    const [Allplaces, setllplaces] = useState();
    const [placesBycat, setplacesBycat] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [numPlaces, setnumPlaces] = useState();
    const { showPopup, type, settype, selectedcategoryindex, setselectedcategoryindex } = useContext(MyContext);

    async function getAllPlaces() {
        const { data } = await axios.get('/places');
        setllplaces(data)
        setnumPlaces(data.length);
        setisLoading(false);
    }
    async function getPlacesByCategory() {
        const { data } = await axios.get(`/placesByType/${type}`);
        setplacesBycat(data)
        setisLoading(false);
    }


    useEffect(() => {
        getAllPlaces();
        document.querySelector(".header").classList.remove("remove_header");
        document.querySelector(".footer").classList.remove("remove_header");
    }, [])

    useEffect(() => {
        getPlacesByCategory();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Allplaces?.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = Math.ceil(Allplaces?.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <section>
            <div className='container dim_overlay'>
                <div className='places-header'>
                    <ul className='places-header-list'>
                        {categories.map((categorie, index) => {
                            return <div
                                key={index}
                                className={index === 0 && selectedcategoryindex === index ? "places_category_active" : (selectedcategoryindex === index ? 'places_category_active' : 'places_category')}
                                onClick={() => handlecategory(index)}
                            >
                                <FontAwesomeIcon icon={categorie.icon} />
                                <p>{categorie.category}</p>
                            </div>
                        })}
                    </ul>
                </div>

                {type === "All" && <div className='places_container'>

                    {isLoading ? (
                        <PlaceCardSkeleton cards={12} />
                    ) : (
                        <>
                            {currentItems?.length > 0 && currentItems.map((place, index) => (
                                <React.Fragment key={place._id}>
                                    <PlaceCard id={place._id} />
                                    {index === 3 && (
                                        // Separator
                                        <div className="separator">
                                            <img src={"https://ucarecdn.com/a0dd1e21-6a10-4d18-aacd-998990d67c49/-/preview/1000x1000/-/quality/smart/-/format/auto/"} loading='lazy' className='separator_img' alt="" />
                                            <div className='separator_info'>
                                                <div className="ellipse"></div>
                                                <div>
                                                    <h3>Thoughtfully designed homes.</h3>
                                                    <h3>Exceptional hosts. <span>Verified for quality.</span></h3>
                                                </div>
                                                <div>
                                                    <p>Every home is verified through in-person quality inspection to ensure quality and design. Just look for the <span>PRO</span> badge.</p>
                                                </div>
                                                <div>
                                                    <button>Get PRO</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                            <PaginationButtons
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        </>
                    )}

                </div>}

                {type !== "All" && <div className='places_container'>

                    {placesBycat?.length > 0 && placesBycat.map((place) => {
                        return <PlaceCard key={place._id} id={place._id}></PlaceCard>
                    })}
                </div>}
            </div>
            {showPopup && <RegisterWidget />}
        </section>

    )
}

export default PlacesPage