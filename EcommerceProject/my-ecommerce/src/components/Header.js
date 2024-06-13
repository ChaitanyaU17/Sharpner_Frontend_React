import React from 'react'

const Header = () => {
  return (
    <div className="bg-black " style={{ height: "55px" }}>
      <div className='d-flex justify-content-evenly align-items-center pt-2 text-white'>
        <p>HOME</p>
        <p>STORE</p>
        <p>ABOUT</p>
        <button className='border border-primary rounded bg-black text-white'>cart</button>
      </div>
      
    </div>
  );
}

export default Header
