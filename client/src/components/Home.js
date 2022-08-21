import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8000/home", {
      headers: {
        Authorization: token
      }
    }).then(response => console.log("success!")).catch(err => navigate("/login"))
  })

  const logoutFunc = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <div>
      HOme
      <button onClick={logoutFunc}>Logout</button>
    </div>
  )
}

export default Home