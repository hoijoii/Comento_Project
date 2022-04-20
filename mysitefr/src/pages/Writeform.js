import React, {useState, useEffect} from 'react'
import APIService from '../APIService'
import {Link} from 'react-router-dom'
import Navbars from '../components/Navbars'
import {useCookies} from 'react-cookie';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> develop

function Writeform() {

    const [title, setTitle] = useState([])
    const [description, setDescription] = useState([])
    const [startDay, setStartDay] = useState(new Date())
    const [endDay, setEndDay] = useState(new Date())
    const [writer, setWriter] = useState([])
<<<<<<< HEAD
    const [formfile, setFormfile] = useState([])
    const [token] = useCookies(['mytoken'])

    const onTitleChange = e=>setTitle(e.target.value)
    const onDescriptionChange = e=>setDescription(e.target.value)
    const onStartDayChange = e=>setStartDay(e.target.value)
    const onEndDayChange = e=>setEndDay(e.target.value)
    const onWriterChange = e=>setWriter(e.target.value)
    const onFormFileChange = e=>setFormfile(e.target.files[0])

{/*
    const insertPost = () =>{
        APIService.InsertPost({title, description, writer, startDay, endDay, formfile}, token['mytoken'])
        .then(resp=>console.log(resp))
        //APIService.InsertAttachment({formfile}, token['mytoken'])
        //.then(resp=>console.log(resp))
    }
     */}

     const insertPost = async () => {
      const formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("writer", writer)
      formData.append("startDay", startDay)
      formData.append("endDay", endDay)
      formData.append("formfile", formfile)

      try {
        return await axios.post("http://127.0.0.1:8000/api/posts/", formData, 
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`,

          }
        })
      } catch(e){ return e.response ? e.response : e}
=======
    const [token] = useCookies(['mytoken'])


    const insertPost = () =>{
        APIService.InsertPost({title, description, writer, startDay, endDay}, token['mytoken'])
        .then(resp=>console.log(resp))
>>>>>>> develop
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
<<<<<<< HEAD
               value={title || ''} onChange={onTitleChange}
=======
               value={title || ''} onChange={e=>setTitle(e.target.value)}
>>>>>>> develop
            />

            <label htmlFor='title' className='textForm form-label'>본문</label>
            <textarea className='form-control' id='description' rows='5'
<<<<<<< HEAD
              value = {description || ''} onChange={onDescriptionChange}>
=======
              value = {description || ''} onChange={e=>setDescription(e.target.value)}>
>>>>>>> develop
            </textarea>

            <label htmlFor='title' className='textForm form-label'>작성자</label>
            <input type='text' className='form-control' placeholder='작성자' 
<<<<<<< HEAD
              value = {writer || ''} onChange={onWriterChange}
=======
              value = {writer || ''} onChange={e=>setWriter(e.target.value)}
>>>>>>> develop
            />

            <label htmlFor='title' className='textForm form-label'>취합기간</label>
            <input type='date' className='form-control' placeholder='시작 날짜' 
<<<<<<< HEAD
              value = {startDay || ''} onChange={onStartDayChange}
            />
            <label htmlFor='title' className='textForm form-label'>~</label>
            <input type='date' className='form-control' placeholder='시작 날짜' 
              value = {endDay || ''} onChange={onEndDayChange}
            />

            <label htmlFor='title' className='textForm form-label'>첨부문서</label>
            <input type='file' className='form-control'
             onChange={onFormFileChange}
=======
              value = {startDay || ''} onChange={e=>setStartDay(e.target.value)}
            />
            <label htmlFor='title' className='textForm form-label'>~</label>
            <input type='date' className='form-control' placeholder='시작 날짜' 
              value = {endDay || ''} onChange={e=>setEndDay(e.target.value)}
>>>>>>> develop
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
