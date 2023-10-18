import React, { useEffect, useState } from 'react'
import useCountries from '../../hooks/useCountries';
import Map from '../Map';
import "../BecomeHost Components/AddPlace.css";
import { Button, Group } from '@mantine/core';


function Location({
    address,
    setAddress,
    city,
    setCity,
    country,
    setCountry,
    active,
    setActive,
    isEdit,
    place
}) {

    const nextStep = () => {
        if (!isEdit) {
            if (country.length < 3) {
                document.querySelector(".location_inputs").classList.add("error")
                document.querySelector(".error-msg").classList.add("show-error-msg")
            }
            if (city.length < 3) {
                document.querySelector(".city").classList.add("error")
                document.querySelector(".error-msg-city").classList.add("show-error-msg")
            }
            if (address.length < 3) {
                document.querySelector(".address").classList.add("error")
                document.querySelector(".error-msg-address").classList.add("show-error-msg")
            }
            if (country.length >= 3 && city.length >= 3 && address.length >= 3) {
                setActive((current) => (current < 5 ? current + 1 : current))
            }
        }else{
            setActive((current) => (current < 5 ? current + 1 : current))
        }

    };

    useEffect(() => {
        if (country.length >= 3) {
            document.querySelector(".location_inputs").classList.remove("error")
            document.querySelector(".error-msg").classList.remove("show-error-msg")
        }
        if (city.length >= 3) {
            document.querySelector(".city").classList.remove("error")
            document.querySelector(".error-msg-city").classList.remove("show-error-msg")
        }
        if (address.length >= 3) {
            document.querySelector(".address").classList.remove("error")
            document.querySelector(".error-msg-address").classList.remove("show-error-msg")
        }
    }, [country, city, address])

    const countries = useCountries().getAll();

    const handleAddressChange = (event) => setAddress(event.target.value);
    const handleCityChange = (event) => setCity(event.target.value);
    const handleCountryChange = (event) => setCountry(event.target.value);


    return (
        <form className=''>

            <div className='addplace_location'>
                <div className='left form'>

                    <div>
                        <label htmlFor="country">Country <span>*</span></label>
                        <select className='location_inputs' id='country' name='country' value={country} onChange={handleCountryChange}>
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.value}>
                                    {country.label}
                                </option>
                            ))}
                        </select>
                        <p className='error-msg'>Must have atleast 3 characters</p>
                    </div>

                    <div>
                        <label htmlFor="city">City <span>*</span></label>
                        <input
                            name='city'
                            id='city'
                            onChange={handleCityChange}
                            value={city}
                            className='location_inputs city'
                        ></input>
                        <p className='error-msg error-msg-city'>Must have atleast 3 characters</p>

                    </div>

                    <div>
                        <label htmlFor="address">Address <span>*</span></label>
                        <input
                            name='address'
                            id='address'
                            onChange={handleAddressChange}
                            value={address}
                            className='location_inputs address'
                        ></input>
                        <p className='error-msg error-msg-address'>Must have atleast 3 characters</p>
                    </div>

                </div>

                <div className='right'>
                    <Map address={address} city={city} country={country}></Map>
                </div>
            </div>

            <Group position="center" mt="xl" className='AddPlace_btn'>
                <Button color="orange" onClick={nextStep}>{active == 3 ? "Add Place" : "Next Step"}</Button>
            </Group>
        </form>)
}

export default Location