import React from 'react'

export default class APIService {
    static UpdatePost(post_id, body, token){

  return fetch(`http://127.0.0.1:8000/api/posts/${post_id}/`, {
      'method':'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`
    
      },
      body:JSON.stringify(body)
    }).then(resp=>resp.json())
    }

    static InsertPost(body, token) {
        return fetch('http://127.0.0.1:8000/api/posts/', {
            'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`
            },
        body: JSON.stringify(body)
        })
    .then(resp => resp.json())
    }

    static InsertAttachment(file, token) {
        return fetch('http://127.0.0.1:8000/api/posts/', {
            'method':'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : `Token ${token}`
            },
        body: file
        })
    .then(resp => resp.json())
    }
    
    static DeletePost(post_id, token) {
        return fetch(`http://127.0.0.1:8000/api/posts/${post_id}`, {
            'method':'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${token}`
            }
        })
    }

    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/auth/', {
            'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        
        },
        body:JSON.stringify(body)

        }).then(resp => resp.json())
    }

    static RegisterUser(body) {
        return fetch('http://127.0.0.1:8000/api/users/', {
            'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        
        },
        body:JSON.stringify(body)

        }).then(resp => resp.json())
    }

    static UploadExcel(file, token) {
        return fetch('http://127.0.0.1:8000/filedata/', {
            'method':'POST',
            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `Token ${token}`
                    },
            body: file,    
        }).then(resp => console.log("response:", resp))
        .catch(error=>console.log(error))
    }
}
