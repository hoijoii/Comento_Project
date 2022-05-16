import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { UserContext } from "../contexts/userContext";
import Group from "../components/Group";
import "./home.css";

const Home = () => {
  const [token] = useCookies(["mytoken"]);
  let navigate = useNavigate();

  const userIdContext = useContext(UserContext);
  console.log(userIdContext);

  useEffect(() => {
    if (!token["mytoken"]) {
      navigate("/");
    }
  });

  return (
    <div className="home">
      <div className="homeTitle">
        <h1>File Collection Project</h1>
        <h6>{userIdContext.user}님, 환영합니다!</h6>
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
