import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import UploadForm from "../components/UploadForm";
import FileList from "../components/FileList";

const Detail = () => {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [token] = useCookies(["mytoken"]);
  const { id } = useParams();
  const navigate = useNavigate();

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
      .get(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      })
      .then((resp) => setPost(resp.data))
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  const deletePost = async () => {
    try {
      return await axios.delete(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="detailTop">
        <h1 className="detailTopTitle">{post.title}</h1>
        <div className="detailTopInfo">
          <div className="detailTopInfoPeriod">
            {post.startDay}~{post.endDay}
          </div>
          <div className="detailTopInfoFrom">
            {users.map((user) => {
              if (user.id === post.writer) {
                return user.realname;
              }
            })}{" "}
            | {post.created_at}
          </div>
        </div>
      </div>

      <div className="detailBody">
        <p>{post.description}</p>
        {JSON.parse(localStorage.userId) === post.writer ? (
          <div>
            <button
              onClick={() => {
                navigate(`/updating/${id}`);
              }}
              className="btn btn-success"
            >
              수정
            </button>
            <button
              onClick={() => {
                navigate("/");
                deletePost();
              }}
              className="btn btn-success"
            >
              삭제
            </button>
          </div>
        ) : (
          <div></div>
        )}

        <button
          onClick={() => {
            navigate(`/home`);
          }}
          className="btn btn-success"
        >
          이전
        </button>
      </div>

      <hr />

      <div className="detail">
        <UploadForm postId={id} />
      </div>

      <div className="fileList">
        <FileList postId={id} />
      </div>
    </div>
  );
};

export default Detail;
