import React, { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCheck, faLanguage, faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import UserPlaceCard from "../components/Places Components/UserPlaceCard";
import ReactTimeAgo from 'react-time-ago'
import UserPlaceLikeCard from "../components/Places Components/UserPlaceLikeCard";
import EditModal from "../widgets/Profile Widgets/EditModal";
import ProfileCardSkeleton from "../widgets/Profile Widgets/ProfileCardSkeleton";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import RegisterWidget from "../widgets/Home widgets/RegisterWidget";



function ProfilePage() {
  const { showPopup } = useContext(MyContext);


  const [user, setuser] = useState("");
  const [userplaces, setuserplaces] = useState("");
  const [totalReviews, settotalReviews] = useState();
  const [averageRating, setaverageRating] = useState();
  const [date, setdate] = useState();
  const [showEdit, setshowEdit] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isimgLoading, setisimgLoading] = useState(false);
  const [Profile, setProfile] = useState(false);

  const [updatetype, setupdatetype] = useState();
  //Updated values
  const [job, setjob] = useState('');
  const [lang, setlang] = useState('');
  const [bio, setbio] = useState('');
  const [image, setimage] = useState('');
  const [files, setfiles] = useState('');

  const { id } = useParams()

  const Userid = window.localStorage.getItem("userID")

  async function getUser() {
    const { data } = await axios.get(`/user/${id}`)
    setuser(data);
  }

  async function getplaceByowner() {
    const { data } = await axios.get(`/placeByowner/${id}`)

    setuserplaces(data)
    if (data && data.length > 0) {
      setdate(data[0]?.createdAt)
    }
    setisLoading(false);
  }


  useEffect(() => {
    getUser();
    getplaceByowner();
    if (localStorage.getItem("userID") === id) {
      setProfile(true);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  }, [id])



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
  }, [userplaces])


  function handleWorkEditClick() {
    setupdatetype("work");
    setOpened(true);
  }

  function handleBioEditClick() {
    setupdatetype("bio");
    setOpened(true);
  }

  function handleLanguageEditClick() {
    setupdatetype("language");
    setOpened(true);
  }

  async function UpdateUser() {
    const data = new FormData();
    data.append('job', job);
    data.append('lang', lang);
    data.append('bio', bio);
    data.append('file', files[0]);


    const axiowithimgConfig = {
      method: 'put',
      url: `/UpdateUserimg/${Userid}`,
      data: data,
    }
    const axioConfig = {
      method: 'put',
      url: `/UpdateUser/${Userid}`,
      data: {
        job,
        lang,
        bio
      },
    }

    if (files[0]) {
      try {
        setisimgLoading(true);
        const { data } = await axios(axiowithimgConfig)
        console.log(data)
        setisimgLoading(false);
      } catch (error) {
        setisimgLoading(false);
        console.error(error)
      }
    }

    if (!files[0]) {
      try {
        setisLoading(true);
        const { data } = await axios(axioConfig)
        console.log(data)
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        console.error(error)
      }
    }

  }

  function handleEdit() {
    if (showEdit) {
      UpdateUser();
      setshowEdit(!showEdit);
    } else {
      setshowEdit(!showEdit);
    }
  }


  let src = "";
  src = user.profilepic && user.profilepic.includes('https://') ? user.profilepic
    : "https://roomsy-v3-server.vercel.app/" + user.profilepic;


  return (
    <>
      {id &&
        <section className="container profile_page dim_overlay">
          <EditModal
            opened={opened}
            setOpened={setOpened}
            updatetype={updatetype}
            setjob={setjob}
            job={job}
            setlang={setlang}
            lang={lang}
            setbio={setbio}
            bio={bio}
          ></EditModal>
          <div className="profile_page_left">
            <div className="user_card">
              <div className="user_card_img">
                <div>
                  <input type="file" name="profilepic" className="profilepic" hidden accept="image/*" onChange={({ target: { files } }) => {
                    if (files) {
                      setimage(URL.createObjectURL(files[0]));
                      setfiles(files);
                    }
                  }} />
                  {
                    isimgLoading ? (
                      <Skeleton className="user_card_img_image" />
                    ) : !user.profilepic ? (
                      <Skeleton className="user_card_img_image" />
                    ) : image ? (
                      <img className="user_card_img_image" src={image} alt="" />
                    ) : src ? (
                      <img className="user_card_img_image" src={src} alt="" />
                    ) : null}
                  {showEdit && <FontAwesomeIcon icon={faPen} className="Profile_img_edit" onClick={() => { document.querySelector('.profilepic').click() }}></FontAwesomeIcon>}
                </div>
                {!user.fullname ? <Skeleton /> : <h1>{user.fullname}</h1>}
                {user.host && <p>Host</p>}
              </div>

              <div className="user_card_stats">
                {isLoading ? <Skeleton width={'100px'} /> : <div>
                  <h3>{totalReviews}</h3>
                  <p>Reviews</p>
                </div>}

                {isLoading ? <Skeleton /> : <div>
                  <h3>{isNaN(averageRating) ? "0.0" : averageRating}</h3>
                  <p>Average rating</p>
                </div>}

                {isLoading ? <Skeleton /> : <div>
                  {date && <h3><ReactTimeAgo date={date} locale="en-US" /></h3>}
                  <p>{date ? "Started hosting" : "Not a host"}</p>
                </div>}
              </div>

            </div>

            {!user ? <Skeleton className="user_indentity" /> : <div className="user_indentity">
              {Profile ? <h2>Your confirmed information</h2> : <h2>{user.fullname}'s confirmed information</h2>}

              <ul>
                <li>{!user.Superhost ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />} Indentity</li>
                <li>{!user.Superhost ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />} Email address</li>
                <li>{!user.Superhost ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faCheck} />} Phone number</li>
              </ul>
            </div>}

          </div>

          <div className="profile_page_right">

            <div className="profile_page_right_info">

              <div className="profile_page_right_info_edit">
                {user && (Profile ? <h1>About You</h1> : <h1>About {user.fullname}</h1>)}
                {!user ? <Skeleton width={'50px'} /> : (Profile && <button className="black_btn" onClick={handleEdit}>{showEdit ? "Save" : "Edit"}</button>)}
              </div>

              <div className="profile_page_right_infos">
                {!user ? <Skeleton width={'300px'} /> : <p><FontAwesomeIcon icon={faBriefcase} /> My job : {job ? job : user.job ? user.job : Profile ? "Add your job" : "No job"} {showEdit && <span><FontAwesomeIcon icon={faPenToSquare} className="Profile_edit" onClick={handleWorkEditClick} /></span>} </p>}
                {!user ? <Skeleton width={'300px'} /> : <p><FontAwesomeIcon icon={faLanguage} /> Speaks : {lang ? lang : user.lang ? user.lang : Profile ? "Add your languages" : "English"} {showEdit && <span><FontAwesomeIcon icon={faPenToSquare} className="Profile_edit" onClick={handleLanguageEditClick} /></span>}</p>}
              </div>

              {!user ? <Skeleton count={3} width={'750px'} /> : <p id="bio">{bio ? bio : user.bio} {showEdit && <span><FontAwesomeIcon icon={faPenToSquare} className="Profile_edit" onClick={handleBioEditClick} /></span>}</p>}
            </div>

            <div className="user_arrays">
              <div>
                {isLoading ? (
                  <Skeleton width={"200px"} />
                ) : (
                  <>
                    {userplaces?.length > 0 && !Profile ? (
                      <h1>{user.fullname}'s listings</h1>
                    ) : (
                      <h1>Your listings</h1>
                    )}
                  </>
                )}
                {userplaces?.length < 0 && <h1>No listings</h1>}
                <div className="profile_page_right_listing">
                  {isLoading ? <ProfileCardSkeleton cards={3}></ProfileCardSkeleton> :
                    userplaces && userplaces.map((place) => {
                      return <UserPlaceCard key={place._id} {...place}></UserPlaceCard>
                    })}
                </div>
              </div>

              <div>
                {isLoading ? (
                  <Skeleton width={"200px"} />
                ) : (
                  <>
                    {user?.likedPosts?.length > 0 && !Profile ? <h1>{user.fullname}'s likes</h1> : <h1>Your likes</h1>}</>)}
                {user?.likedPosts?.length < 0 && <h1>No likes</h1>}
                <div className="profile_page_right_listing">
                  {isLoading ? <ProfileCardSkeleton cards={3}></ProfileCardSkeleton> :
                    user?.likedPosts && user?.likedPosts.map((likedplace) => {
                      return <UserPlaceLikeCard id={likedplace} {...userplaces}></UserPlaceLikeCard>
                    })}
                </div>
              </div>
            </div>

          </div>

        </section>
      }

      {showPopup && <RegisterWidget></RegisterWidget>}

    </>
  );
}

export default ProfilePage;
