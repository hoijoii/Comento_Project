import React, { useReducer, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value
  };
};

const WriteForm = () => {
  const id = useParams();
  const [token] = useCookies(["mytoken"]);
  const [writer, setWriter] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    description: "",
    startDay: "",
    endDay: ""
  });

  const { title, description, startDay, endDay } = state;

  const onChange = e => {
    dispatch(e.target);
  };

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/account/users/`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`
        }
      })
      .then(resp => setUsers(resp.data))
      .catch(Error => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/`, {
        headers: {
          Authorization: `Token ${token["mytoken"]}`
        }
      })
      .then(resp => setPosts(resp.data))
      //.then(() => findLatestId())
      .catch(Error => {
        console.log(Error);
      });
  }, []);

  useEffect(() => {
    searchWriter();
  });
  /*
  const findLatestId = () => {
    let postList = [];
    posts.map(post => {
      postList.push(post.id);
    });
    console.log(...postList);
  };
*/
  const searchWriter = () => {
    users.map(user => {
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
            Authorization: `Token ${token["mytoken"]}`
          }
        }
      );
      //.then(()=>insertCodes())
    } catch (e) {
      return e.response ? e.response : e;
    }
  };

  const insertCodes = () => {
    const companyCodes = prompt("?????? ????????? ?????????????????? (??????????????? ??????)");
    const codes = companyCodes.split(" ");
    codes.map(code => {
      axios.post(
        "http://127.0.0.1:8000/api/companies/",
        { code, id },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    });
  };

  return (
    <div>
      <div className="form">
        <div className="mb-3">
          <input
            name="title"
            type="text"
            className="form-control"
            placeholder="????????? ???????????????"
            value={title}
            onChange={onChange}
          />
          <textarea
            name="description"
            type="text"
            className="form-control"
            placeholder="????????? ???????????????"
            value={description}
            onChange={onChange}
          />
          <label htmlFor="title" className="textForm form-label">
            ????????????
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
              insertPost();
              insertCodes();
              navigate(`/home`);
            }}
            className="btn btn-success"
          >
            ?????????
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteForm;
