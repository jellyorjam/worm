import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { CardMedia, Container, Typography, Button, Box } from "@mui/material";
import NavBar from "../NavBar";
import BackButton from "./BackButton";

const PagesReadInsights = () => {
  
  const longestBook = useSelector(state => state.insights.longestBook);
  const shortestBook = useSelector(state => state.insights.shortestBook);
  const { state } = useLocation();
  const totalPages = state;
  
  return (
    <div>
      <NavBar/>
    <Container>
      
     <BackButton/>
      <Typography variant="h2" align="center">Pages Read</Typography>
      <Typography variant="h4" align="center">You have read a total of 
        <Typography sx={{fontSize: "50px", paddingBottom: "10px", display: "inline"}}> {totalPages}</Typography> pages.
      </Typography>
      <Box display="flex" justifyContent="space-between" paddingTop="20px">
        <Box display= "flex" flexDirection="column">
      <Typography variant="h5">The longest book you've read is {longestBook.pageCount} pages</Typography>
      <Typography>{longestBook.title} by {longestBook.authors[0]}</Typography>
      <CardMedia
      component="img"
      alt="book cover"
      image={longestBook.image}
      sx={{
        maxWidth: "200px",
        alignSelf: "center"
      }}>
       </CardMedia>
       </Box>
       <Box display= "flex" flexDirection="column">
      <Typography variant="h5">The shortest book you've read is {shortestBook.pageCount} pages</Typography>
      <Typography>{shortestBook.title} by {shortestBook.authors[0]}</Typography>
      <CardMedia
      component="img"
      alt="book cover"
      image={shortestBook.image}
      sx={{
        maxWidth: "200px",
        alignSelf: "center"
      }}>

      </CardMedia>
      </Box>
      </Box>
      {/* <Button variant="contained" color="secondary" sx={{maxHeight: "40px", alignSelf: "center"}}>Read A longer book</Button> */}
     
      
     
      
    </Container>
    </div>
  )
}

export default PagesReadInsights