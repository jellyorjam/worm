import { useState } from "react";
import { useNavigate } from "react-router";
import ReactTooltip from "react-tooltip"
import WorldMap from "./maps/WorldMap";
import NavBar from "../NavBar";
import USMap from "./maps/USMap";
import { Container, Breadcrumbs, Button, Typography } from "@mui/material";
import BackButton from "./BackButton";


const GeoInsights = ({dashboard}) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const renderNav = () => {
    if (!dashboard) {
        return (
          <NavBar/>
        )
    }
  }
  const renderBreadcrumbs = () => {
    if (!dashboard) {
      return (
      <Breadcrumbs sx={{display: "flex", justifyContent:"center"}}>
        <Button color="inherit" onClick={() => navigate("/insights/geo")}>World</Button>
        <Button color="inherit" onClick={() => navigate("/insights/geo/us")}>United States</Button> 
      </Breadcrumbs>
      )
      
    }
  }

  return (
    <div>
    {renderNav()}
    <Container align="center">
      {dashboard ? "" : <Container align="left"><BackButton/></Container>}
      <Typography variant={dashboard ? "h4" : "h2"} sx={dashboard ? {paddingBottom: "50px"} : {}}>Travel Insights</Typography>
      {renderBreadcrumbs()}
      <WorldMap setTooltipContent={setContent} content={content} dashboard={dashboard}/>
      <ReactTooltip>{content}</ReactTooltip>
    </Container>
    </div>
  );
}

export default GeoInsights