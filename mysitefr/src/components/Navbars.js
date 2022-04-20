import React from "react";
import { Link } from "react-router-dom";
import "./navbars.css";
import {useCookies} from 'react-cookie';


function Navbars() {

  const [token, setToken, removeToken] = useCookies(['mytoken'])

  const logoutBtn = () => {
    removeToken(token['mytoken'])
  }

  return (
    <>
      <nav className="nav-menu">
        <div className="nav-menu-items">

          <ul>
            <li><Link to="/home">HOME</Link></li>
            <li><Link to="/doc">문서게시판</Link></li>
          </ul>

          {/*
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
           */}
          
          <span className="nav-menu-bottom" onClick={()=>logoutBtn}>LOGOUT</span>
          
        </div>

      </nav>
    </>
  )
}

export default Navbars