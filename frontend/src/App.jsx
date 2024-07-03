import React,{ useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import ClientPage from './pages/ClientPage/ClientPage'
import Contractor from './pages/Contractor/Contractor'
import Worker from './pages/Worker/Worker'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <> 
      {showLogin?<LoginPopup setShowLogin ={setShowLogin} />:<></>} 
        <div className='app'>
          <Navbar  setShowLogin ={setShowLogin} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/client/:id' element={<ClientPage />} />
            <Route path='/contractor/:id' element={<Contractor />} />
            <Route path='/worker/:id' element={<Worker />} />
          </Routes>
        </div>
      <Footer/>
    </>
  );
};

export default App
