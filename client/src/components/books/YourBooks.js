import BookCard from "./BookCard";
import { useState } from "react";
import { ImageList, Typography, Autocomplete, TextField } from "@mui/material";
import ShowTextCheckBox from "./ShowTextCheckBox"

const YourBooks = ({data, type}) => {
  const [search, setSearch] = useState("");

  let checkbox = "";
  if (data.length) {
    checkbox = <ShowTextCheckBox/>
  }

  let searchBar = "";
  if (data.length) {
    searchBar =
    <Autocomplete
      onChange={(e, value) => setSearch(value)}
      freeSolo
      options={data.map((book) => book.title)}
      renderInput={(params) => <TextField color="secondary" variant="standard" {...params} label="Search My Library" />}
      sx={{width: "250px"}}></Autocomplete>
  }

  let emptyMessage = "";
  if (data && !data.length) {
    emptyMessage = <Typography variant="h4" align="center" sx={{paddingTop: "40px"}}>Search for books to add to your {type}!</Typography>
  }

  const renderBooks = () => {
    if (data) {
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

  return (
    <div>
         <Typography variant="h1" align="center">My {type}</Typography>
          {searchBar}
          {checkbox}
          {emptyMessage}
          <ImageList cols={6} rowHeight={"auto"}>
            {renderBooks()}
          </ImageList>
    </div>
  )
}

export default YourBooks;