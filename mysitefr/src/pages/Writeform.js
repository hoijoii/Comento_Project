import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import {Link} from 'react-router-dom'
import Navbars from '../components/Navbars'
import {useCookies} from 'react-cookie';

function Writeform() {

    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [startDay, setStartDay] = useState(new Date())
    const [endDay, setEndDay] = useState(new Date())
    const [writer, setWriter] = useState([])
    const [token] = useCookies(['mytoken'])


    const insertPost = () =>{
        APIService.InsertPost({title, description, writer, startDay, endDay}, token['mytoken'])
        .then(resp=>console.log(resp))
    }


  return (
    <div>
      <Navbars/>
        <>
          <div className='path'>
          <br/>
          Board App Project {'>'} 문서게시판
        </div>
        <div className='form'>
          <div className='mb-3'>
            <label htmlFor='title' className='textForm form-label'>제목</label>
            <input type='text' className='form-control' placeholder='Title' 
               value={title || ''} onChange={e=>setTitle(e.target.value)}
            />

            <label htmlFor='title' className='textForm form-label'>본문</label>
            <textarea className='form-control' id='description' rows='5'
              value = {description || ''} onChange={e=>setDescription(e.target.value)}>
            </textarea>

            <label htmlFor='title' className='textForm form-label'>작성자</label>
            <input type='text' className='form-control' placeholder='작성자' 
              value = {writer || ''} onChange={e=>setWriter(e.target.value)}
            />

            <label htmlFor='title' className='textForm form-label'>취합기간</label>
            <input type='date' className='form-control' placeholder='시작 날짜' 
              value = {startDay || ''} onChange={e=>setStartDay(e.target.value)}
            />
            <label htmlFor='title' className='textForm form-label'>~</label>
            <input type='date' className='form-control' placeholder='시작 날짜' 
              value = {endDay || ''} onChange={e=>setEndDay(e.target.value)}
            />
            
            <br/>
            <Link to={`/doc/`}>
            <button onClick={insertPost} className='btn btn-success'>올리기</button>
            </Link>
          </div>
        </div>
        </>
    </div>
  )
}

export default Writeform
