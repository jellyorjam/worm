import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLoggedIn } from "../reducers/userSlice";
import Search from "./Search"

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.user);

  const logoutFunc = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedIn(false))
    navigate("/login")
  }

  return (
    <AppBar position="static" >
      <Toolbar sx={{display: "flex", flexDirection: "column"}}>
        <Container align="center">
          <Typography variant="h6">WORM</Typography>
        </Container>
        <Container align="center">
        <Button color="inherit" onClick={() => navigate("/home")}>My Library</Button>
        <Button color="inherit">To Be Read</Button>
        <Button color="inherit" onClick={() => navigate("/insights")}>My Insights</Button>
        <Button color="inherit" onClick={logoutFunc}>Log out</Button>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar