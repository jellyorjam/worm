import { useSelector } from "react-redux";
import { CardMedia, Container, Typography, Button} from "@mui/material";

const PagesReadInsights = () => {
  const books = useSelector(state => state.insights.sortedByYear);
  const longestBook = useSelector(state => state.insights.longestBook);
  const shortestBook = useSelector(state => state.insights.shortestBook)
  
  const totalPages = books.reduce((accumulator, books) =>  accumulator + parseInt(books.pageCount), 0
  ).toLocaleString("en-US");


  return (
    <Container>
      <Typography variant="h4">You have read a total of 
        <Typography sx={{fontSize: "50px", paddingBottom: "10px"}}>{totalPages}  pages.</Typography>
      </Typography>
      <Typography variant="h5">The longest book you've read is {longestBook.pageCount} pages</Typography>
      <Typography>{longestBook.title} by {longestBook.authors[0]}</Typography>
      <Typography variant="h5">The shortest book you've read is {shortestBook.pageCount} pages</Typography>
      <Typography>{shortestBook.title} by {shortestBook.authors[0]}</Typography>
      <Container sx={{display: "flex", gap: "10px"}}>
      <CardMedia
      component="img"
      alt="book cover"
      image={longestBook.image}
      sx={{
        maxWidth: "120px"
      }}>

      </CardMedia>
      <CardMedia
      component="img"
      alt="book cover"
      image={shortestBook.image}
      sx={{
        maxWidth: "120px"
      }}>

      </CardMedia>
      <Button variant="contained" color="secondary" sx={{maxHeight: "40px", alignSelf: "center"}}>Read A longer book</Button>
      </Container>
     
      
    </Container>
  )
}

export default PagesReadInsights