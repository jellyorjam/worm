import Search from "./Search";
import NavBar from "./NavBar";
import BookCard from "./BookCard";
import { useLoginHook } from "../hooks/useLoginHook";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetBookQuery } from "../reducers/libraryApi";
import { ImageList, Container, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";




// ask about security of isLoggedIn prop
const MyLibrary = () => {
  const books = useSelector(state => state.user.user.books);
  
const theme = useTheme();
  const { loggedIn } = useLoginHook();

  const { data, isLoading, error } = useGetBookQuery(books);
  
  console.log(data)
  // const bookData = useSelector(state => state.libraryApi.queries);

  // const dataArray = [];

  // useEffect(() => {

  //   for (const book in bookData) {
      
  //     const data = bookData[book].data
  //     dataArray.push(data);
  //     console.log(dataArray)
  //   }
  // }, []);

  console.log(isLoading)

  const renderBooks = () => {
    if (data) {
      return data.map((book, i) => {
        return (
          <BookCard book={book} key={i}/>
        )
      })
    }
    
  }
  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
        <Typography variant="h1" align="center">My Library</Typography>
        {/* <Card sx={{padding: "15px", backgroundColor: theme.palette.primary.main}}> */}
        <ImageList cols={6} rowHeight={"auto"}>
          {renderBooks()}
        </ImageList>
        {/* </Card> */}
        </Container>
      </div>
    )
  }
 
}

export default MyLibrary