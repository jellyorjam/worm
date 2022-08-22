import { TextField, Container, Button, Grid, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q="

const Search = () => {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);

  const submitSearch = async (e) => {
    e.preventDefault();
    
    await axios.get(apiUrl + input + "&maxResults=9").then(response => {
      const results = response.data.items;
       setBooks(results);
       console.log("api called")
    })
  }

  const renderSearchResults = () => {

    if (books.length === 9) {
      return (
        <div><SearchResults books={books}/></div>
      )
    }
  }
  
  return (
    <div>
      <form onSubmit={submitSearch}>
      <Container maxWidth="md" 
      sx={{
        display: "flex",
        gap: "10px"
      }}
      >
        <TextField id="standard-basic" label="Search Books" variant="standard" fullWidth={true} onChange={e => setInput(e.target.value)}/>  
        <Button variant="contained"  type="submit" startIcon={<SearchIcon/>} sx={{
          maxWidth: "200px",
          alignSelf: "center",
      
        }}>Search</Button>
      </Container>
      </form>
      {renderSearchResults()}
    </div>
  )
}

export default Search;