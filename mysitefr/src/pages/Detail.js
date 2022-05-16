import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom'
import './detail.css'
import APIService from '../APIService'
import Uploadform from './Uploadform'
import Navbars from '../components/Navbars'
import {useCookies} from 'react-cookie'
import Statistics from '../components/Statistics'
import { Button } from "reactstrap";

const Detail = () => {

  const {id} = useParams()

  const [post, setPost] = useState([])
  const [excelData, setExcelData] =useState([])
  const [isStatistics, setIsStatistics] = useState(true)
  const [token] = useCookies(['mytoken'])

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
    fetch('http://127.0.0.1:8000/filedata/', {
      'method':'GET',
      headers: {
        'Content-Type':'application',
        'Authorization' : `Token ${token['mytoken']}`,
      }
    })
    .then(resp => resp.json())
    .then(resp=>setExcelData(resp))
    .catch(error => console.log(error))
  }, [])

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
        <br/>
        <span className='detailDescription'>{post.description}</span>  
        <br/>
      </div>

      <span className='detailattach'>엑셀 양식.xlsx</span>
      <br/>
      <br/>
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
      <br/>


      <div className='DocModeButton'>
        <button className='modeButton' onClick={()=>setIsStatistics(true)}>전체자료</button>
        <button className='modeButton' onClick={()=>setIsStatistics(false)}>통계자료</button>
      </div>

      {isStatistics ? <div className='detailExcelDatas'>
        <table className='detailExcelDatasTable'>
          <thead className='detailExcelDataThead'>
            <tr>
              <th scope='col'>회사번호</th>
              <th scope='col'>회사명</th>
              <th scope='col'>업종</th>
              <th scope='col'>결산월일</th>
              <th scope='col'>매출액</th>
              <th scope='col'>영업이익</th>
              <th scope='col'>순이익</th>
            </tr>
          </thead>
          <tbody>
            {excelData.map(data=>
              <tr key={data.id}>
                <td scope='row' className='detailExcelDataTbody'>{data.companyCode}</td>
                <td className='detailExcelDataTbody'>{data.companyName}</td>
                <td className='detailExcelDataTbody'>{data.classification}</td>
                <td className='detailExcelDataTbody'>{data.closingMonth}</td>
                <td className='detailExcelDataTbody'>{data.revenue}</td>
                <td className='detailExcelDataTbody'>{data.operatingIncome}</td>
                <td className='detailExcelDataTbody'>{data.netIncome}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    :
      <div className='detailExcelDatas'>
        <Statistics excelData = {excelData} />

    </div>
    }

      
    </div>
  )
}

export default Detail;
