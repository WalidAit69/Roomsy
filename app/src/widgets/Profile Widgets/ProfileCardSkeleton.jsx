import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function ProfileCardSkeleton({cards}) {
    return (
        Array(cards).fill(0).map((_, index) => <div key={index} className='user_place_card'>
            <Skeleton className='place_card_image' />
            <Skeleton width={'250px'} />
            <Skeleton width={'250px'} />
        </div>)

    )
}

export default ProfileCardSkeleton