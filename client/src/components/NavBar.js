import { AppBar, Toolbar, Typography, Button, Container, Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setLoggedIn } from "../reducers/userSlice";
import Search from "./Search"
import { styled } from "@mui/material/styles"

//remember to map semantic headings for accessibility

const Worm = styled('img')({
  height: "50px",
  width: "140px",
  paddingLeft: "10px"
})

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.user);
  const theme = useTheme();

  const logoutFunc = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedIn(false))
    navigate("/login")
  }

  return (
    
      <Toolbar>
          <Worm  src={"../../images/croppedworm.JPG"} alt="little worm logo"/>
          <Box flexGrow={1}></Box>
          <Search/>
          <Button color="inherit" size="large" onClick={() => navigate("/home")}>My Library</Button>
          <Button color="inherit" size="large">To Be Read</Button>
          <Button color="inherit" size="large" onClick={() => navigate("/insights")}>My Insights</Button>
          <Button color="inherit" size="large" onClick={logoutFunc}>Log out</Button>
      </Toolbar>
   
  )
}

export default NavBar