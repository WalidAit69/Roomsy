import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Modal, Paper } from '@mantine/core';
import PlaceBook from '../../components/Places Components/PlaceBook';
import 'react-loading-skeleton/dist/skeleton.css'
import { differenceInCalendarDays } from 'date-fns';
import PhoneInput from 'react-phone-number-input';
import BookingCard from './BookingCard';


function CheckAvailability({
    opened,
    setOpened,
    place,
    PlaceRate,
    bookinfo,
    setNotificationVisible,
}) {
    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size={"100%"}
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            centered
            className='BookingCard_reserv_form'
        >
            <Paper style={{ height: "60vh" }}>
                <BookingCard
                    bookinfo={bookinfo}
                    place={place}
                    PlaceRate={PlaceRate}
                    setOpened={setOpened}
                    setNotificationVisible={setNotificationVisible}
                />
            </Paper>
        </Modal>
    )
}

export default CheckAvailability