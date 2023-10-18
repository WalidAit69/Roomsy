import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./Reservation_bar.css";
import { useNavigate } from "react-router-dom";
import useCountries from "../../hooks/useCountries";


function Reservation_bar() {
  const reservation = useRef();

  const navigate = useNavigate();

  const [country, setcountry] = useState();
  const [checkin, setcheckin] = useState();
  const [checkout, setcheckout] = useState();
  const [guests, setguests] = useState();

  const [Ismobile, setIsmobile] = useState(false);

  const handleclick = () => {
    setIsmobile(!Ismobile);
    reservation.current.classList.toggle("responsive-reserv");
    document.querySelectorAll(".res_reg_bar").forEach((element) =>{
      element.classList.toggle("responsive-loc")
    })
  };

  const handleSearch = (e) =>{
    e.preventDefault();
    if(!country){location.current.classList.add("reg_error");}

    if(!checkin){document.querySelector(".input_checkin").classList.add("reg_error")}

    if(!checkout){document.querySelector(".input_checkout").classList.add("reg_error")}

    if(!guests){document.querySelector(".input_guests").classList.add("reg_error")}

    if(country && checkin && checkout && guests){
      navigate(`/places/${country}/${checkin}/${checkout}/${guests}`)
    }
  }

  useEffect(() => {
    if(country){location.current.classList.remove("reg_error");}

    if(checkin){document.querySelector(".input_checkin").classList.remove("reg_error")}

    if(checkout){document.querySelector(".input_checkout").classList.remove("reg_error")}

    if(guests){document.querySelector(".input_guests").classList.remove("reg_error")}

  }, [country , checkin , checkout , guests])
  

  const countries = useCountries().getAll();

  return (
    <form className="reservation">
      <div className="pc__form dim_overlay" ref={reservation}>
        <div className="location res_reg_bar">
          <div>
            <h3>Location</h3>
            <span onClick={handleclick}>x</span>
          </div>
          <select name="location" id="location" ref={location} className="input_location" onChange={(e) => setcountry(e.target.value)}>
            <option value="">Where are you going ?</option>
            {countries.map((country, index) => (
              <option key={index} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        <div className="check check_in res_reg_bar">
          <h3>Check in</h3>
          <input type="date" name="check_in" id="check_in" className="input_checkin" min={new Date().toISOString().split('T')[0]} onChange={(e) => setcheckin(e.target.value)} />
        </div>

        <div className="check check_out res_reg_bar">
          <h3>Check out</h3>
          <input type="date" name="check_out" id="check_out" className="input_checkout" min={new Date().toISOString().split('T')[0]} onChange={(e) => setcheckout(e.target.value)} />
        </div>

        <div className="check check_guests res_reg_bar">
          <h3>Guests</h3>
          <input type="number" min={1} max={20} placeholder="Guests" className="input_guests" name="check_guests" id="check_guests" onChange={(e) => setguests(e.target.value)} />
        </div>

        <button onClick={handleSearch} className="search_icon">
          <CiSearch size={"25px"}></CiSearch>
        </button>
      </div>

      <div className="mobile__form dim_overlay" onClick={handleclick}>
        <div>
          <CiSearch size={"25px"}></CiSearch>
        </div>

        <div>
          <h3>Reservation</h3>
          <div className="mobile__form__info">
            <p>location</p>
            <span>.</span>
            <p>guests</p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Reservation_bar;
