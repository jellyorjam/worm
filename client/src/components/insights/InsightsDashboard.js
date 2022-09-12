import { useInsights } from "../../hooks/useInsights";
import { useLoginHook } from "../../hooks/useLoginHook";
import { useState, useEffect } from "react";
import { Typography, Container, Grid, Card, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavBar from "../NavBar";
import GenreInsights from "./GenreInsights";
import PublishYearInsights from "./PublishYearInsights";
import GeoInsights from "./GeoInsights";

const InsightsDashboard = ({library}) => {
  const { totalPages } = useInsights(library);

  const [isDashboard, setIsDashboard] = useState(true);
  const { loggedIn, navigate } = useLoginHook();

  useEffect(() => {
    setIsDashboard(true)
  }, []);


  const StyledCard = styled('div')({
    padding: "10px", 
    paddingBottom: "20px",
    height: 480, 
    width: 550,
    backgroundColor: "#f4f4f0",
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between"
  });

  const renderEmpty = () => {
    if (!library.length) {
      return (
        <Typography variant="h4" align="center" sx={{paddingTop: "40px"}}>Add books to your library to view your insights!</Typography>
      )
    }
  };

  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        {renderEmpty()}
        <Typography align="center" variant="h2" sx={{padding: "30px"}}>You have read {library.length} books</Typography>
        <Container sx={{paddingBottom: "20px"}}>
        <Grid container spacing={1} >

          <Grid item xs={12} md={6} >
            <Card align="center" sx={{height: 480, width: 550,}}>
            <StyledCard>
              <Typography variant="h4" align="center">Pages Read</Typography>
              <Typography align="center" sx={{fontSize: "70px"}}>{totalPages} pages</Typography>
              <Button variant="contained" color="secondary" sx={{width: "90px", alignSelf: "center"}} onClick={() => navigate("pages", {state: totalPages})}>Details</Button>
              </StyledCard>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
          <Card align="center" sx={{height: 480, width: 550, backgroundColor: "#f4f4f0", paddingTop: "10px", }}>
              <GenreInsights dashboard={isDashboard}/>
              <Button variant="contained" color="secondary" sx={{width: "90px", marginTop: "15px"}} onClick={() => {
                setIsDashboard(false)
                navigate("genre");
              }}>Details</Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
          <Card align="center" sx={{height: 480, width: 550,}}>
            <StyledCard sx={{paddingRight: "70px"}}>
            <PublishYearInsights dashboard={isDashboard}/>
            <Button variant="contained" color="secondary" sx={{width: "90px", alignSelf: "center", marginLeft: "70px"}} onClick={() => {
                setIsDashboard(false);
                navigate("year")
              }}>Details</Button>
              </StyledCard>
            </Card>
          </Grid>
         
          <Grid item xs={12} md={6}>
          <Card align="center" sx={{height: 480, width: 550,}}>
            <StyledCard >
              <GeoInsights dashboard={isDashboard}/>
              <Button color="secondary" variant="contained" sx={{width: "90px", alignSelf: "center"}} onClick={() => {
                setIsDashboard(false)
                navigate("geo")
              }}>Details</Button>
              </StyledCard>
            </Card>
          </Grid>

        </Grid>
      </Container>
      </div>
    )
  }
};

export default InsightsDashboard;