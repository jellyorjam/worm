import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";

//renders list of top 10 genres read
export const renderTopGenres = (topTenGenres, setGenreClicked) => {
  return topTenGenres.map((genre, i) => {
    return (
      <CardActionArea onClick={(e) => setGenreClicked(e.target.firstChild.textContent)}>
        <Typography sx={{fontSize: "20px"}}>{genre[0]} - {genre[1]}</Typography>
      </CardActionArea>
    )
  })
};

//renders next 10
export const renderOtherGenres = (sortedGenres, setGenreClicked) => {
  const top20 = sortedGenres.slice(10, 20);
  return top20.map((genre, i) => {
    return (
      <CardActionArea onClick={(e) => setGenreClicked(e.target.firstChild.textContent)}>
        <Typography sx={{fontSize: "20px"}}>{genre[0]} - {genre[1]}</Typography>
      </CardActionArea>
    )
  })
};

//shows details of book when book is clicked on
export const showBook = (book, navigate, genreClicked) => {
  const link = book.googleLink
  const splitLink = link.split("/");
  const selfLink = splitLink[splitLink.length - 1];
  navigate("/books/" + book.title, {state: selfLink})
};

//shows all books in the genre that was clicked
export const renderGenreClicked = (navigate, genreClicked, books, checked) => {
  if (genreClicked) {
    return books.map((book) => {
      return book.googleCategories.map((category) => {
        if (category === genreClicked) {
          return (
            <CardActionArea sx={{width: "125px", height: "auto"}} onClick={() => showBook(book, navigate)}>  
              <img src={book.image} alt="book cover"></img>
              {checked ? <div>
              <Typography>{book.title}</Typography>
              <Typography>{book.authors[0]}</Typography>
                </div> : ""}
            </CardActionArea>         
          )
        }
      })
    })
  }
};