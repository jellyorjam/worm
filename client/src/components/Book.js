import { Container, Grid, Box, CardMedia, CardContent, Typography, Rating, Button, Stack, Modal} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useEffect , useState } from "react";
import { renderAuthors } from "../hooks/renderAuthors";
import axios from "axios";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Search from "./Search";
import { libraryApi, useAddBookMutation } from "../reducers/libraryApi";
import { useLoadBooksArray } from "../hooks/useLoadBooksArray";
import { useGetBookQuery, useGetWishlistQuery, useDeleteBookMutation } from "../reducers/libraryApi";
import { useLoginHook } from "../hooks/useLoginHook";

import { setIn } from "formik";
import { useGetBookDetailQuery } from "../reducers/googleBooksApi";


const Book = () => {
  const { state } = useLocation();
  const selfLink = state;

  const { loggedIn } = useLoginHook();
  const { data: book, error: bookError, isLoading} = useGetBookDetailQuery(selfLink);

 
  const userId = useSelector(state => state.user.user._id);
  const usersBooks = useSelector(state => state.user.user.books)
  const usersWishlist = useSelector(state => state.user.user.wishlist)

  const { data: books, error,  isLoading: booksLoading } = useGetBookQuery(usersBooks)
  const { data: wishlist, isLoading: wishlistLoading } = useGetWishlistQuery(usersWishlist)

  const [deleteBook, result] = useDeleteBookMutation();
  const [addBook, addBookresult] = useAddBookMutation();
  

 

  const [inLibrary, setInLibrary] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false)

  useEffect(() => {
    if (books && wishlist && book) {
      books.forEach((title) => {
        if (title.googleLink === book.selfLink) {
          setInLibrary(true)
        }
      })

 
      wishlist.forEach((title) => {
        if (title.googleLink === book.selfLink) {
          setInWishlist(true)
        }
      })
    }
  
  }, [books, book, wishlist])

  if (books && wishlist && book && loggedIn) {
    const categories = book.volumeInfo.categories;
    const organizedCategories = [];
  
    if (categories) {
      categories.map((category) => {
        if(category.includes(" / ")) {
          const splitCategories = category.split(" / ");
          splitCategories.map((category) => {
            
            if (!organizedCategories.includes(category) && category !== "General") {
              organizedCategories.push(category)
            }
            return organizedCategories;
          })
        }
        return organizedCategories;
      })
    }
  
    const bookObj = {
      user: userId,
      type: "library",
      selfLink: book.selfLink || "",
      title: book.volumeInfo.title || "",
      authors: book.volumeInfo.authors || [],
      pageCount: book.volumeInfo.pageCount || "",
      image: book.volumeInfo.imageLinks.thumbnail || "",
      categories: organizedCategories || []
    }
  
    const wishlistObj = {...bookObj, type: "wishlist"}
  
  
  
    const formatDescription = () => {
      const description = book.volumeInfo.description;
      if (description) {
        const d1 = description.replaceAll('<br>', '<br/>');
        const d2 = d1.replaceAll('<b>', '');
        const d3 = d2.replaceAll('<i>', '');
        const d4 = d3.replaceAll('</i>', '');
        const d5 = d4.replaceAll('</b>', '');
        const formattedDescription = d5;
    
        return {__html: formattedDescription}
      }
      else {
        return {__html: "No description available"}
      }
    }
  
    const renderDate = (date) => {
      if (date) {
        const newDate = new Date(date).toLocaleDateString('en-us', {month:"short", day:"numeric", year:"numeric"}) 
        return newDate
      }
    } 
  
    const renderCategories = (categories) => {
      if (categories) {
        return categories.map((category, i) => {
          return (
            <Typography key={i}>{category}</Typography>
          )
        })
      }
      else {
        return (
          <div></div>
        )
      }
      
    }
  
    const addToRead = () => {
      addBook(bookObj);
      // await axios.post("http://localhost:8000/books/addBook", bookObj).then((response) => console.log(response.data));
     //make a modal saying "added to your library"
  
    }
  
    const addToWishlist = () => {
      addBook(wishlistObj)
      // await axios.post("http://localhost:8000/books/addBook", wishlistObj).then((response) => console.log(response.data));
     //make a modal saying "added to your library"
  
    }
  
    const renderButtons = () => {
    
  
      if (inLibrary) {
        return (
          <Stack maxWidth="250px">
            <Button variant="contained" color="secondary" onClick={() => {
        
              const bookToDelete = books.find((title) => title.googleLink === book.selfLink);
              const id = bookToDelete._id
              const payload = {user: userId, type: "library"}
              
              deleteBook({id, payload})
              setInLibrary(false) // these buttons aren't working 
              handleOpen();
    
              }}>Remove from my library</Button>
          </Stack>
        )
      }
      else if (inWishlist) {
        return (
          <Stack maxWidth="250px">
            <Button variant="contained" color="secondary" onClick={() => {
              const bookToDelete = wishlist.find((title) => title.googleLink === book.selfLink);
              const id = bookToDelete._id
              const payload = {user: userId, type: "wishlist"}
             
              deleteBook({id, payload})
              setInWishlist(false)
              handleOpen();
        
              }}>Remove from my wishlist</Button>
          </Stack>
        )
      }
      else {
        return (
          <Stack align="left" maxWidth="200px" sx={{gap: "10px"}}>
              <Button variant="contained" color="secondary" onClick={addToRead}>I've Read This Book</Button>
             <Button variant="contained" color="secondary" onClick={addToWishlist}>I Want To read this book</Button>
          </Stack>
        )
        
      }
    }
  
    if (books && wishlist && book) {
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
               <Typography>{book.volumeInfo.publishedDate ? `Published on ${renderDate(book.volumeInfo.publishedDate)}` : ""}</Typography>
              <Typography>{book.volumeInfo.pageCount ? `${book.volumeInfo.pageCount} pages` : ""}</Typography>
              <Typography>{book.volumeInfo.averageRating ? `Average Rating: ${book.volumeInfo.averageRating}` : "No Average Rate Available"}</Typography>
              <Rating value={book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 0} readOnly precision={0.5}></Rating>
              <div>{renderCategories(book.volumeInfo.categories)}</div>
            </Grid>
            <Grid item md={4}>
                {renderButtons()}
            </Grid>
            <Grid item md={12}>
              <CardContent>
                <Typography variant="h4">Description</Typography>
                <Typography dangerouslySetInnerHTML={formatDescription()}></Typography>
              </CardContent>
            </Grid>
          </Grid>
          <Modal
            open={modalOpen}
            onClose={handleClose}
            // add aria labels
            >
              <Box>
                <Typography>Test</Typography>
              </Box>

          </Modal>
        
          
        </Container>
        </div>
      )
    }
  }




 
}

export default Book