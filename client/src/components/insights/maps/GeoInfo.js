import { useSelector, useDispatch } from "react-redux";
import { editBooks } from "../../../reducers/bookSlice";
import { useState, useEffect } from "react";
import { Grid, Container, Typography, Autocomplete, TextField, Button, Box } from "@mui/material"
import { setBooks } from "../../../reducers/bookSlice";
import axios from "axios";
import { useLoginHook } from "../../../hooks/useLoginHook";
import { useLoadBooksArray } from "../../../hooks/useLoadBooksArray";
import GeoRequest from "../GeoRequest";


const GeoInfo = ({state, booksFromState}) => {
  const dispatch = useDispatch();

  const books = useSelector(state => state.books);

  const [value, setValue] = useState("");
  const [stateBooks, setStateBooks] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false)

  useEffect(() => {
    setStateBooks(booksFromState)
  }, [booksFromState])

  useEffect(() => {
    setSearchSubmitted(false)
  }, [state])
  
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
     setValue("")
    //  await axios.put("http://localhost:8000/books/editBook/" + value._id, newBookObj).then((response) => console.log(response))
    
   }

   const renderBook = () => {
     if (value) {
       return (
        <div>
        <img src={value.image} alt="book cover"/>
        <Box>
        <Button variant="contained" color="secondary" onClick={editBook}>Add Book</Button>
        </Box>
      </div>
       )
     }
   }

   const renderDiscover = () => {
    if (searchSubmitted) {
      return (
        <GeoRequest state={state}/>
      )
    }
   }
  
  return (
    <Container align="left" sx={{paddingBottom:"20px"}}>
 

        <Typography variant="h5">You've read {stateBooks.length} {stateBooks.length === 1 ? "book" : "books"} related to {state}</Typography>
          <Box display="flex" gap="10px" paddingTop="10px" paddingBottom="10px"  overflow="auto">{renderBooksRead()}</Box>
          <Grid container>
            <Grid item md={6}>
          <Box>
          <Typography variant="h5">Add books from your library</Typography>
          <Autocomplete
              onChange={(e, newValue) => setValue(newValue)}
              disablePortal
              options={books}
              getOptionLabel={(option) => option.title + ", " + option.authors[0]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search Library" />}
            />
            {renderBook()}
          
          </Box>
          </Grid>
          <Grid item md={6}>

          <Typography variant="h5" sx={{paddingTop: "10px"}}>Discover books related to {state}</Typography>
          <Button variant="contained" color="secondary" onClick={() => setSearchSubmitted(true)}>Discover</Button>
        
          </Grid>
          </Grid>
          <Box display="flex" gap="10px" overflow="auto">
          {renderDiscover()}
          </Box>
    
    </Container>
  )
}

export default GeoInfo;