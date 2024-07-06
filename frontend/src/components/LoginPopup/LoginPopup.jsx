import React, { useContext, useEffect, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPopup = ({setShowLogin}) => {
    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""  // Default role
    });
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Invalid token', error);
            return null;
        }
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currentState === "Login") {
            newUrl += '/api/user/login';
        } else {
            newUrl += '/api/user/register';
        }
        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);

            const tokenData = parseJwt(response.data.token);
            if (!tokenData) {
                alert('Invalid token received');
                return;
            }
            const userRole = tokenData.role;
            const userId = tokenData.id;

            if (userRole === 'client') {
                navigate(`/client/${userId}`, { state: { userId, userRole } });
            } else if (userRole === 'contractor') {
                navigate(`/contractor/${userId}`, { state: { userId, userRole } });
            } else if (userRole === 'worker') {
                navigate(`/worker/${userId}` , { state: { userId, userRole } });
            }
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    }

    useEffect(() => {
        console.log(data);
    },[data])

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
                {currentState === "Sign Up" &&
                    <select name='role' onChange={onChangeHandler} value={data.role} required>
                        <option value="" disabled>Select</option>
                        <option value="client">Client</option>
                        <option value="contractor">Contractor</option>
                        <option value="worker">Worker</option>
                    </select>
                    }
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input className='check' type="checkbox" required/>

                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currentState==="Login"? 
                <p>Create a new account? <span onClick ={()=>setCurrentState("Sign Up")}>Click here</span></p>:
                <p>Already have an account? <span onClick ={()=>setCurrentState("Login")}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup
