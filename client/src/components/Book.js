import { Container, Grid, Card, CardMedia, CardContent, Typography, Rating, Button, Stack} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { renderAuthors } from "../hooks/renderAuthors";
import axios from "axios";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Search from "./Search";


const Book = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const book = state;
  console.log(book)
  const userId = useSelector(state => state.user.user._id);

  const categories = book.volumeInfo.categories;
  
  const organizedCategories = []

  if (categories) {
    categories.map((category) => {
      if(category.includes(" / ")) {
        const splitCategories = category.split(" / ");
        splitCategories.map((category) => {
          
          if (!organizedCategories.includes(category) && category !== "General") {
            organizedCategories.push(category)
          }
          return organizedCategories;
        })
      }
      return organizedCategories;
    })
  }
  

  const bookObj = {
    user: userId,
    selfLink: book.selfLink || "",
    title: book.volumeInfo.title || "",
    authors: book.volumeInfo.authors || [],
    pageCount: book.volumeInfo.pageCount || "",
    image: book.volumeInfo.imageLinks.thumbnail || "",
    categories: organizedCategories || []
  }


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

  const addToRead = async () => {
    await axios.post("http://localhost:8000/books/addBook", bookObj).then((response) => console.log(response.data));
   //make a modal saying "added to your library"

  }

  return (
    <div>
      <NavBar/>
    <Container sx={{paddingTop: "20px"}} >
      <Card >
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
           <Button variant="contained" color="secondary" onClick={addToRead}>I've Read This Book</Button>
           <Button variant="contained" color="secondary">I Want To read this book</Button>
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
    </div>
  )
}

export default Book