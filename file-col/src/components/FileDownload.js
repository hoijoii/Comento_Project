import React, { useState } from "react";
import axios from "axios";
//import fileDownload from "js-file-download";

const FileDownload = ({ fileId }) => {
  const [fileData, setFileData] = useState("");
  const saveFile = async () => {
    return await axios
      .get(`http://127.0.0.1:8000/api/files/${fileId}`, {
        headers: {
          "Content-Type": "application/xlsx",
          //Authorization: `Token ${token["mytoken"]}`,
        },
      })
      .then((resp) => {
        //fileDownload(resp.data.files, resp.data.title);
      })
      /*
      .then((resp) => {
        console.log(resp.data.files);
        resp.data.files.blob().then((blob) => {
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
      <button onClick={saveFile}>다운</button>
    </div>
  );
};

export default FileDownload;
