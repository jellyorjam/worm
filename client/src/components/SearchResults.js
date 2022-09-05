import { Grid, Card, Container, CardContent, Typography, CardMedia, CardActionArea } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import  {renderAuthors}  from "../hooks/renderAuthors";
import { setBookClicked, setLibrary, setWishlist } from "../reducers/wishlistSlice";
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

  const input = state;

  const { data: books, error, isLoading } = useSearchBooksQuery(input);

  console.log(books)

  useEffect(() => {
    if (index !== "") {
      const book = books[index];

      const link = book.selfLink
      const splitLink = link.split("/");
      const selfLink = splitLink[splitLink.length - 1];
      
      navigate("/books/" + book.volumeInfo.title, {state: selfLink})
    }
  }, [index]);



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
                  <div>{renderAuthors(book.volumeInfo.authors, "")}</div>
                </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
      )
    })
  }

  return (
    <div>
      <NavBar/>
      <Container sx={{
        paddingTop: "20px"
      }}>
      <Grid container align="center" spacing={4}>
        {renderResults()}
      </Grid>
      </Container>
    </div>
  )
 }

 
}

export default SearchResults