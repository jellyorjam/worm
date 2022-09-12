import { Container, Grid, Box, CardMedia, CardContent, Typography, Rating, Button, Stack, Modal} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useEffect , useState } from "react";
import { renderAuthors } from "../../functions/renderAuthors";
import axios from "axios";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import Search from "../Search";
import { libraryApi, useAddBookMutation } from "../../reducers/libraryApi";
import { useGetBookQuery, useGetWishlistQuery, useDeleteBookMutation } from "../../reducers/libraryApi";
import { useLoginHook } from "../../hooks/useLoginHook";
import { styled } from "@mui/material/styles";
import { useGetBookDetailQuery } from "../../reducers/googleBooksApi";
import BookDisplay from "./BookDisplay";


const Book = () => {
  const { state } = useLocation();
  const selfLink = state;

  const { loggedIn } = useLoginHook();
  const { data: book, error: bookError, isLoading} = useGetBookDetailQuery(selfLink);
  const usersBooks = useSelector(state => state.user.user.books)
  const usersWishlist = useSelector(state => state.user.user.wishlist)

  const { data: books, error,  isLoading: booksLoading } = useGetBookQuery(usersBooks)
  const { data: wishlist, isLoading: wishlistLoading } = useGetWishlistQuery(usersWishlist)

  if (loggedIn && books && book && wishlist) {
    return (
      <BookDisplay books={books} wishlist={wishlist} book={book}/>
    )
  }


}

export default Book