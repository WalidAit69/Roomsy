import React, { useContext, useEffect, useState } from 'react';
import "./AddPlace.css";
import { Stepper, Button, Group, Container, Modal } from '@mantine/core';
import Location from '../AddPlace Components/Location';
import useAuth from '../../app/useAuth';
import UPimages from '../AddPlace Components/UPimages';
import PlaceBasics from '../AddPlace Components/PlaceBasics';
import Placefacilities from '../AddPlace Components/Placefacilities';
import Checkin_out from '../AddPlace Components/Checkin_out';
import axios from "axios";
import { MyContext } from '../../App';
import { useParams } from 'react-router-dom';


function AddPlace({ opened, setOpened, id, placeimages }) {

    const { isEdit, setIsEdit } = useContext(MyContext);

    const [user, setuser] = useState("");
    const [place, setplace] = useState("");

    useAuth({ user, setuser })


    const [active, setActive] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [images, setImages] = useState([]);
    const [photoLink, setphotoLink] = useState([]);
    const [type, settype] = useState('');
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [livingRooms, setLivingRooms] = useState(0);
    const [kitchens, setKitchens] = useState(0);
    const [perks, setPerks] = useState([]);
    const [extrainfo, setExtrainfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState();
    const userNumber = user?.phone;
    const owner = user?.id;
    const randomFloat = (Math.random() * (5 - 1)) + 1;
    const rating = parseFloat(randomFloat.toFixed(2));

    const [isLoading, setisLoading] = useState(false);

    async function AddnewPlace(e) {
        setisLoading(true);
        const placedata = {
            title,
            description,
            price,
            address,
            city,
            country,
            images,
            type,
            bedrooms,
            bathrooms,
            livingRooms,
            kitchens,
            perks,
            extrainfo,
            userNumber,
            checkIn,
            checkOut,
            maxGuests,
            rating,
            owner,
        };

        const { data } = await axios.post(`/place/${owner}`, placedata)
        window.location.reload();
    }


    async function UpdatePlace(e) {
        setisLoading(true);
        const placedata = {
            id,
            title,
            description,
            price,
            address,
            city,
            country,
            images: images || placeimages,
            type,
            bedrooms,
            bathrooms,
            livingRooms,
            kitchens,
            perks,
            extrainfo,
            userNumber,
            checkIn,
            checkOut,
            maxGuests,
            owner
        };
        const { data } = await axios.put('/place', placedata)
        window.location.reload();
    }


    async function getPlace() {
        const { data } = await axios.get(`/place/${id}`)
        setplace(data);
    }

    useEffect(() => {
        getPlace();
    }, [])


    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            closeOnClickOutside
            size={"90%"}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Container h={"40rem"} w={"100%"}>
                <Stepper color="orange" active={active} onStepClick={setActive} breakpoint="sm" allowNextStepsSelect={false}>
                    <Stepper.Step label="Location" description="Address">
                        <Location
                            address={address}
                            setAddress={setAddress}
                            city={city}
                            setCity={setCity}
                            country={country}
                            setCountry={setCountry}
                            active={active}
                            setActive={setActive}
                            isEdit={isEdit}
                            place={place}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Photos" description="Upload">
                        <UPimages
                            images={images}
                            setImages={setImages}
                            photoLink={photoLink}
                            setphotoLink={setphotoLink}
                            active={active}
                            setActive={setActive}
                            isEdit={isEdit}
                            place={place}
                            id={id}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Basics" description="Details">
                        <PlaceBasics
                            title={title}
                            setTitle={setTitle}
                            description={description}
                            setDescription={setDescription}
                            price={price}
                            setPrice={setPrice}
                            extrainfo={extrainfo}
                            setExtrainfo={setExtrainfo}
                            active={active}
                            setActive={setActive}
                            isEdit={isEdit}
                            place={place}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Facilities" description="Equipements">
                        <Placefacilities
                            bedrooms={bedrooms}
                            setBedrooms={setBedrooms}
                            type={type}
                            settype={settype}
                            bathrooms={bathrooms}
                            setBathrooms={setBathrooms}
                            livingRooms={livingRooms}
                            setLivingRooms={setLivingRooms}
                            kitchens={kitchens}
                            setKitchens={setKitchens}
                            perks={perks}
                            setPerks={setPerks}
                            active={active}
                            setActive={setActive}
                            isEdit={isEdit}
                            place={place}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Check In & Out">
                        <Checkin_out
                            checkIn={checkIn}
                            setCheckIn={setCheckIn}
                            checkOut={checkOut}
                            setCheckOut={setCheckOut}
                            maxGuests={maxGuests}
                            setMaxGuests={setMaxGuests}
                            active={active}
                            setActive={setActive}
                            isEdit={isEdit}
                            place={place}
                        />
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Group position="center" mt="xl">
                            {!isEdit ?
                                (!isLoading ? <Button color="orange" w={"150px"} onClick={AddnewPlace}>Add Place</Button> : <Button color="orange" w={"150px"}><span className='loader'></span></Button> ) :
                                (!isLoading ? <Button color="orange" w={"150px"} onClick={UpdatePlace}>Update Place</Button> : <Button color="orange" w={"150px"}><span className='loader'></span></Button> )
                            }
                        </Group>
                    </Stepper.Completed>
                </Stepper>
            </Container>
        </Modal>
    )
}

export default AddPlace