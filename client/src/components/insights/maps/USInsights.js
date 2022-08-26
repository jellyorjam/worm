import { Container, Breadcrumbs, Button } from "@mui/material";
import ReactTooltip from "react-tooltip";
import USMap from "./USMap";
import NavBar from "../../NavBar";
import { useState } from "react";
import { useNavigate } from "react-router";

const USInsights = () => {
  const [UScontent, setUSContent] = useState("");
  const [isClicked, setIsClicked] = useState(false)

  const navigate = useNavigate();

  return (
    <div>
      <NavBar/>
    
      <Container align="center">
      <Breadcrumbs sx={{display: "flex", justifyContent:"center"}}>
        <Button color="secondary" onClick={() => navigate("/insights/geo")}>World</Button>
        <Button color="secondary" onClick={() => navigate("/insights/geo/us")}>United States</Button> 
      </Breadcrumbs>
        <USMap setTooltipContent={setUSContent} content={UScontent}/>
        <ReactTooltip>{UScontent}</ReactTooltip>
      </Container>
    </div>
    
  )
}

export default USInsights