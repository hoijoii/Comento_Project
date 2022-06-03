import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./filelist.css";

const FileList = ({ postId }) => {
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [token] = useCookies("mytoken");

  /*
  const fileUploader = () => {
    users.map((user) => {
        if (user.id === file.uploader)
    });
  };
  */

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/account/users/`)
      .then((resp) => setUsers(resp.data))
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/files/`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      })
      .then((resp) => setFiles(resp.data))
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <div className="fileTable">
      <Table responsive>
        <thead className="head">
          <tr>
            <th>제목</th>
            <th>업로드 날짜</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => {
            if (file.post === JSON.parse(postId)) {
              return (
                <tr key={file.id}>
                  <td>{file.title}</td>
                  <td>{file.upload_at}</td>
                  <td className="bodyUser">
                    {users.map((user) => {
                      if (user.id === file.uploader) {
                        return user.realname;
                      }
                    })}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default FileList;