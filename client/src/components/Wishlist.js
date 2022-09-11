import NavBar from "./NavBar";
import { useLoginHook } from "../hooks/useLoginHook";
import { useSelector } from "react-redux";
import { useState } from "react";
import BookCard from "./BookCard";
import { Container, Typography, ImageList, Autocomplete, TextField } from "@mui/material";
import { useGetWishlistQuery } from "../reducers/libraryApi";
import ShowTextCheckBox from "./ShowTextCheckBox";
import ErrorPage from "./ErrorPage";

const Wishlist = () => {
 
  const books = useSelector(state => state.user.user.wishlist)
  const { loggedIn } = useLoginHook();
  const { data, error, isLoading } = useGetWishlistQuery(books);
  const [search, setSearch] = useState("");

  let checkbox = ""
  if (data) {
    checkbox = <ShowTextCheckBox/>
  }

  let searchBar = ""
  if (data) {
    searchBar =
    <Autocomplete
      onChange={(e, value) => setSearch(value)}
      freeSolo
      options={data.map((book) => book.title)}
      renderInput={(params) => <TextField color="secondary" variant="standard" {...params} label="Search My Library" />}
      sx={{width: "250px"}}></Autocomplete>
  }
 
  const renderBooks = () => {
    if (data) {
      if (!data.length) {
        return (
          <Typography variant="h4" align="center" sx={{paddingTop: "40px"}}>Search for books to add to your wishlist!</Typography>
        )
      }
      if (search) {
        const searched = data.find((book) => book.title.includes(search))
        return (
          <BookCard book={searched}/>
        )
      }
      return data.map((book, i) => {
        return (
          <BookCard book={book} key={i}/>
        )
      })
    }
    
    if (error) {
      return (
        <ErrorPage/>
      )
    }
  }

  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
          <Typography variant="h1" align="center">To Be Read</Typography>
          {searchBar}
          {checkbox}
          <ImageList cols={6} rowHeight={"auto"}>
            {renderBooks()}
          </ImageList>
        </Container>
      </div>
    )
  }
}

export default Wishlist;