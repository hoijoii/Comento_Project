import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";
import LoginService from "../LoginService";
import "./loginPage.css";

const LoginPage = () => {
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const [users, setUsers] = useState([]);
  const [isLogin, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [realname, setRealname] = useState("");
  const [companyCode, setCompanyCode] = useState("");

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
    if (token["mytoken"]) {
      localStorage.setItem("username", username);
      searchId();
    }
  }, [token]);

  const loginBtn = async (cb) => {
    return await LoginService.LoginUser({ username, password })
      .then((resp) => {
        setToken("mytoken", resp.token);
        cb(resp.token);
      })
      .catch((error) => console.log(error));
  };

  const RegisterBtn = () => {
    LoginService.RegisterUser({ email, password, realname, companyCode })
      .then(() => loginBtn)
      .catch((error) => console.log(error));
  };

  const searchId = () => {
    users.map((user) => {
      if (user.email === username) {
        localStorage.setItem("userId", user.id);
      }
    });
  };

  return (
    <div>
      <div className="loginForm">
        {isLogin ? <h1>File Collection Project</h1> : <h1> Register </h1>}
        {isLogin ? (
          <div>
            <div className="textForm mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <Button
                block
                color="secondary"
                size="lg"
                type="button"
                onClick={() => {
                  loginBtn((userToken) => {
                    if (!userToken || userToken === "undefined") {
                      alert("존재하지 않는 계정입니다.");
                      console.log(userToken);
                      removeToken("mytoken", { path: "/" });
                    } else {
                      navigate("/home");
                    }
                  });
                }}
                className="loginbutton"
              >
                로그인
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="textForm mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="form-control"
                id="realname"
                placeholder="Enter Your Realname"
                value={realname}
                onChange={(e) => setRealname(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="form-control"
                id="companyCode"
                placeholder="Enter Your Company Code"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
              />

              <br />
              <br />
              <Button
                block
                color="secondary"
                size="lg"
                type="button"
                onClick={RegisterBtn}
                className="loginbutton"
              >
                회원가입
              </Button>
            </div>
          </div>
        )}

        <div className="mb-3">
          <br />
          {isLogin ? (
            <h6>
              계정이 없으신가요?{" "}
              <Button
                color="default"
                size="sm"
                type="button"
                className="smButton"
                onClick={() => setLogin(false)}
              >
                회원가입
              </Button>{" "}
              해주세요!
            </h6>
          ) : (
            <h6>
              계정이 있으신가요?{" "}
              <Button
                color="default"
                size="sm"
                type="button"
                className="smButton"
                onClick={() => setLogin(true)}
              >
                로그인
              </Button>{" "}
              해주세요!
            </h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
