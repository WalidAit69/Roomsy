import React from 'react';
import "./placePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heart } from '@fortawesome/free-solid-svg-icons'
import Image from '../AddPlace Components/Image';



function PhotoGrid({ images, handlephotoGrid, handleLikeClick, isLiked }) {
    return (
        <div className='PhotoGrid'>
            <div className='PhotoGrid_navigation'>
                <FontAwesomeIcon className='PhotoGridicon' icon={faAngleLeft} onClick={handlephotoGrid} />
                <div className="Place_cta">
                    <div className="share">
                        <FontAwesomeIcon className='' icon={faArrowUpFromBracket} />
                        <p>Share</p>
                    </div>
                    <div onClick={handleLikeClick}>
                        {isLiked ? <FontAwesomeIcon className='like' icon={heart} /> : <FontAwesomeIcon icon={faHeart} />}
                        <p>{isLiked ? "Liked" : "Like"}</p>
                    </div>
                </div>
            </div>

            <div className='PhotoGrid_container'>
                <div className='PhotoGrid_imgs'>
                    {images && images.map((img, index) => {
                        return <Image className={`grid-item item-${index}`} src={img} alt='' key={index}></Image>
                    })}
                </div>
            </div>

        </div>
    )
}

export default PhotoGrid