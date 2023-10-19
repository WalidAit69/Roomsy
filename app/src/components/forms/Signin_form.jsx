import React, { useContext , useState } from "react";
import "../../widgets/Home widgets/RegisterWidget.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MyContext } from "../../App";



function Signin_form() {
  const { togglePopup } = useContext(MyContext);
  const [isLoading, setisLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup.string().min(6).max(20).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const login2 = async () => {
    try {
      setisLoading(true);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }

      const response = await axios.post("/login", {
        email:email.value,
        password:password.value,
      });
      
      setisLoading(false);
      togglePopup();
      localStorage.setItem('userID' , response?.data?.id)
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.error(error);
    }
  };

  const toasts = () => {
    toast.error(errors?.email?.message);
    toast.error(errors?.password?.message);
  };


  return (
    <form action="" className="Sign__in" onSubmit={handleSubmit(login2)}>
      <div className="form">
        <input
          type="email"
          placeholder="Email"
          className="input"
          id="email"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input_lastchild"
          id="password"
          {...register("password")}
        />
      </div>

      <div className="popup__form__check">
        <div>
          {" "}
          <input type="checkbox" name="check" id="check"/>
          <label htmlFor="check">Remember me</label>
        </div>

        <p>Forgot password ?</p>
      </div>

      {!isLoading ?<button type="submit" className="btn" onClick={toasts}>
        Sign in
      </button>: <button className="btn"><span className='loader'></span></button>}
    </form>
  );
}

export default Signin_form;
