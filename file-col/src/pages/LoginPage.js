import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LoginService from "../LoginService";
import "./loginPage.css";
import { useUserState, useUserDispatch } from "../contexts/userContext";

const LoginPage = () => {
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [realname, setRealname] = useState("");
  const [companyCode, setCompanyCode] = useState("");

  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  const loginBtn = () => {
    LoginService.LoginUser({ username, password })
      .then((resp) => setToken("mytoken", resp.token))
      .catch((error) => console.log(error));
  };

  const RegisterBtn = () => {
    LoginService.RegisterUser({ email, password, realname, companyCode })
      .then(() => loginBtn)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (token["mytoken"]) {
      navigate("/home");

      dispatch({
        type: "LOGIN",
        user: username,
      });
    }
  }, [token]);

  return (
    <div>
      <div className="Loginform">
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
                onClick={loginBtn}
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
      </div>

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
  );
};

export default LoginPage;