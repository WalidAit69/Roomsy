import React from 'react';
import "../Place Widgets/Reviews.css";
import { Container, Modal } from '@mantine/core';


function ConfirmationDialog({ isOpen, onClose, onConfirm }) {




    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            closeOnClickOutside
            size={"30%"}
            title="Confirmation"
            className="Confirmation"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
            centered
        >
            <Container h={"10rem"} w={"100%"}>
                <div className='modal-overlay'>
                    <h2>Are you sure you want to delete your Review</h2>
                    <div className="buttons">
                        <button onClick={onConfirm}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            </Container>
        </Modal>
    )
}


export default ConfirmationDialog;
