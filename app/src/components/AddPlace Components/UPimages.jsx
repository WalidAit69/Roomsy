import React, { useEffect, useState } from 'react';
import "../BecomeHost Components/AddPlace.css";
import { Button, Group } from '@mantine/core';
import axios from 'axios';
import Image from './Image';


function UPimages({ images, setImages, photoLink, setphotoLink, active, setActive, isEdit, place, id }) {

    const [DeletePhoto, setDeletePhoto] = useState('');

    const nextStep = () => {
        if (images.length < 4) {
            document.querySelector(".error-msg").classList.add("show-error-msg")
        } else {
            setActive((current) => (current < 5 ? current + 1 : current))
        }
    };

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handlephotoLinkChange = (event) => setphotoLink(event.target.value);

    async function AddphotoByLink(e) {
        e.preventDefault();
        if (!photoLink) {
            return null;
        } else {
            try {
                const { data: filename } = await axios.post("http://localhost:3001/upload-by-link", { link: photoLink })
                setImages(prev => {
                    return [...prev, filename];
                })
                setphotoLink('')
            } catch (error) {
                console.error(error);
            }
        }
    }


    async function DeletePhotoByLink(link, index) {
        const response = await axios.delete(`http://localhost:3001/delete-photo/${link}`)
        console.log(response)
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    }

    async function DeletePhotoByLinkEdit(link, index) {
        const response = await axios.delete(`http://localhost:3001/delete-photo/${id}/${link}`)
        console.log(response)
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    }

    async function Addphoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        const { data: filenames } = await axios.post("http://localhost:3001/upload", data, {
            headers: { "Content-type": "multipart/form-data" }
        });
        setImages(prev => {
            return [...prev, ...filenames];
        })
    };

    useEffect(() => {
        if (isEdit) {
            setImages(place?.images);
        }
    }, [])

    useEffect(() => {
        if (images?.length >= 4) {
            document.querySelector(".error-msg").classList.remove("show-error-msg")
        }
    }, [images])

 

    return (
        <form action="" className='img_upload_container'>

            <div className='UPimage'>

                <div className='uploadby_link'>
                    <div className=''>
                        <input type="text" placeholder='Add using a link' className='image-upload-input' value={photoLink} onChange={handlephotoLinkChange} />
                        <p className='error-msg'>Upload atleast 4 images</p>
                    </div>

                    <button onClick={AddphotoByLink}>Add photo</button>
                </div>


                <div className='uploadby_file'>
                    <input type="file" accept='image/*' multiple hidden className='image_input' onChange={Addphoto} />
                    <div className='upload_container' onClick={() => document.querySelector(".image_input").click()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        <h3>Upload</h3>
                    </div>


                    {images.length > 0 && images.map((link, index) => (
                        <div className='image_showcase' key={index}>
                            <Image src={link} alt="" />
                            {isEdit ? <svg onClick={() => DeletePhotoByLinkEdit(link, index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 del">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg> : <svg onClick={() => DeletePhotoByLink(link, index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 del">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>}
                        </div>
                    ))}
                </div>

            </div>

            <Group position="center" mt="xl">
                {active > 0 && <Button style={{ marginBottom: "1rem" }} variant="default" onClick={prevStep}>Back</Button>}
                <Button color="orange" style={{ marginBottom: "1rem" }} onClick={nextStep}>{active == 3 ? "Add Place" : "Next Step"}</Button>
            </Group>

        </form>
    )
}

export default UPimages