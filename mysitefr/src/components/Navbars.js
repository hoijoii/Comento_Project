import React from "react";
import { Link } from "react-router-dom";
import "./navbars.css";
import {NavbarData} from "./NavbarData";
import {useCookies} from 'react-cookie';


function Navbars() {

  const [token, setToken, removeToken] = useCookies(['mytoken'])

  const logoutBtn = () => {
    removeToken(token['mytoken'])
  }

  return (
    <>
    
      <div className="navbar"></div>
      <nav className="nav-menu">
        
        <div className="nav-menu-items">
          <Link to='/mypage'>
            <i className="profile fas fa-user-circle"></i>
          </Link>
          {
            NavbarData.map(item =>{
              return(
                <div key={item.id} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </div>
              )
            })
          }
          
          <span className="nav-menu-bottom" onClick={()=>logoutBtn}>LOGOUT</span>
          
        </div>

      </nav>
    </>
  )
}

export default Navbars
