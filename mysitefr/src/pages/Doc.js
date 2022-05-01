import React, { useState, useEffect } from "react";
import "./doc.css";
import { Link, useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import { useCookies } from "react-cookie";

function Doc() {
  const [posts, setPosts] = useState([]);
  const [token] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp))
      .catch((error) => console.log(error));
  }, []);

  posts.sort((a, b) => b.id - a.id); //게시글 내림차순

  const count = posts.length;

  const clickMe = () => {
    navigate("/writeform");
  };

  if (count === 0) return <p>게시글이 없습니다.</p>;

  return (
    <div className="doc">
      <Navbars />
      <div className="docTitle">
        <h2>문서게시판</h2>
        <button onClick={clickMe} className="docBtn">
          글쓰기
        </button>
      </div>

      <div className="docBody">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">취합기간</th>
              <th scope="col">글제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성날짜</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td scope="row">
                  {post.startDay}~{post.endDay}
                </td>
                <td>
                  <Link to={`/detail/${post.id}`} key={post.id}>
                    {post.title}
                  </Link>
                </td>
                <td>{post.writer}</td>
                <td>{post.created_at.substring(10, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doc;
