import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLoggedIn } from "../reducers/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.user.firstName);

  const logoutFunc = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedIn(false))
    navigate("/login")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>Welcome, {name}</Typography>
        <Button color="inherit" onClick={() => navigate("/home")}>My Library</Button>
        <Button color="inherit" onClick={logoutFunc}>Log out</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar