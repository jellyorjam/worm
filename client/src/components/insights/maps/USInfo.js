import { useSelector, useDispatch } from "react-redux";
import { editBooks } from "../../../reducers/bookSlice";
import { useState, useEffect } from "react";
import { Grid, Container, Typography, Autocomplete, TextField, Button } from "@mui/material"
import { setBooks } from "../../../reducers/bookSlice";
import axios from "axios";
import { useLoginHook } from "../../../hooks/useLoginHook";
import { useLoadBooksArray } from "../../../hooks/useLoadBooksArray";


const USInfo = ({state, booksFromState}) => {
  const dispatch = useDispatch();

  const books = useSelector(state => state.books);

  const [value, setValue] = useState("");
  const [stateBooks, setStateBooks] = useState([]);

  useEffect(() => {
    setStateBooks(booksFromState)
  }, [booksFromState])
  
  // const booksFromState = []


  // books.forEach((book) => {
  //  if (book.SubjectPlace) {
  //    book.SubjectPlace.forEach((subject) => {
  //      if (subject.includes(state)) {
  //        booksFromState.push(book)
  //      }
  //    })
  //  }
  //  })

   const renderBooksRead = () => {
    if (stateBooks.length) {
     return stateBooks.map((book, i) => {
      return (
        <div key={i}>
          <img src={book.image} alt="book cover"/>
        </div>
      )
      })
    
    }
   }

   const editBook = async () => {
     const subjectArray = Object.assign([], value.SubjectPlace);
     subjectArray.push(state);
     setStateBooks(arr => [...arr, value]);
     const newBookObj = {...value, SubjectPlace: subjectArray};
     const index = books.findIndex((book) => book._id === value._id )
     const obj = {
       newBookObj,
       index
     }
     dispatch(editBooks(obj))
    //  await axios.put("http://localhost:8000/books/editBook/" + value._id, newBookObj).then((response) => console.log(response))
    
   }

   const renderBook = () => {
     if (value) {
       return (
        <div>
        <img src={value.image} alt="book cover"/>
        <Button variant="contained" color="secondary" onClick={editBook}>Add Book</Button>
      </div>
       )
     }
   }
  
  return (
    <Container>
      <Grid container>
        <Grid item md={4}>
        <Typography>You've read {stateBooks.length} {stateBooks.length === 1 ? "book" : "books"} related to {state}</Typography>
          {renderBooksRead()}
        </Grid>
        <Grid item md={4} align="left" sx={{paddingLeft: "20px"}}>
          <Typography>Add books from your library</Typography>
          <Autocomplete
              onChange={(e, newValue) => setValue(newValue)}
              disablePortal
              id="combo-box-demo"
              options={books}
              getOptionLabel={(option) => option.title + ", " + option.authors[0]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search Library" />}
            />
          {renderBook()}
        </Grid>
        <Grid item md={4}>
          <Typography>Discover books related to {state}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default USInfo;