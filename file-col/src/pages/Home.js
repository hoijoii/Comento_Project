import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Group from "../components/Group";
import "./home.css";

const Home = () => {
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token["mytoken"] || token["mytoken"] == "undefined") {
      navigate("/");
    }
  });

  const logoutBtn = () => {
    removeToken("mytoken", { path: "/" });
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  };

  return (
    <div className="home">
      <div className="homeTitle">
        <h1>File Collection Project</h1>
        <button onClick={logoutBtn}>로그아웃</button>
      </div>
      <div className="homeSubTitle1">
        <h5>내가 만든 문서 그룹</h5>
        <div className="homeSubTitle1Button">
          <button
            onClick={() => {
              navigate("/posting/");
            }}
            className="homeSubTitle1ButtonDetail"
          >
            만들기
          </button>
        </div>
      </div>
      <Group />
    </div>
  );
};

export default Home;
