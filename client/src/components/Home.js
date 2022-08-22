import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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

  const {navigate, loggedIn} = useLoginHook()

  const logoutFunc = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  if (loggedIn) {
    return (
      <div>
        HOme
        <button onClick={() => navigate("/search")}>Search Books</button>
        <button onClick={logoutFunc}>Logout</button>
      </div>
    )
  }
 
}

export default Home