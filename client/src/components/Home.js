import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import Search from "./Search";
import NavBar from "./NavBar";
import { setUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";

const useLoginHook = () => {
  const navigate = useNavigate();
  
  const [loggedIn, setLoggedIn] = useState(false)

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

const Home = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  // useEffect(() => {
  //   console.log('happen')
  //   setUser(state);
  // }, [])
  
  // const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios.get("http://localhost:8000/home", {
  //     headers: {
  //       Authorization: token
  //     }
  //   }).then(response => setLoggedIn(true)).catch(err => navigate("/login"))
  // })

  useEffect(() => {
    dispatch(setUser(state))
  }, [state])

  const {navigate, loggedIn} = useLoginHook()

  const logoutFunc = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  const testFunc = () => {
    dispatch(setUser())
  }

  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Search />
        <button onClick={logoutFunc}>Logout</button>
        <button onClick={testFunc}>TEST</button>
      </div>
    )
  }
 
}

export default Home