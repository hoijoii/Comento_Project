import { useState, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const UpdateForm = () => {
  const { id } = useParams();
  const [token] = useCookies(["mytoken"]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [startDay, setStartDay] = useState(post.startDay);
  const [endDay, setEndDay] = useState(post.endDay);
  const [writer, setWriter] = useState(post.writer);

  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/account/users/`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      })
      .then((resp) => setUsers(resp.data))
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
    setStartDay(post.startDay);
    setEndDay(post.endDay);
    setWriter(post.writer);
  }, [post]);

  useEffect(() => {
    searchWriter();
  });

  const searchWriter = () => {
    users.map((user) => {
      if (user.id === JSON.parse(localStorage.userId)) {
        setWriter(user.id);
      }
    });
  };

  const updatePost = async () => {
    try {
      return await axios.put(
        `http://127.0.0.1:8000/api/posts/${id}/`,
        { title, description, startDay, endDay },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token["mytoken"]}`,
          },
        }
      );
    } catch (e) {
      return e.response ? e.response : e;
    }
  };
  return (
    <div>
      {post ? (
        <>
          <div className="form">
            <div className="mb-3">
              <input
                name="title"
                type="text"
                className="form-control"
                placeholder="제목을 입력하세요"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name="description"
                type="text"
                className="form-control"
                placeholder="본문을 입력하세요"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="title" className="textForm form-label">
                취합기간
              </label>
              <input
                name="startDay"
                type="date"
                className="form-control"
                value={startDay || ""}
                onChange={(e) => setStartDay(e.target.value)}
              />
              <label htmlFor="title" className="textForm form-label">
                ~
              </label>
              <input
                name="endDay"
                type="date"
                className="form-control"
                value={endDay || ""}
                onChange={(e) => setEndDay(e.target.value)}
              />
              <button
                onClick={() => {
                  navigate("/");
                  updatePost();
                }}
                className="btn btn-success"
              >
                수정
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default UpdateForm;
