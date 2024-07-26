import React from 'react'
import rasim from '../assets/Image.svg'
import './Data.css'

const Header = () => {
  return (
    <div className='container'>
       <div className='navbar'>
       <img  className='weather' src={rasim} alt="" />
     <h1 className='weatherr'>weather</h1>
       </div>
    </div>
  )
}

export default Header