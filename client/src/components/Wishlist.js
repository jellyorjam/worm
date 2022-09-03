import NavBar from "./NavBar";
import { useLoginHook } from "../hooks/useLoginHook";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";
import { Container, Typography, ImageList } from "@mui/material"

const Wishlist = () => {
  const books = useSelector(state => state.user.user.wishlist)
  const { loggedIn } = useLoginHook();


  const renderBooks = () => {
    if (books) {
      return books.map((book, i) => {
        return (
          <BookCard book={book} key={i} wishlist="true"/>
        )
      })
    }
    
  }
  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
        <Typography variant="h1" align="center">To Be Read</Typography>
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

export default Wishlist;