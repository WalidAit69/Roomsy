import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCheck, faFlag, faLanguage, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import UserPlaceCard from "../components/Places Components/UserPlaceCard";
import { useParams } from "react-router-dom";
import UserPlaceLikeCard from "../components/Places Components/UserPlaceLikeCard";
import ReactTimeAgo from 'react-time-ago'




function ProfileShow() {
  const [user, setuser] = useState("");
  const [userplaces, setuserplaces] = useState("");
  const [totalReviews, settotalReviews] = useState();
  const [averageRating, setaverageRating] = useState();
  const [date, setdate] = useState()


  const { id } = useParams()

  async function getUser() {
    const { data } = await axios.get(`/api/user/${id}`)
    setuser(data)
  }

  async function getplaceByowner() {
    const { data } = await axios.get(`/placeByowner/${id}`)

    setuserplaces(data)
    if (data && data.length > 0) {
      setdate(data[0]?.createdAt)
    }
  }

  useEffect(() => {
    getUser();
    getplaceByowner();
  }, [])

  let totalRating = 0;

  useEffect(() => {
    if (Array.isArray(userplaces)) {
      settotalReviews(userplaces.reduce((total, place) => total + (place?.reviews.length || 0), 0));
      userplaces.forEach((place) => {
        place.reviews.forEach((review) => {
          if (review.rating) {
            totalRating += review.rating;
          }
        });
      });
    }

    setaverageRating((totalRating / totalReviews).toFixed(2));
    console.log(averageRating)
  }, [userplaces])

  return (
    <>
      {id &&
        <section className="container profile_page">

          <div className="profile_page_left">

            <div className="user_card">
              <div className="user_card_img">
                <img src={`/${user.profilepic}`} alt="" />
                <h1>{user.fullname}</h1>
                <p>Host</p>
              </div>
              <div className="user_card_stats">
                <div>
                  <h3>{totalReviews}</h3>
                  <p>Reviews</p>
                </div>
                <div>
                  <h3>{averageRating}</h3>
                  <p>Average rating</p>
                </div>
                <div>
                  {date && <h3><ReactTimeAgo date={date} locale="en-US" /></h3>}
                  <p>Started hosting</p>
                </div>
              </div>
            </div>

            <div className="user_indentity">
              <h2>{user.fullname}'s confirmed information</h2>

              <ul>
                <li>{!user.Superhost ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />} Indentity</li>
                <li>{!user.Superhost ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />} Email address</li>
                <li>{!user.Superhost ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />} Phone number</li>
              </ul>
            </div>

            <p className="user_report"><FontAwesomeIcon icon={faFlag} /> <span>report this profile</span></p>

          </div>

          <div className="profile_page_right">

            <div className="profile_page_right_info">
              <h1>About {user.fullname}</h1>
              <div>
                <p><FontAwesomeIcon icon={faBriefcase} /> My work : work</p>
                <p><FontAwesomeIcon icon={faLanguage} /> Speaks : English</p>
              </div>
              <p>{user.bio}</p>
            </div>

            <div className="user_arrays">
              <div>
                <h1>{user.fullname}'s listings</h1>
                <div className="profile_page_right_listing">
                  {userplaces && userplaces.map((place, index) => {
                    return <UserPlaceCard key={index} {...place}></UserPlaceCard>
                  })}
                </div>
              </div>

              <div>
                {user?.likedPosts?.length > 0 ? <h1>{user.fullname}'s likes</h1> : <h1>No likes</h1>}
                <div className="profile_page_right_listing">
                  {user?.likedPosts && user?.likedPosts.map((likedplace, index) => {
                    return <UserPlaceLikeCard id={likedplace}></UserPlaceLikeCard>
                  })}
                </div>
              </div>
            </div>

          </div>

        </section>
      }
    </>
  );
}


export default ProfileShow;