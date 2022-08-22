import { Grid, Card, Container, CardContent, Typography, CardMedia, CardActionArea } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import  {renderAuthors}  from "../hooks/renderAuthors";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const SearchResults = (props) => {
  const navigate = useNavigate();
  const books = props.books;
  const [index, setIndex] = useState("");


  useEffect(() => {
    if (index !== "") {
      console.log("teset")
      const book = books[index];
      let bookData = {}
      const fetchBook = async() => {
        await axios.get(book.selfLink).then((response) => bookData = response.data)
      }
      fetchBook().then(() => navigate("/books/" + book.volumeInfo.title, {state: bookData}))
    }
  }, [index])

  console.log(books)

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

export default SearchResults