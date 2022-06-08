import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const FileDownload = ({ fileId }) => {
  const [fileData, setFileData] = useState("");
  const saveFile = async () => {
    return await axios
      .get(`http://127.0.0.1:8000/api/files/${fileId}`, {
        headers: {
          "Content-Type": "application/xls",
          //Authorization: `Token ${token["mytoken"]}`,
        },
      })
      .then((resp) => setFileData(resp.data))
      /*
      .then((resp) => {
        console.log(resp.data);
        resp.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "file.xlsx";
          a.click();
        });
      })*/
      .catch((Error) => {
        console.log(Error);
      });
  };
  return (
    <div>
      <button onClick={saveFile}>다운로드</button>
    </div>
  );
};

export default FileDownload;
