import React, { useReducer, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const WriteForm = () => {
  const { id } = useParams();
  const [token] = useCookies(["mytoken"]);
  const [writer, setWriter] = useState("");
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    startDay: "",
    endDay: "",
    codes: "", //회사코드. Company 테이블에 들어갈 정보
  });

  const { title, description, startDay, endDay, codes } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  let navigate = useNavigate();

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
    searchWriter();
  });

  const searchWriter = () => {
    users.map((user) => {
      if (user.id === JSON.parse(localStorage.userId)) {
        setWriter(user.id);
      }
    });
  };

  const insertPost = async () => {
    try {
      return await axios.post(
        "http://127.0.0.1:8000/api/posts/",
        { title, description, startDay, endDay, writer },
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
      <div className="form">
        <div className="mb-3">
          <input
            name="title"
            type="text"
            className="form-control"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={onChange}
          />
          <textarea
            name="description"
            type="text"
            className="form-control"
            placeholder="본문을 입력하세요"
            value={description}
            onChange={onChange}
          />
          <label htmlFor="title" className="textForm form-label">
            취합기간
          </label>
          <input
            name="startDay"
            type="date"
            className="form-control"
            value={startDay}
            onChange={onChange}
          />
          <label htmlFor="title" className="textForm form-label">
            ~
          </label>
          <input
            name="endDay"
            type="date"
            className="form-control"
            value={endDay}
            onChange={onChange}
          />
          <button
            onClick={() => {
              navigate("/");
              insertPost();
            }}
            className="btn btn-success"
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteForm;
