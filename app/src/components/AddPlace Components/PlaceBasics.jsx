import { Button, Group } from '@mantine/core'
import React, { useEffect } from 'react'

function PlaceBasics({
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    extrainfo,
    setExtrainfo,
    active,
    setActive,
    isEdit,
    place
}) {

    const nextStep = () => {
        if (!isEdit) {
            if (title.length < 3) {
                document.querySelector(".title").classList.add("error")
                document.querySelector(".error-msg-title").classList.add("show-error-msg")
            }
            if (description.length < 10) {
                document.querySelector(".desc").classList.add("error")
                document.querySelector(".error-msg-desc").classList.add("show-error-msg")
            }
            if (price < 10) {
                document.querySelector(".price").classList.add("error")
                document.querySelector(".error-msg-price").classList.add("show-error-msg")
            }
            if (title.length >= 3 && description.length >= 10 && price >= 10) {
                setActive((current) => (current < 4 ? current + 1 : current))
            }
        } else { setActive((current) => (current < 5 ? current + 1 : current)) }
    };

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        if (title.length >= 3) {
            document.querySelector(".title").classList.remove("error")
            document.querySelector(".error-msg-title").classList.remove("show-error-msg")
        }
        if (description.length >= 10) {
            document.querySelector(".desc").classList.remove("error")
            document.querySelector(".error-msg-desc").classList.remove("show-error-msg")
        }
    }, [title, description])

    useEffect(() => {
        if (price >= 10) {
            document.querySelector(".price").classList.remove("error")
            document.querySelector(".error-msg-price").classList.remove("show-error-msg")
        }
    }, [price])


    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handlePriceChange = (event) => setPrice(parseFloat(event.target.value));
    const handleExtrainfoChange = (event) => setExtrainfo(event.target.value);


    return (
        <form action="">
            <div className='PlaceBasics form'>

                <div>
                    <label htmlFor="title">Title <span>*</span></label>
                    <input
                        placeholder='Property Name'
                        name='title'
                        id='title'
                        className='location_inputs title'
                        onChange={handleTitleChange}
                        value={title}
                    ></input>
                    <p className='error-msg error-msg-title'>Must have atleast 3 characters</p>
                </div>

                <div>
                    <label htmlFor="description">Description <span>*</span></label>
                    <textarea
                        placeholder='Describe your property in detail'
                        name='description'
                        id='description'
                        className='location_inputs desc'
                        onChange={handleDescriptionChange}
                        value={description}
                    ></textarea>
                    <p className='error-msg error-msg-desc'>Must have atleast 10 characters</p>
                </div>

                <div>
                    <label htmlFor="price">Price <span>*</span></label>
                    <input
                        placeholder='100$'
                        type='number'
                        name='price'
                        id='price'
                        className='location_inputs price'
                        onChange={handlePriceChange}
                        value={price}
                        min={0}
                    ></input>
                    <p className='error-msg error-msg-price'>Must have atleast 2 digits</p>
                </div>

                <div>
                    <label htmlFor="extrainfo">Extra Info</label>
                    <textarea
                        placeholder='House rules , etc...'
                        name='extrainfo'
                        id='extrainfo'
                        className='location_inputs'
                        onChange={handleExtrainfoChange}
                        value={extrainfo}
                    ></textarea>
                </div>

            </div>

            <Group position="center" mt="xl" className='AddPlace_btn'>
                {active > 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
                <Button color="orange" onClick={nextStep}>{active == 4 ? "Add Place" : "Next Step"}</Button>
            </Group>

        </form>
    )
}

export default PlaceBasics