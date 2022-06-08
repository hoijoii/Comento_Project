import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const UploadForm = ({ postId }) => {
  const [users, setUsers] = useState([]);
  const [uploader, setUploader] = useState("");
  const [token] = useCookies(["mytoken"]);
  const [files, setFiles] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
  });

  const { title, description } = state;

  const onFileChange = (e) => setFiles(e.target.files[0]);

  const onChange = (e) => {
    dispatch(e.target);
  };

  //let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/account/users/`)
      .then((resp) => setUsers(resp.data))
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    searchUploader();
  });

  const searchUploader = () => {
    users.map((user) => {
      if (user.id === JSON.parse(localStorage.userId)) {
        setUploader(user.id);
      }
    });
  };

  const uploadFilePost = async () => {
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("description", description);
    uploadData.append("files", files);
    uploadData.append("uploader", uploader);
    uploadData.append("post", postId);

    try {
      return await axios.post("http://127.0.0.1:8000/api/files/", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token["mytoken"]}`,
        },
      });
    } catch (e) {
      return e.response ? e.response : e;
    }
  };

  return (
    <div>
      <div className="textForm mb-3">
        <input
          name="title"
          type="text"
          className="form-control"
          placeholder="제목"
          value={title}
          onChange={onChange}
        />
        <textarea
          name="description"
          type="text"
          className="form-control"
          placeholder="본문"
          value={description}
          onChange={onChange}
        />
        <input type="file" className="form-control" onChange={onFileChange} />
      </div>
      <div>
        <button className="btn btn-success" onClick={uploadFilePost}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
