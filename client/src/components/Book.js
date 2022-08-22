import { Container, Grid, Card, CardMedia, CardContent, Typography, Rating, Button, Stack } from "@mui/material";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { renderAuthors } from "../hooks/renderAuthors";

const Book = () => {
  const { state } = useLocation();
  const book = state;

  console.log(book)

  

  const formatDescription = () => {
    const description = book.volumeInfo.description;
    if (description) {
      const d1 = description.replaceAll('<br>', '<br/>');
      const d2 = d1.replaceAll('<b>', '');
      const d3 = d2.replaceAll('<i>', '');
      const d4 = d3.replaceAll('</i>', '');
      const d5 = d4.replaceAll('</b>', '');
      const formattedDescription = d5;
  
      return {__html: formattedDescription}
    }
    else {
      return {__html: "No description available"}
    }
  }

  const renderDate = (date) => {
    if (date) {
      const newDate = new Date(date).toLocaleDateString('en-us', {month:"short", day:"numeric", year:"numeric"}) 
      return newDate
    }
  } 

  const renderCategories = (categories) => {
    if (categories) {
      return categories.map((category, i) => {
        return (
          <Typography key={i}>{category}</Typography>
        )
      })
    }
    else {
      return (
        <div></div>
      )
    }
    
  }
  return (
    <Container >
      <Card>
      <Grid container sx={{paddingTop: "15px"}}>
        <Grid item md={4} align="center">
          <CardMedia
           component="img"
           alt="book cover"
           image={book.volumeInfo.imageLinks.thumbnail}
           sx={{
             maxWidth: "200px"
           }}></CardMedia>
        </Grid>
        <Grid item md={4} align="">
           <Typography variant={"h4"}>{book.volumeInfo.title ? book.volumeInfo.title : "No Title Available"}</Typography>
           <div>{renderAuthors(book.volumeInfo.authors, "h5")}</div>
           <Typography>{book.volumeInfo.publisher ? `Published by ${book.volumeInfo.publisher}` : ""}</Typography>
           <Typography>{book.volumeInfo.publishedDate ? `Published on ${renderDate(book.volumeInfo.publishedDate)}` : ""}</Typography>
          <Typography>{book.volumeInfo.pageCount ? `${book.volumeInfo.pageCount} pages` : ""}</Typography>
          <Typography>{book.volumeInfo.averageRating ? `Average Rating: ${book.volumeInfo.averageRating}` : "No Average Rate Available"}</Typography>
          <Rating value={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0} readOnly precision={0.5}></Rating>
          <div>{renderCategories(book.volumeInfo.categories)}</div>
        </Grid>
        <Grid item md={4}>
          <Stack align="left" maxWidth="200px" sx={{gap: "10px"}}>
           <Button variant="contained">I've Read This Book</Button>
           <Button variant="contained">I Want To read this book</Button>
           </Stack>
        </Grid>
        <Grid item md={12}>
          <CardContent>
            <Typography variant="h4">Description</Typography>
            <Typography dangerouslySetInnerHTML={formatDescription()}></Typography>
          </CardContent>
        </Grid>
      </Grid>
      </Card>
      
    </Container>
  )
}

export default Book