import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import APIService from "../APIService";
import "./form.css";
import Navbars from "../components/Navbars";
import { useCookies } from "react-cookie";

function Updateform() {
  const { id } = useParams();

  const [post, setPost] = useState([]);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [writer, setWriter] = useState(post.writer);
  const [token] = useCookies(["mytoken"]);

  //수정 전 포스트 정보 읽어와야 함.
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPost(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
    setStartDay(post.startDay);
    setEndDay(post.endDay);
    setWriter(post.writer);
  }, [post]);

  const updatePost = () => {
    APIService.UpdatePost(
      id,
      { title, description, writer },
      token["mytoken"]
    ).then((resp) => console.log(resp));
  };

  return (
    <div>
      <Navbars />
      {post ? (
        <>
          <div className="form">
            <div className="mb-3">
              <label htmlFor="title" className="textForm form-label">
                제목
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="title" className="textForm form-label">
                본문
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <label htmlFor="title" className="textForm form-label">
                작성자
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="작성자"
                value={writer || ""}
                onChange={(e) => setWriter(e.target.value)}
              />

              <br />
              <Link to={`/detail/${id}`}>
                <button onClick={updatePost} className="formBtn">
                  올리기
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Updateform;
