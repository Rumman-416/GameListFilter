import React from 'react'
import Navbar from './components/Navbar'
import MainContainer from './components/MainContainer'

const LayoutIndex = () => {
  return (
    <div className='bg-gradient-to-b from-[#081221] to-[#03080f] w-full min-h-[100vh] text-[#fff] font-mulish'>
        <div className=''>
        <Navbar/>
        <MainContainer/>
    </div>
    </div>
  )
}

export default LayoutIndex