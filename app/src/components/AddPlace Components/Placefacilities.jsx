import React, { useEffect } from 'react';
import "../BecomeHost Components/AddPlace.css";
import pet from "../../assets/Perks/pets-svgrepo-com.svg";
import dumbell from "../../assets/Perks/dumbell-fitness-svgrepo-com.svg";
import { Button, Group } from '@mantine/core';


function Placefacilities({
    bedrooms,
    setBedrooms,
    type,
    settype,
    bathrooms,
    setBathrooms,
    livingRooms,
    setLivingRooms,
    kitchens,
    setKitchens,
    perks,
    setPerks,
    active,
    setActive,
    isEdit,
    place
}) {

    const nextStep = () => {
        if (!isEdit) {
            if (type == "") {
                document.querySelector(".type").classList.add("error")
                document.querySelector(".error-msg-type").classList.add("show-error-msg")
            }
            if (bedrooms == "" || bedrooms < 0) {
                document.querySelector(".Bedrooms").classList.add("error")
                document.querySelector(".error-msg-Bedrooms").classList.add("show-error-msg")
            }
            if (bathrooms == "" || bathrooms < 0) {
                document.querySelector(".bathrooms").classList.add("error")
                document.querySelector(".error-msg-bathrooms").classList.add("show-error-msg")
            }
            if (bedrooms > 0 && bathrooms > 0 && type) {
                setActive((current) => (current < 4 ? current + 1 : current))
            }
        } else { setActive((current) => (current < 5 ? current + 1 : current)) }
    };

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        if (bedrooms > 0) {
            document.querySelector(".Bedrooms").classList.remove("error")
            document.querySelector(".error-msg-Bedrooms").classList.remove("show-error-msg")
        }
        if (bathrooms > 0) {
            document.querySelector(".bathrooms").classList.remove("error")
            document.querySelector(".error-msg-bathrooms").classList.remove("show-error-msg")
        }
    }, [bedrooms, bathrooms])

    useEffect(() => {
        if (type) {
            document.querySelector(".type").classList.remove("error")
            document.querySelector(".error-msg-type").classList.remove("show-error-msg")
        }
    }, [type])


    const handleBedroomsChange = (event) => setBedrooms(parseFloat(event.target.value));
    const handleBathroomsChange = (event) => setBathrooms(parseFloat(event.target.value));
    const handleLivingRoomsChange = (event) => setLivingRooms(parseFloat(event.target.value));
    const handleKitchensChange = (event) => setKitchens(parseFloat(event.target.value));
    const handleTypeChange = (event) => { settype(event.target.value); };


    function handleperkChange(e) {
        const { checked, name } = e.target;
        if (checked) {
            if (!perks.includes(name)) {
                setPerks([...perks, name ])
            }
        } else {
            setPerks(perks.filter(item => item !== name))
        }

    }

    useEffect(() => {
        if (isEdit) {
            setPerks(place?.perks)
        }

    }, [])


    const haswifi = perks.includes("wifi");
    const hasparking = perks.includes("parking");
    const hastv = perks.includes("tv");
    const hasfitness = perks.includes("fitness");
    const hasprivateentrance = perks.includes("privateentrance");
    const haspets = perks.includes("pets");


    const options = ['Entire home', 'Studio', 'Mansion', 'Unique stays', 'Outdoor gateways', 'Luxe'];

    return (
        <form action="">
            <div className='Placefacilities'>
                <div className="Placefacilities_left form">

                    <div>
                        <label htmlFor="title">Place type <span>*</span></label>
                        <select className='location_inputs type' value={type} onChange={handleTypeChange}>
                            <option value="">Select an item</option>
                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <p className='error-msg error-msg-type'>Specify the type of your place</p>
                    </div>

                    <div>
                        <label htmlFor="title">No of Bedrooms <span>*</span></label>
                        <input
                            type='number'
                            placeholder='0'
                            name='bedrooms'
                            id='bedrooms'
                            className='location_inputs Bedrooms'
                            onChange={handleBedroomsChange}
                            value={bedrooms}
                            min={0}
                        ></input>
                        <p className='error-msg error-msg-Bedrooms'>Must have atleast one room</p>
                    </div>

                    <div>
                        <label htmlFor="description">No of bathrooms <span>*</span></label>
                        <input
                            placeholder='0'
                            type='number'
                            name='bathrooms'
                            id='bathrooms'
                            className='location_inputs bathrooms'
                            onChange={handleBathroomsChange}
                            value={bathrooms}
                            min={0}
                        ></input>
                        <p className='error-msg error-msg-bathrooms'>Must have atleast one bathroom</p>
                    </div>

                    <div>
                        <label htmlFor="price">No of Living Rooms <span>*</span></label>
                        <input
                            placeholder='0'
                            type='number'
                            name='livingRooms'
                            id='livingRooms'
                            className='location_inputs livingRooms'
                            onChange={handleLivingRoomsChange}
                            value={livingRooms}
                            min={0}
                        ></input>
                        <p className='error-msg error-msg-livingRooms'>Specify Number of Living Rooms</p>
                    </div>

                    <div>
                        <label htmlFor="price">No of kitchens <span>*</span></label>
                        <input
                            placeholder='0'
                            type='number'
                            name='kitchens'
                            id='kitchens'
                            className='location_inputs kitchens'
                            onChange={handleKitchensChange}
                            value={kitchens}
                            min={0}
                        ></input>
                        <p className='error-msg error-msg-kitchens'>Specify Number of kitchens</p>
                    </div>
                </div>

                <div className="Placefacilities_right">

                    <label htmlFor="wifi" className={haswifi ? "perkclicked perk" : "perk"} onClick={handleperkChange}>
                        {isEdit ? <input type="checkbox" defaultChecked  name="wifi" id="wifi" hidden /> : <input type="checkbox"  name="wifi" id="wifi" hidden />}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                        </svg>
                        <span>Wifi</span>
                    </label>

                    <label htmlFor="parking" className={hasparking ? "perkclicked perk" : "perk"} onClick={handleperkChange}>
                    {isEdit ? <input type="checkbox" defaultChecked  name="parking" id="parking" hidden /> : <input type="checkbox"  name="parking" id="parking" hidden />}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M11 6C9.34315 6 8 7.34315 8 9V17C8 17.5523 8.44772 18 9 18C9.55229 18 10 17.5523 10 17V14L12.0045 14C12.2149 13.9987 12.426 13.974 12.6332 13.9395C12.9799 13.8817 13.4575 13.7642 13.9472 13.5194C14.4409 13.2725 14.9649 12.8866 15.3633 12.289C15.7659 11.6851 16 10.9249 16 9.99996C16 9.07499 15.7659 8.31478 15.3633 7.71092C14.9649 7.11332 14.4408 6.7274 13.9472 6.48058C13.4575 6.23573 12.9799 6.11828 12.6332 6.06049C12.4248 6.02575 12.2117 6.0001 12 6H11ZM10 12V9C10 8.44772 10.4477 8 11 8L12.0004 8.00018C12.3603 8.01218 12.7318 8.10893 13.0528 8.26944C13.3092 8.39762 13.5351 8.5742 13.6992 8.82033C13.8591 9.06021 14 9.42497 14 9.99996C14 10.575 13.8591 10.9397 13.6992 11.1796C13.5351 11.4258 13.3091 11.6023 13.0528 11.7305C12.7318 11.891 12.3603 11.9878 12.0003 11.9998L10 12Z"
                                fill="#0F0F0F" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                                fill="#0F0F0F" />
                        </svg>
                        <span>Free Parking</span>
                    </label>

                    <label htmlFor="tv" className={hastv ? "perkclicked perk" : "perk"} onClick={handleperkChange}>
                    {isEdit ? <input type="checkbox" defaultChecked  name="tv" id="tv" hidden /> : <input type="checkbox"  name="tv" id="tv" hidden />}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span>TV</span>
                    </label>

                    <label htmlFor="pets" className={haspets ? "perkclicked perk" : "perk"} onClick={handleperkChange}>
                    {isEdit ? <input type="checkbox" defaultChecked  name="pets" id="pets" hidden /> : <input type="checkbox"  name="pets" id="pets" hidden />}
                        <img src={pet} alt="" />
                        <span>Pets Allowed</span>
                    </label>

                    <label htmlFor="privateentrance" className={hasprivateentrance ? "perkclicked perk" : "perk"} onClick={handleperkChange}>
                    {isEdit ? <input type="checkbox" defaultChecked  name="privateentrance" id="privateentrance" hidden /> : <input type="checkbox"  name="privateentrance" id="privateentrance" hidden/>}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 21.0001L14 21V5.98924C14 4.6252 14 3.94318 13.7187 3.47045C13.472 3.05596 13.0838 2.74457 12.6257 2.59368C12.1032 2.42159 11.4374 2.56954 10.1058 2.86544L7.50582 3.44322C6.6117 3.64191 6.16464 3.74126 5.83093 3.98167C5.53658 4.19373 5.30545 4.48186 5.1623 4.8152C5 5.19312 5 5.65108 5 6.56702V21.0001M13.994 5.00007H15.8C16.9201 5.00007 17.4802 5.00007 17.908 5.21805C18.2843 5.4098 18.5903 5.71576 18.782 6.09209C19 6.51991 19 7.07996 19 8.20007V21.0001H21M11 12.0001H11.01" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Private Entrance</span>
                    </label>

                    <label htmlFor="fitness" className={hasfitness ? "perkclicked perk" : "perk"} onClick={handleperkChange}>
                    {isEdit ? <input type="checkbox" defaultChecked  name="fitness" id="fitness" hidden /> : <input type="checkbox"  name="fitness" id="fitness" hidden />}
                        <img src={dumbell} alt="" />
                        <span>Fitness Equipement</span>
                    </label>

                </div>
            </div>

            <Group position="center" mt="xl" className='AddPlace_btn'>
                {active > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
                <Button color="orange" onClick={nextStep}>{active == 4 ? "Add Place" : "Next Step"}</Button>
            </Group>
        </form>
    )
}

export default Placefacilities