import NavBar from "./NavBar";
import BookCard from "./BookCard";
import { useLoginHook } from "../hooks/useLoginHook";
import { useState } from "react";
import { useSelector} from "react-redux";
import { useGetBookQuery } from "../reducers/libraryApi";
import { ImageList, Container, Typography, Skeleton, Autocomplete, TextField } from "@mui/material";
import ShowTextCheckBox from "./ShowTextCheckBox"
import ErrorPage from "./ErrorPage";





// ask about security of isLoggedIn prop
const MyLibrary = () => {
  const books = useSelector(state => state.user.user.books);
  const { loggedIn } = useLoginHook();
  const { data, isLoading, error } = useGetBookQuery(books);
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
    if (isLoading) {
      return (<Skeleton variant="rectangular" height={300} width={200}></Skeleton>)
    }

    if (error) {
      return (<ErrorPage/>)
    }

    if (data) {
      if (!data.length) {
        return (
          <Typography variant="h4" align="center" sx={{paddingTop: "40px"}}>Search for books to add to your library!</Typography>
        )
      }
      if (search) {
        const searched = data.find((book) => book.title.includes(search))
        return (
          <BookCard book={searched}/>
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

export default MyLibrary