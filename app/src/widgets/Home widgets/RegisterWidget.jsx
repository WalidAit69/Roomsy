import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import "./RegisterWidget.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Signin_form from "../../components/forms/Signin_form";
import Signup_form from "../../components/forms/Signup_form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function RegisterWidget() {
  const { togglePopup } = useContext(MyContext);

  const [registrationtype, setregistrationtype] = useState(true);

  const handleClick = () => {
    setregistrationtype(!registrationtype);
  };

  const toastConfig = {
    autoClose: 2000,
    position: "top-left",
  };

  return (
    <div className="popup__layer">
      <ToastContainer {...toastConfig}/>
      <div className="popup">
        <div className="popup__title">
          <div>
            <h1>{registrationtype ? "Sign in" : "Sign up"}</h1>
            <span>
              <p onClick={handleClick}>
                {registrationtype ? "Create an account" : "Log in"}
              </p>
            </span>
          </div>
          <span onClick={togglePopup}>x</span>
        </div>

        <div className="popup__form">
          {registrationtype ? (
            <Signin_form></Signin_form>
          ) : (
            <Signup_form setregistrationtype={setregistrationtype}></Signup_form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterWidget;
