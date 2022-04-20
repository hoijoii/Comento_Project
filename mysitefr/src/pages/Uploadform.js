import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie';
<<<<<<< HEAD
import APIService from '../APIService';
=======
>>>>>>> develop


function Uploadform(props) {

    const {_id} = props

<<<<<<< HEAD
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
=======
    const [title, setTitle] = useState("")
    const [files, setFiles] = useState(null)
    const [uploader, setUploader] = useState(null)

    const onTitleChange = e=>setTitle(e.target.value)
    const onFileChange = e=>setFiles(e.target.files[0])
    const onUploaderChange = e=>setUploader(e.target.value)
    const [token] = useCookies(['mytoken'])

    const newDocCol = async () =>{
        const uploadData = new FormData()
        uploadData.append('title', title)
        uploadData.append('files', files)
        uploadData.append('uploader', uploader)

        try {
            return await axios.post(
                'http://127.0.0.1:8000/api/files/', uploadData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization' : `Token ${token['mytoken']}`
>>>>>>> develop
                    },
                }
            )
        } catch(e) {
            return e.response ? e.response : e
        }
    }
<<<<<<< HEAD

    
=======
>>>>>>> develop
    
  return (
    <div>
        <br/>
        <br/>
        <br/>
<<<<<<< HEAD
        <input type="file" className='fileform form-control' placeholder='file' onChange={onExcelFileChange}/>
        <button onClick={newExcelFile} className='detailBtnUpload'>업로드</button>
        <br/>
=======
            <input type="file" placeholder='file' onChange={onFileChange}/>
            
            <br/>
            <div>
            <input type="text" placeholder='Description' value={title || ''}
            onChange={onTitleChange} />
            <input type="text" placeholder='uploader' value={uploader || ''} onChange={onUploaderChange}/>
            <br/>
            <button onClick={newDocCol} className='detailBtnUpload'>업로드</button>
            </div>
>>>>>>> develop
    </div>
  )
}

export default Uploadform
