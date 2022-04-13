import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import { Button } from "reactstrap";
import './login.css';

function Login() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [realname, setRealname] = useState('')
    const [companyCode, setCompanyCode] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    let navigate = useNavigate()

    const loginBtn = ()=>{
        APIService.LoginUser({username, password})
        .then(resp=>setToken('mytoken', resp.token))
        .catch(error=>console.log(error))
    }

    const RegisterBtn = () => {
        APIService.RegisterUser({email, password, realname, companyCode})
        .then(()=>loginBtn)
        .catch(error=>console.log(error))
      }

    useEffect(()=>{
        if(token['mytoken']){
            navigate('/home')
        }
    },[token])

  return (
    <div className='LoginForm'>
        <br/>
        <br/>
        {isLogin ? <h1>Login Page</h1> : <h1>Register Page</h1>}
        <br/>
        <br/>
        

        {isLogin ? 
        
        <div>
            <div className='mb-3'>
                <label htmlFor = "username" className='form-label'>Email</label>
                <input type="text" className='textForm form-control' id="username" placeholder='Enter Email' 
                value = {username} onChange = {e=>setUsername(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor = "password" className='form-label'>Password</label>
                <input type="password" className='textForm form-control' 
                id="password" placeholder='Enter Password' 
                value = {password} onChange = {e=>setPassword(e.target.value)}
                />
            </div>
            <Button block color="secondary" size="lg" type='button' onClick={loginBtn} className='loginbutton'>
                Login</Button> 
        </div>
        
        
      : 
      <div>
          <div className='mb-3'>
                <label htmlFor = "email" className='form-label'>이메일</label>
                <input type="email" className='textForm form-control' id="email" placeholder='Enter Email' 
                value = {email} onChange = {e=>setEmail(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor = "password" className='form-label'>비밀번호</label>
                <input type="password" className='textForm form-control' 
                id="password" placeholder='Enter Password' 
                value = {password} onChange = {e=>setPassword(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor = "name" className='form-label'>이름</label>
                <input type="text" className='textForm form-control' 
                id="realname" placeholder='Enter Your Realname' 
                value = {realname} onChange = {e=>setRealname(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor = "code" className='form-label'>회사코드</label>
                <input type="text" className='textForm form-control' 
                id="companyCode" placeholder='Enter Your Company Code' 
                value = {companyCode} onChange = {e=>setCompanyCode(e.target.value)}
                />
            </div>
            <Button block color="secondary" size="lg" type='button' onClick={RegisterBtn} className='loginbutton'>
                Register</Button>
      </div>
      }

        <div className='mb-3'>
        <br/>
        {isLogin ? <h6>If You Don't have Account, Please <Button color="default" size="sm" type="button" className='smButton' onClick={()=>setLogin(false)}>Register</Button> Here.</h6>
        : <h6>If You Have Account, Please <Button color="default" size="sm" type="button" className='smButton' onClick={()=>setLogin(true)}>Login</Button> Here.
        </h6>}
        </div>

    </div>
  )
}

export default Login
