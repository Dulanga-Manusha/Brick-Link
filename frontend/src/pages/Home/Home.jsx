import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import OurServices from '../../components/OurServices/OurServices'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  return (
    <div>
      <Header />
        <OurServices />
        <AppDownload />
    </div>
  )
}

export default Home

