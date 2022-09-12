import { TextField, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router";



const Search = () => {

  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const submitSearch = async (e) => {
    e.preventDefault();
    setInput("");
    navigate("/search", {state: input})
  };
  
  return (
    <form onSubmit={submitSearch}>
      <TextField sx={{marginBottom: "20px"}} id="standard-basic" value={input} label="Search Books" variant="standard"  onChange={e => setInput(e.target.value)}/>  
      <IconButton onClick={submitSearch} sx={{marginTop: "15px"}}>
        <SearchIcon/>
      </IconButton>
    </form>
  )
};

export default Search;