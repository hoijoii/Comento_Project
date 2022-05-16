import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import WriteForm from "../components/WriteForm";

const PostingPage = () => {
  const [token] = useCookies(["mytoken"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token["mytoken"]) {
      navigate("/");
    }
  });
  return (
    <div>
      <WriteForm />
    </div>
  );
};

export default PostingPage;
