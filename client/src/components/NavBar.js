import { Toolbar, Button, Box} from "@mui/material";
import { useNavigate } from "react-router";
import Search from "./Search";
import { styled } from "@mui/material/styles";

const Worm = styled('img')({
  height: "50px",
  width: "140px",
  paddingLeft: "10px"
})

const NavBar = () => {
  const navigate = useNavigate();

  const logoutFunc = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  return (
    <Toolbar>
      <Worm  src={"../../favicon.ico"} alt="little worm logo"/>
      <Box flexGrow={1}></Box>
      <Search/>
      <Button color="inherit" size="large" onClick={() => navigate("/home")}>My Library</Button>
      <Button color="inherit" size="large" onClick={() => navigate("/wishlist")}>To Be Read</Button>
      <Button color="inherit" size="large" onClick={() => navigate("/insights")}>My Insights</Button>
      <Button color="inherit" size="large" onClick={logoutFunc}>Log out</Button>
    </Toolbar> 
  )
};

export default NavBar;