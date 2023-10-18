import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function PlaceCardSkeleton({ cards }) {

    return (
        Array(cards).fill(0).map((_ , index) => <div key={index} className='place_card'>
            <Skeleton className='place_card_image' />
            <Skeleton width={'200px'} />
            <Skeleton width={'250px'} />
            <Skeleton width={'150px'} />
            <Skeleton width={'70px'} />
        </div>)

    )
}

export default PlaceCardSkeleton