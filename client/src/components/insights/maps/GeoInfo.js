import { useSelector, useDispatch } from "react-redux";
import { editBooks } from "../../../reducers/bookSlice";
import { useState, useEffect } from "react";
import { Grid, Container, Typography, Autocomplete, TextField, Button, Box } from "@mui/material"
import GeoRequest from "../GeoRequest";
import { useGetBookQuery, useUpdateBookMutation } from "../../../reducers/libraryApi";
import ShowTextCheckBox from "../../ShowTextCheckBox";
import { setShowText } from "../../../reducers/accessibilitySlice";


const GeoInfo = ({state, booksFromState}) => {
  const dispatch = useDispatch();

  
  const usersBooks = useSelector(state => state.user.user.books)
  const checked = useSelector(state => state.accessibility.showText)

  const { data: books, error, isLoading } = useGetBookQuery(usersBooks)


  const [value, setValue] = useState("");
  const [stateBooks, setStateBooks] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const [updateBook, result] = useUpdateBookMutation();

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
     console.log(stateBooks)
    if (stateBooks.length) {
     return stateBooks.map((book, i) => {
      return (
        <div key={i}>
          <img src={book.image} alt="book cover"/>
          {checked ? <div>
            <Typography>{book.title}</Typography>
            <Typography>{book.authors[0]}</Typography>
          </div> : ""}
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
     setValue("");
     const id = value._id
     updateBook({id, newBookObj})
    //  await axios.put("http://localhost:8000/books/" + value._id, newBookObj).then((response) => console.log(response))
    
   }

   const renderBook = () => {
     if (value) {
       console.log(value)
       return (
        <div>
        <Box paddingTop="10px"><img src={value.image} alt="book cover"/></Box>
      
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
        {stateBooks.length ? <ShowTextCheckBox/> : ""}
          <Box display="flex" gap="10px" paddingTop="10px" paddingBottom="10px"  overflow="auto">{renderBooksRead()}</Box>
          <Grid container>
            <Grid item md={6}>
          <Box>
          <Typography variant="h5" sx={{paddingBottom: "10px"}}>Add books from your library</Typography>
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