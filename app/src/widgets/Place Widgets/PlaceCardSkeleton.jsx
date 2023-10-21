import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function PlaceCardSkeleton({ cards }) {

    return (
        Array(cards).fill(0).map((_, index) => <div key={index} className='place_card'>
            <Skeleton className='place_card_image' />
            <div>
                <Skeleton className='skeletitle2' />
                <Skeleton className='skeletitle' />
                <Skeleton width={'150px'} />
                <Skeleton width={'70px'} />
            </div>

        </div>)

    )
}

export default PlaceCardSkeleton