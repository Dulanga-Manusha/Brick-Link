import { createContext ,useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = 'http://localhost:5000'
    const [token,setToken] = useState('');

    // Get token from local storage when refreshing the page to prevent logout
    useEffect(() => {
      async function loadData(){
        if(localStorage.getItem('token')){
          setToken(localStorage.getItem('token'));
        }
      }
      loadData();
    },[]);

    const contextValue = {
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;