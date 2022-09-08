import Search from "./Search";
import NavBar from "./NavBar";
import BookCard from "./BookCard";
import { useLoginHook } from "../hooks/useLoginHook";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetBookQuery } from "../reducers/libraryApi";
import { ImageList, Container, Card, Typography, Skeleton, FormGroup, FormControlLabel, Checkbox, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShowTextCheckBox from "./ShowTextCheckBox"




// ask about security of isLoggedIn prop
const MyLibrary = () => {
  const books = useSelector(state => state.user.user.books);
 
  
  const { loggedIn } = useLoginHook();

  const { data, isLoading, error } = useGetBookQuery(books);

  let checkbox = ""
  if (data) {
    checkbox = <Box display="flex" justifyContent="center"><ShowTextCheckBox/></Box>
  }

  const renderBooks = () => {

    if (isLoading) {
      return (
           <Skeleton variant="rectangular" height={300} width={200}></Skeleton>
          )
     }

     if (error) {
          return (
            <div>ERROR</div>
          )
    }
    if (data) {
      
        if (!data.length) {
          return (
            <Typography variant="h4" align="center" sx={{paddingTop: "40px"}}>Search for books to add to your library!</Typography>
          )
        }
      else {
        return data.map((book, i) => {
          return (
            <BookCard book={book} key={i}/>
          )
        })
      }
      
    }

  }

 
  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
        <Typography variant="h1" align="center">My Library</Typography>
        {checkbox}
        <ImageList cols={6} rowHeight={"auto"}>
          {renderBooks()}
        </ImageList>
        </Container>
      </div>
    )
  }
 
}

export default MyLibrary