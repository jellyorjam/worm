import { Container, Breadcrumbs, Button, Typography } from "@mui/material";
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
      <Typography variant="h2" sx={{paddingTop: "20px"}}>Travel Insights</Typography>
      <Breadcrumbs sx={{display: "flex", justifyContent:"center"}}>
        <Button color="inherit" onClick={() => navigate("/insights/geo")}>World</Button>
        <Button color="inherit" onClick={() => navigate("/insights/geo/us")}>United States</Button> 
      </Breadcrumbs>
      
        <USMap setTooltipContent={setUSContent} content={UScontent}/>
        <ReactTooltip>{UScontent}</ReactTooltip>
      </Container>
    </div>
    
  )
}

export default USInsights