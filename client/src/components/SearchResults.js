import { Grid, Card, Container, CardContent, Typography, CardMedia, CardActionArea, Pagination, Stack, Skeleton} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import  {renderAuthors}  from "../hooks/renderAuthors";

import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Search from "./Search";
import NavBar from "./NavBar";
import { useSearchBooksQuery } from "../reducers/googleBooksApi";

const SearchResults = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state } = useLocation();
  // const books = state;
  const [index, setIndex] = useState("");
  const [startIndex, setStartIndex] = useState(0)
  console.log(startIndex)

  const input = {
    input: state,
    startIndex: startIndex
  }

  const { data: books, error, isLoading } = useSearchBooksQuery(input);


  useEffect(() => {
    if (index !== "") {
      const book = books[index];

      const link = book.selfLink
      const splitLink = link.split("/");
      const selfLink = splitLink[splitLink.length - 1];
      
      navigate("/books/" + book.volumeInfo.title, {state: selfLink})
    }
  }, [index]);

  if (isLoading) {
    console.log("true")
  //  const renderSkeleton = () => {

  // //   return new Array(3).map((i) => {
  // //    console.log()
  // //     return (
  // //       <Grid item md={4}>
  // //         <Skeleton variant="rectangular" width={100} height={200}></Skeleton>
  // //       </Grid>
  // //     )
  // //   } ) 
  // //  } 
   return (
     <div>
       <NavBar/>
     <Container sx={{
      paddingTop: "20px"
    }}>
     <Grid container align="center" spacing={4} sx={{paddingTop: "20px", paddingBottom: "20px"}}>
      {Array.from(new Array(9)).map((item) => (
        <Grid item md={4}>
        <Skeleton variant="rectangular" width={210} height={300} />
        </Grid>
      ))}
     </Grid>
     </Container>
     </div>
   )
  }

 


 if (books) {
  const renderCardMedia = (book) => {
    if (book.volumeInfo.imageLinks) {
      return (
        <CardMedia
           component="img"
           alt="book cover"
           image={book.volumeInfo.imageLinks.thumbnail}
          sx={{
           maxWidth: "200px",
          paddingTop: "15px"
        }}/>
      )
    }
    else {
      return (
        <ImageNotSupportedIcon/>
      )
    }
  }

  const renderResults = () => {
    return books.map((book, i) => {
      return (
            <Grid key={i} item xs={6} md={4}>
              <Card sx={{maxWidth: "250px", minHeight: "400px"}}>
                <CardActionArea onClick={() => {
                  setIndex(i);
                }}>
                  <div>{renderCardMedia(book)}</div>
                
                <CardContent align="left">
                  <Typography variant="h5" sx={{fontSize: "20px"}}>{book.volumeInfo.title}</Typography>
                  <div>{renderAuthors(book.volumeInfo.authors, "body1")}</div>
                </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
      )
    })
  }
  const handlePagination = (event, value) => {

    const startIndex = (value * 9) - 9
    setStartIndex(startIndex)
  }

  return (
    <div>
      <NavBar/>
        <Container sx={{
          paddingTop: "20px"
        }}>
          <Typography variant="h3" align="center">Results for "{input.input}"</Typography>
          <Grid container align="center" spacing={4} sx={{paddingTop: "20px", paddingBottom: "20px"}}>
            {renderResults()}
           </Grid>
            <Stack alignItems="center" sx={{paddingBottom: "20px"}}>
            <Pagination count={10} onChange={handlePagination}></Pagination>
           </Stack>
        
        </Container>
    </div>
  )
 }

 
}

export default SearchResults