import React from 'react'

function Button({ onClick, text }) {
  return (
    <button onClick={onClick} className='py-[10px] px-[25px] rounded-3xl bg-red text-[#ffffff] uppercase font-bold hover:bg-blue transition-all'>
      {text}
    </button>
  )
}

export default Button