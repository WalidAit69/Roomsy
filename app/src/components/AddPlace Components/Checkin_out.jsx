import { Button, Group } from '@mantine/core';
import React, { useEffect } from 'react'

function Checkin_out({
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    maxGuests,
    setMaxGuests,
    active,
    setActive,
    isEdit,
    place
}) {

    const nextStep = () => {
        if (!isEdit) {
            if (checkIn === "") {
                document.querySelector(".location_inputs").classList.add("error")
                document.querySelector(".error-msg").classList.add("show-error-msg")
            }
            if (checkOut === "") {
                document.querySelector(".address").classList.add("error")
                document.querySelector(".error-msg-address").classList.add("show-error-msg")
            }
            if (checkIn && checkOut) {
                setActive((current) => (current < 5 ? current + 1 : current))
            }
        } else { setActive((current) => (current < 5 ? current + 1 : current)) }

    };
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        if (checkIn) {
            document.querySelector(".location_inputs").classList.remove("error")
            document.querySelector(".error-msg").classList.remove("show-error-msg")
        }
        if (checkOut) {
            document.querySelector(".address").classList.remove("error")
            document.querySelector(".error-msg-address").classList.remove("show-error-msg")
        }
    }, [checkIn, checkOut])

    const handlecheckInChange = (event) => setCheckIn(event.target.value);
    const handlecheckOutChange = (event) => setCheckOut(event.target.value);
    const handlemaxGuestsChange = (event) => setMaxGuests(event.target.value);


    return (
        <form action="">
            <div className="Checkin_out form">
                <div>
                    <label htmlFor="checkIn">Check In time <span>*</span></label>
                    <input
                        type='time'
                        placeholder='14:00'
                        name='checkIn'
                        id='checkIn'
                        className='location_inputs city'
                        onChange={handlecheckInChange}
                        value={checkIn}
                    ></input>
                    <p className='error-msg error-msg-city'>Specify Check in time</p>
                </div>

                <div>
                    <label htmlFor="checkOut">Check Out time <span>*</span></label>
                    <input
                        type='time'
                        placeholder='14:00'
                        name='checkOut'
                        id='checkOut'
                        className='location_inputs address'
                        onChange={handlecheckOutChange}
                        value={checkOut}
                    ></input>
                    <p className='error-msg error-msg-address'>Specify Check out time</p>
                </div>

                <div>
                    <label htmlFor="maxGuests">Max guests <span>*</span></label>
                    <input
                        placeholder='0'
                        type='number'
                        name='maxGuests'
                        id='maxGuests'
                        className='location_inputs address'
                        onChange={handlemaxGuestsChange}
                        value={maxGuests}
                        min={1}
                    ></input>
                    <p className='error-msg error-msg-address'>Must have atleast 3 characters</p>
                </div>
            </div>


            <Group position="center" mt="xl" className='AddPlace_btn'>
                {active > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
                <Button color="orange" onClick={nextStep}>{active == 5 ? "Add Place" : "Next Step"}</Button>
            </Group>
        </form>
    )
}

export default Checkin_out