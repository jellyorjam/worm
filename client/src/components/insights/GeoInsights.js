import { useState } from "react";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip"
import WorldMap from "./maps/WorldMap";
import NavBar from "../NavBar";
import USMap from "./maps/USMap";
import { Container, Breadcrumbs, Button } from "@mui/material";
import USInsights from "./maps/USInsights";

const GeoInsights = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");


  return (
    <div>
    <NavBar/>
    <Container align="center">
      <Breadcrumbs sx={{display: "flex", justifyContent:"center"}}>
        <Button color="secondary" onClick={() => navigate("/insights/geo")}>World</Button>
        <Button color="secondary" onClick={() => navigate("/insights/geo/us")}>United States</Button> 
      </Breadcrumbs>
      <WorldMap setTooltipContent={setContent} content={content}/>
      <ReactTooltip>{content}</ReactTooltip>
    </Container>
    </div>
  );
}

export default GeoInsights