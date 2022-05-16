import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

const Detail = () => {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [token] = useCookies(["mytoken"]);
  const { id } = useParams();
  const navigate = useNavigate();

  const userIdContext = useContext(UserContext);

  console.log(userIdContext);

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
      </div>
      <button
        onClick={() => {
          navigate(`/updating/${id}`);
        }}
        className="btn btn-success"
      >
        수정
      </button>
    </div>
  );
};

export default Detail;