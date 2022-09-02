import { useGetBookQuery } from "../reducers/libraryApi";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../reducers/bookSlice";
import { useEffect } from "react";
import { useLoadBooksArray } from "../hooks/useLoadBooksArray";
import { CardActionArea, ImageListItem, Skeleton } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios"

const BookCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const bookId = props.book;
 
  const { data, error, isLoading, refetch } = useGetBookQuery(bookId);

  useEffect(() => {
    refetch();  }, [])

  useLoadBooksArray(isLoading);


  const showBook = () => {
    let bookData = {}
    const fetchBook = async() => {
      await axios.get(data.googleLink).then((response) => {
        bookData = response.data
      })
    }
    fetchBook().then(() => navigate("/books/" + data.title, {state: bookData}))
  }

  if (isLoading) {
    return (
     <Skeleton variant="rectangular" height={300} width={200}></Skeleton>
    )
  }
  if (error) {
    return (
      <div>ERROR</div>
    )
  }
  if (data) {
    return (
      <CardActionArea onClick={showBook}>
      <ImageListItem>
        
        <img src={data.image} alt="book cover"></img>
        
      </ImageListItem>
      </CardActionArea>
    )
  }
}

export default BookCard;