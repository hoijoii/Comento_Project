import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbars.css";
import {NavbarData} from "./NavbarData";
import {useCookies} from 'react-cookie';
import { Button } from "reactstrap";


function Navbars() {

  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let navigate = useNavigate()

  const logoutBtn = () => {
    removeToken(['mytoken'])
    navigate("/")

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
          
          <Button color="default" size="sm" type='button' className="nav-menu-bottom" onClick={logoutBtn}>LOGOUT</Button>
          
        </div>

      </nav>
    </>
  )
}

export default Navbars
