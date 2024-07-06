import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
// import { Link, useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");



    function handleMenu(e) {
        const newMenu = e.target.innerHTML.toLowerCase();
        setMenu(newMenu);
    }


    // const logout = () => {
    //     localStorage.removeItem('token');
    //     setToken('');
    //     navigate('/');
    // }


  return (
    <div className='navbar'>
        <img src={assets.logo} alt='logo' className='logo' />
        <ul className='navbar-menu'>
            <a href='#home' onClick={handleMenu} className={menu==="home"?"active":""}>home</a>
            <a href='#services' onClick={handleMenu} className={menu==="our-services"?"active":""}>our-services</a>
            <a href='#app-download' onClick={handleMenu} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={handleMenu} className={menu==="contact us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt=''/>
            <div className='navbar-search-icon'>
                
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign In</button>
            {/* {
                !token ? <button onClick={() =>setShowLogin(true)}>sign in</button>
                :<div className='navbar-profile'>
                    <img src = {assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <li ><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
                        <hr />
                        <li ><img src={assets.logout_icon}  alt=''/><p>Logout</p></li>
                    </ul>
                </div>
            } */}
            
            
        </div>
    </div>  
  )
}

export default Navbar;
