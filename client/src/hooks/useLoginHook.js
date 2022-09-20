//makes sure user is logged in and has access to the page

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { setUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../config/keys";

export const useLoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(url + "/auth", {
      headers: {
        Authorization: token
      }
    }).then(response => {
      setLoggedIn(true);
      dispatch(setUser(response.data));
    }).catch(err => navigate("/login"))
  }, [])

  return {
    navigate,
    loggedIn,
    dispatch
  }
}