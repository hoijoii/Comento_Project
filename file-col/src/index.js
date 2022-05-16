import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import PostingPage from "./pages/PostingPage";
import UpdatePage from "./pages/UpdatePage";
import LoginPage from "./pages/LoginPage";
import { UserProvider } from "./contexts/userContext";

function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/posting/" element={<PostingPage />} />
          <Route exact path="/updating/:id" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <Router />
  </UserProvider>
);

reportWebVitals();
