import { useEffect } from "react";
import axios from "axios";


const Logout = () => {
  useEffect(() => {
    axios.get("http://localhost:8000/users/logout");
  })
  return <div>
    Logout
  </div>
}

export default Logout