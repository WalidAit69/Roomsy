import React, { useContext, useState } from "react";
import "../../widgets/Home widgets/RegisterWidget.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MyContext } from "../../App";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";



function Signup_form({ setregistrationtype }) {
  const { togglePopup } = useContext(MyContext);
  const [index, setindex] = useState(1);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [fullname, setfullname] = useState('');
  const [bio, setbio] = useState('');
  const [location, setlocation] = useState('');
  const [files, setfiles] = useState('');
  const [phone, setphone] = useState('');
  const [image, setimage] = useState(null);
  const [errors, setErrors] = useState({});


  const [isLoading, setisLoading] = useState(false);


  const handleNextClick = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fullname) {
      newErrors.password = 'fullname is required';
    }
    if (!phone) {
      newErrors.password = 'phone is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (password.length > 20) {
      newErrors.password = 'Password can be at most 20 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((errorMsg) => {
        toast.error(errorMsg, {
          position: 'top-left',
        });
      });
    } else {
      setindex(index + 1)
    }
  };

  const handleregister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!bio) {
      newErrors.password = 'bio is required';
    }
    if (!location) {
      newErrors.password = 'location is required';
    }

    if (!files) {
      document.querySelector(".signup_form_profile_img").classList.add("input_focused");
      newErrors.password = 'profile picture is required';
    }

    setErrors(newErrors);


    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((errorMsg) => {
        toast.error(errorMsg, {
          position: 'top-left',
        });
      });
    } else {
      const data = new FormData();
      data.set('email', email)
      data.set('password', password)
      data.set('fullname', fullname)
      data.set('phone', phone)
      data.set('bio', bio)
      data.set('location', location)
      data.set('file', files[0])

      try {
        setisLoading(true);
        const response = await axios(
          "/api/register",
          {
            method: "post",
            data: data,
            withCredentials: true,
          }
        );
        setisLoading(false);
        setregistrationtype(true);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        console.error(error);
      }
    }

  };



  return (
    <>
      <form action="" className="Sign__in">
        {index === 1 && (
          <div className="signup_form form">
            <input
              type="text"
              value={fullname}
              name="fullname"
              placeholder="Full Name"
              className="input"
              id="fullname"

              onChange={(e) => setfullname(e.target.value)}
            />
            <PhoneInput
              placeholder="Enter phone number"
              className="input phone_input"
              value={phone}
              onChange={setphone}
              id="phone"
              name="phone"
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className="input"
              id="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="input"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
        )}

        {index === 2 && (
          <>
            <div className="signup_form_profile">
              {image ? <div className="signup_form_profile_del">
                <img src={image} alt="" />

                <svg onClick={() => setimage(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div> : <div className="signup_form_profile_img" onClick={() => { document.querySelector('.image_input').click() }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>}
            </div>
            <div className="signup_form_part2 form">
              <input
                name="file"
                type="file"
                accept="image/*"
                className="input image_input"
                required
                hidden
                onChange={({ target: { files } }) => {
                  if (files) {
                    setimage(URL.createObjectURL(files[0]));
                    setfiles(files);
                  }
                }}
              />
              <input
                type="text"
                placeholder="Bio"
                value={bio}
                className="input input_prt2"
                required
                id="bio"
                name="bio"
                onChange={(e) => setbio(e.target.value)}
              />

              <input
                type="text"
                placeholder="Location"
                value={location}
                className="input"
                required
                id="location"
                name="location"
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="popup__form_signup__check">
          <div>
            {" "}
            <input
              type="checkbox"
              name="check"
              id="check"
            />
            <label htmlFor="check">Remember me</label>
          </div>
        </div>

        {index < 2 ? (
          <button
            className="btn"
            onClick={handleNextClick}
          >
            Next
          </button>

        ) : (
          <div className="signup_navigation">
            <button
              className="btn"
              onClick={() => { setindex(index - 1) }}
            >
              back
            </button>



            {!isLoading ? <button type="submit" className="btn" onClick={handleregister}>
              Register
            </button> : <button className="btn"><span className='loader'></span></button>}
          </div>
        )}
      </form>
    </>
  );
}

export default Signup_form;
