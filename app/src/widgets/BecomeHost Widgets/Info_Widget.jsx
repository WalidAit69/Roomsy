import React from 'react'
import { Link } from 'react-router-dom'
import "./Info_Widget.css"

function Info_Widget({title , description , link}) {
  return (
    <div className='Info_Widget'>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link>{link}</Link>
    </div>
  )
}

export default Info_Widget