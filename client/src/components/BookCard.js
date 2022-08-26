import { useGetBookQuery } from "../reducers/libraryApi";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../reducers/bookSlice";
import { useEffect } from "react";
import { useLoadBooksArray } from "../hooks/useLoadBooksArray";
import { CardActionArea, ImageListItem, Typography } from "@mui/material";

const BookCard = (props) => {
  const dispatch = useDispatch();
  
  const bookId = props.book;
  const { data, error, isLoading, refetch } = useGetBookQuery(bookId);

  useEffect(() => {
    refetch();  }, [])

  useLoadBooksArray(isLoading);

  //  const bookData = useSelector(state => state.libraryApi.queries);
  //  const userBooks = useSelector(state => state.user.user.books)

  // const dataArray = [];

  // useEffect(() => {
  //   for (const book in bookData) {
  //     const data = bookData[book].data
  //     dataArray.push(data);
  //   }
  //  dispatch(setBooks(dataArray));
  // }, [userBooks, isLoading])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }
  if (error) {
    return (
      <div>ERROR</div>
    )
  }
  if (data) {
    return (
      <CardActionArea>
      <ImageListItem>
        
        <img src={data.image} alt="book cover"></img>
        
      </ImageListItem>
      </CardActionArea>
    )
  }
}

export default BookCard;