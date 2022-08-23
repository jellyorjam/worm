import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export const useLoginHook = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8000/home", {
      headers: {
        Authorization: token
      }
    }).then(response => setLoggedIn(true)).catch(err => navigate("/login"))
  })

  return {
    navigate,
    loggedIn
  }
}