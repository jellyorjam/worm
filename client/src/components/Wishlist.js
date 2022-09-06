import NavBar from "./NavBar";
import { useLoginHook } from "../hooks/useLoginHook";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import { Container, Typography, ImageList } from "@mui/material";
import { useGetWishlistQuery } from "../reducers/libraryApi";

const Wishlist = () => {
  const books = useSelector(state => state.user.user.wishlist)
  const { loggedIn } = useLoginHook();

  const { data, error, isLoading } = useGetWishlistQuery(books)

  const renderBooks = () => {
    if (data) {
      return data.map((book, i) => {
        return (
          <BookCard book={book} key={i} wishlist="true"/>
        )
      })
    }
    
  }

  const renderEmpty = () => {
    if (!data.length) {
      return (
        <Typography variant="h4" align="center" sx={{paddingTop: "40px"}}>Search for books to add to your wishlist!</Typography>
      )
    }
  }

  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
        <Typography variant="h1" align="center">To Be Read</Typography>
        {renderEmpty()}
        <ImageList cols={6} rowHeight={"auto"}>
          {renderBooks()}
        </ImageList>
        </Container>
      </div>
    )
  }
}

export default Wishlist;