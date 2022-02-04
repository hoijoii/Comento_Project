import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'
import './detail.css'
import APIService from '../APIService'
import Uploadform from './Uploadform'
import Navbars from '../components/Navbars'
import {useCookies} from 'react-cookie';

const Detail = () => {

  const {id} = useParams()

  const [post, setPost] = useState([])
  const [files, setFiles] =useState([])
  const [token] = useCookies(['mytoken'])

  let navigate = useNavigate()

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      'method':'GET',
      headers: {
        'Authorization' : `Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp=>setPost(resp))
    .catch(error => console.log(error))
  }, [])
  
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/files/', {
      'method':'GET',
      headers: {
        'Content-Type':'application',
        'Authorization' : `Token ${token['mytoken']}`,
      }
    })
    .then(resp => resp.json())
    .then(resp=>setFiles(resp))
    .catch(error => console.log(error))
  }, [])
  
  files.sort((a, b)=> b.id - a.id)

  return (
    <div className='detail'>
      <Navbars/>
      <div className='path'>
        <br/>
        Board App Project {'>'} 문서게시판
      </div>
      <div className='detailTop'>
        <span className='detailTitle'>{post.title}</span>
        <span className='detailDate'> (기간 : {post.startDay}~{post.endDay})</span> 
        <br/>
        <br/>
        <span className='detailWriter'>{post.writer} ㅣ {post.created_at}</span>      
        <br/>
        <br/>
      </div>
      <hr className='hrclass'/>
      <br/>
      <br/>
      <div className='detailBottom'>
        <span className='detailDescription'>{post.description}</span>  
        <br/>
        <br/>
      </div>
      <hr className='hrclass'/>

      <div className='detailbtns'>
        <Link to={`/updateform/${post.id}`}>
          <button className='detailBtnUpdate'>수정</button>
        </Link>

        <Link to='/doc'>
          <button onClick={()=>APIService.DeletePost(post.id, token['mytoken'])} className='detailBtnDelete'>삭제</button>
        </Link>

        <button className='detailBtnRequest'>문서요청하기</button>
        <br/>
        <Uploadform postid={post.id}/>
      </div>
      <br/>
      <br/>

      <div className='detailFiles'>
        <table className='detailFilesTable'>
          <thead>
            <tr>
              <th scope='col'> </th>
              <th scope='col'> </th>
              <th scope='col'> </th>
            </tr>
          </thead>
          <tbody>
            {files.map(file=>
              <tr key={file.id}>
                <td scope='row'>{file.upload_at.substring(10, 0)}</td>
                <td className='fileTitle'>{file.title}</td>
                <td>{file.uploader}(회사번호)</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Detail;
