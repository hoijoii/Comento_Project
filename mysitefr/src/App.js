import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import './App.css';


function App() { 
  const [token] = useCookies(['mytoken'])
  let navigate = useNavigate()

  useEffect(()=>{
    if(!token['mytoken']){
        navigate('/')
        //window.location.href='/'
    }
  },[token])

  return (
    <div className="App">   
      
    </div>
  );
}

export default App;