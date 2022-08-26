import { TextField, Container, Button, Grid, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router";

const apiUrl = "https://www.googleapis.com/books/v1/volumes?q="

const Search = () => {
  const [input, setInput] = useState("");
  

  const navigate = useNavigate();

  const submitSearch = async (e) => {
    e.preventDefault();
    

    const fetchBooks = async () => {
      const response = await axios.get(apiUrl + input + "&maxResults=9")
      return response.data.items  
    }
   
    fetchBooks().then((response) => {
      navigate("/search", {state: response})
    })
  }
  
  return (

      <form onSubmit={submitSearch}>
      <Container maxWidth="md" align="center"
      sx={{
        display: "flex",
        gap: "10px",
        
      }}
      >
        <TextField  id="standard-basic" label="Search Books" variant="standard"  onChange={e => setInput(e.target.value)}/>  
        <Button variant="contained"  color="secondary" type="submit" startIcon={<SearchIcon/>} sx={{
          maxWidth: "200px",
          alignSelf: "center"
        }}>Search</Button>
      </Container>
      </form>

  )
}

export default Search;