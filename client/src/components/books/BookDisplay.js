import { useConfigButtons } from "../../hooks/useConfigButtons"
import { useCreateBookObj } from "../../hooks/useCreateBookObj";
import { renderAuthors } from "../../functions/renderAuthors";
import { renderCategories } from "../../functions/renderCategories"
import NavBar from "../NavBar";
import Buttons from "./Buttons";
import { Container, Grid, CardMedia, Typography, Rating, CardContent} from "@mui/material";

const BookDisplay = ({books, wishlist, book}) => {

  const {categories, wishlistObj, bookObj, formattedDescription, newDate} = useCreateBookObj(book);

  return (
    <div>
           <NavBar/>
          <Container sx={{paddingTop: "20px"}} >
            <Grid container sx={{paddingTop: "15px"}}>
             <Grid item md={4} align="center">
               <CardMedia
                 component="img"
                 alt="book cover"
                 image={book.volumeInfo.imageLinks.thumbnail}
                 sx={{
                   maxWidth: "200px"
                 }}></CardMedia>
              </Grid>
              <Grid item md={4} align="">
                 <Typography variant={"h4"}>{book.volumeInfo.title ? book.volumeInfo.title : "No Title Available"}</Typography>
                 <div>{renderAuthors(book.volumeInfo.authors, "h5")}</div>
                 <Typography>{book.volumeInfo.publisher ? `Published by ${book.volumeInfo.publisher}` : ""}</Typography>
                 <Typography>{book.volumeInfo.publishedDate ? `Published on ${newDate}` : ""}</Typography>
                <Typography>{book.volumeInfo.pageCount ? `${book.volumeInfo.pageCount} pages` : ""}</Typography>
                <Typography>{book.volumeInfo.averageRating ? `Average Rating: ${book.volumeInfo.averageRating}` : "No Average Rate Available"}</Typography>
                <Rating value={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0} readOnly precision={0.5}></Rating>
                <div>{renderCategories(categories)}</div>
              </Grid>
              <Grid item md={4}>
                 <Buttons books={books} wishlist={wishlist} book={book} wishlistObj={wishlistObj} bookObj={bookObj}/>
              </Grid>
              <Grid item md={12}>
                <CardContent>
                  <Typography variant="h4">Description</Typography>
                  <Typography dangerouslySetInnerHTML={{__html: formattedDescription}}></Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Container>
          </div>
  )
}

export default BookDisplay