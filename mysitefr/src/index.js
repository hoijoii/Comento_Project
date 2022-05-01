import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./pages/Board";
import Doc from "./pages/Doc";
import Mypage from "./pages/Mypage";
import Detail from "./pages/Detail";
import Updateform from "./pages/Updateform";
import Writeform from "./pages/Writeform";
import Login from "./components/Login";
import { CookiesProvider } from "react-cookie";

function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/doc/*" element={<Doc />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/updateform/:id" element={<Updateform />} />
          <Route path="/writeform/" element={<Writeform />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
