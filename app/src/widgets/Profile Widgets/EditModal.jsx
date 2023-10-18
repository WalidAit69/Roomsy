import React from 'react';
import { Modal } from '@mantine/core';
import "../../screens/ProfilePage.css";

function EditModal({ opened, setOpened, updatetype, setjob, setlang, setbio }) {

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Update Info"
                closeOnClickOutside
                overlayProps={{
                    backgroundOpacity: 0.3,
                    blur: 3,
                }}
                centered>

                {updatetype === "work" && <div className='EditModal'>
                    <div className='Profile_update'>
                        <label htmlFor="work">Job</label>
                        <input type="text" name='work' placeholder='Your Job' onChange={(e) => setjob(e.target.value)} />
                    </div>
                    <button className='black_btn' onClick={() => setOpened(false)}>Continue</button>
                </div>}

                {updatetype === "language" && <div className='EditModal'>
                    <div className='Profile_update'>
                        <label htmlFor="language">languages</label>
                        <input type="text" name='language' placeholder='Your languages' onChange={(e) => setlang(e.target.value)} />
                    </div>
                    <button className='black_btn' onClick={() => setOpened(false)}>Continue</button>
                </div>}

                {updatetype === "bio" && <div className='EditModal'>
                    <div className='Profile_update'>
                        <label htmlFor="bio">Bio</label>
                        <input type="text" name='bio' placeholder='Your Bio' onChange={(e) => setbio(e.target.value)} />
                    </div>
                    <button className='black_btn' onClick={() => setOpened(false)}>Continue</button>
                </div>}

            </Modal>
        </>
    )
}

export default EditModal;