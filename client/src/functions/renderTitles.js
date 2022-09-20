//renders books when a bar on the Publish Year Insights bar graph is clicked

import { CardActionArea, Typography, Box,} from "@mui/material";
import ShowTextCheckBox from "../components/books/ShowTextCheckBox";
import { showBook } from "./renderGenres";

export const renderTitle = (isClicked, dashboard, insights, yearClicked, checked, navigate) => {
  if (isClicked && !dashboard) {
    const booksOfYear = insights.sortedByYear.filter((book) => {
    return book.firstPublishYear === yearClicked.name
  })

  const mapTitles = () => {
    return booksOfYear.map((book) => {
      return (
        <CardActionArea sx={{width: "125px", height: "auto"}} onClick={() => showBook(book, navigate)}>  
          <img src={book.image} alt="book cover"></img>
          {checked ? <div>
            <Typography align="left">{book.title}</Typography>
            <Typography align="left">{book.authors[0]}</Typography>
            </div> : ""}
        </CardActionArea>
        )
     })
  }

  return (
    <div>
      <Typography variant="h6" sx={{textDecoration: "underline"}}>Books Published in {yearClicked.name}</Typography>
      <Box display="flex" justifyContent="center">
        <ShowTextCheckBox/>
      </Box>
      <Box paddingTop="10px" display="flex" flexWrap="wrap" gap="20px">
        {mapTitles()}
      </Box>
    </div>
    )
  }
};

export const renderDecadeTitle = (decadeIsClicked, dashboard, decadeClicked, insights, checked, navigate) => {
  if (decadeIsClicked && !dashboard) {
    const booksOfYear = insights.sortedByYear.filter((book) => {
    return book.firstPublishYear.substring(0, 2) === decadeClicked.name.substring(0, 2)
  })

  const mapTitles = () => {
    return booksOfYear.map((book) => {
      return (
        <CardActionArea sx={{width: "125px", height: "auto"}} onClick={() => showBook(book, navigate)}>
          <img src={book.image} alt="book cover"></img>
          {checked ? <div>
            <Typography align="left">{book.title}</Typography>
            <Typography align="left">{book.authors[0]}</Typography>
            </div> : ""}
        </CardActionArea>
        )
      })
    };

  return (
    <div>
      <Typography variant="h6" sx={{textDecoration: "underline"}}>Books Published in {decadeClicked.name}</Typography>
      <Box display="flex" justifyContent="center">
        <ShowTextCheckBox/>
      </Box>
      <Box paddingTop="10px" display="flex" flexWrap="wrap" gap="20px">
        {mapTitles()}
      </Box>
    </div>
    )
  }
};