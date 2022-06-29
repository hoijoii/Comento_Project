import React, { useState, useEffect } from "react";
import axios from "axios";
import "./group.css";
import "../style/style.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [token] = useCookies(["mytoken"]);

  const navigate = useNavigate();

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
    axios
      .get("http://127.0.0.1:8000/api/posts/", {
        headers: {
          Authorization: `Token ${token["mytoken"]}`,
        },
      })
      .then((resp) => setPosts(resp.data))
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  posts.sort((a, b) => b.id - a.id);

  if (posts.length === 0) return <p>게시글이 없습니다.</p>;

  return (
    <div>
      <div className="group">
        {posts.map((post) => (
          <div className="groupBox" key={post.id}>
            <div>
              <a href={`/detail/${post.id}`}>{post.title}</a>
            </div>
            {users.map((user) => {
              if (post.writer === user.id) {
                return user.realname;
              }
            })}
            <div>
              {post.startDay}~{post.endDay}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
