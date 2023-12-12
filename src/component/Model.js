import React, { useState } from 'react'
import './Model.css'
import {MdOutlineCancel} from 'react-icons/md'
function Model(props) {
    const active = useState(props.active)
  return (
    <div className={active ? 'Model-popup active' : 'Model-popup'}>
      <h1>{props.title}</h1>
      <MdOutlineCancel className='icon-cancel' onClick={()=>{props.callback(false)}}/>
    </div>
  )
}

export default Model
