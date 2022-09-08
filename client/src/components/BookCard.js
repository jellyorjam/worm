import { useGetBookQuery } from "../reducers/libraryApi";
import { useSelector, useDispatch } from "react-redux";
import { setBooks } from "../reducers/bookSlice";
import { useEffect } from "react";
import { useLoadBooksArray } from "../hooks/useLoadBooksArray";
import { CardActionArea, ImageListItem, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { renderAuthors } from "../hooks/renderAuthors";
import { setShowText } from "../reducers/accessibilitySlice";

const BookCard = (props) => {
  const navigate = useNavigate();
  const data = props.book;
  const checked = useSelector(state => state.accessibility.showText)

  const link = data.googleLink
  const splitLink = link.split("/");
  const selfLink = splitLink[splitLink.length - 1];


  const showBook = () => {
    navigate("/books/" + data.title, {state: selfLink})
  }

  // if (isLoading) {
  //   return (
  //    <Skeleton variant="rectangular" height={300} width={200}></Skeleton>
  //   )
  // }
  // if (error) {
  //   return (
  //     <div>ERROR</div>
  //   )
  // }

  
  if (data && !checked) {
    return (
      <CardActionArea onClick={showBook}>
      <ImageListItem>
        
        <img src={data.image} alt="book cover"></img>
        
      </ImageListItem>
      </CardActionArea>
    )
  }

  if (data && checked) {
    return (
      <CardActionArea onClick={showBook}>
      <ImageListItem>
        
        <img src={data.image} alt="book cover"></img>
        <Typography variant="h5" sx={{fontSize: "20px"}}>{data.title}</Typography>
        <div>{renderAuthors(data.authors, "body1")}</div>
        
      </ImageListItem>
      </CardActionArea>
    )
  }
}

export default BookCard;