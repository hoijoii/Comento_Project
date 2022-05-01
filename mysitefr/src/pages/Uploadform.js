import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import APIService from "../APIService";

const Uploadform = () => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState(null);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onFileChange = (e) => setFiles(e.target.files[0]);
  const [token] = useCookies(["mytoken"]);

  const newDoc = async () => {
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("files", files);

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
      <br />
      <br />
      <br />
      <input type="file" placeholder="file" onChange={onFileChange} />

      <br />
      <div>
        <input
          type="text"
          placeholder="Description"
          value={title || ""}
          onChange={onTitleChange}
        />
        <br />
        <button onClick={newDoc} className="detailBtnUpload">
          업로드
        </button>
      </div>
    </div>
  );
};

export default Uploadform;
