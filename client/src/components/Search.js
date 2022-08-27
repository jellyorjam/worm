import { TextField, Container, Button, Grid, Box, IconButton } from "@mui/material";
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
    
    setInput("");
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
  
        <TextField sx={{marginBottom: "20px"}} id="standard-basic" value={input} label="Search Books" variant="standard"  onChange={e => setInput(e.target.value)}/>  
        
        <IconButton onClick={submitSearch} sx={{marginTop: "15px"}}>
          <SearchIcon/>
        </IconButton>
        
   
      </form>
     

  )
}

export default Search;