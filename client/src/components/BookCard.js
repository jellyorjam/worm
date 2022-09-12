import { useSelector } from "react-redux";
import { CardActionArea, ImageListItem, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { renderAuthors } from "../functions/renderAuthors";

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