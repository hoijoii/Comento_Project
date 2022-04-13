import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie';
import APIService from '../APIService';


function Uploadform(props) {

    const {_id} = props

    const [excelFile, setExcelFile] = useState(null)

    const onExcelFileChange = e=>setExcelFile(e.target.files[0])

    const [token] = useCookies(['mytoken'])
{/*
    const UploadExcelFile = () =>{
        APIService.UploadExcel(excelFile, token['mytoken'])
        .then(resp=>console.log(resp))
    }
*/}

    const newExcelFile = async () =>{
        const uploadData = new FormData()
        uploadData.append('excelFile', excelFile)

        try {
            return await axios.post(
                'http://127.0.0.1:8000/filedata/', uploadData,
                {
                    headers: {   
                        Authorization : `Token ${token}`
                    },
                }
            )
        } catch(e) {
            return e.response ? e.response : e
        }
    }

    
    
  return (
    <div>
        <br/>
        <br/>
        <br/>
        <input type="file" className='fileform form-control' placeholder='file' onChange={onExcelFileChange}/>
        <button onClick={newExcelFile} className='detailBtnUpload'>업로드</button>
        <br/>
    </div>
  )
}

export default Uploadform
