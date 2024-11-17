import React from 'react'
import logo from "../assets/frontier-logo.svg"
import Button from './Button'

function Nav({ signOut }) {
  return (
    <header className='bg-red w-full px-12 py-8 top-0 fixed'>
      <div className='flex justify-between'>
      <img src={logo} />
      <Button onClick={signOut} text={"Log Out"}/>

      </div>
      

    </header>
  )
}

export default Nav