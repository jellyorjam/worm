import NavBar from "../NavBar";
import PublishYearInsights from "./PublishYearInsights";
import GenreInsights from "./GenreInsights";
import PagesReadInsights from "./PagesReadInsights";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLoginHook } from "../../hooks/useLoginHook";
import { useLoadBooksArray } from "../../hooks/useLoadBooksArray"
import { setLongestBook, setShortestBook, setSortedByYear } from "../../reducers/insightsSlice";
import { Typography, Grid, Card, Container, Button } from "@mui/material";

const Insights = () => {
  
  const library = useSelector(state => state.books);
  const [isDashboard, setIsDashboard] = useState(true)

  const { loggedIn, navigate, dispatch } = useLoginHook();
  useLoadBooksArray();

  // get this hook to work right 
 
  useEffect(() => {
    setIsDashboard(true)
  }, [])

  useEffect(() => {
    const bookWithMostPages = findLongestBook();
    const longestBook = bookWithMostPages[bookWithMostPages.length - 1];
    dispatch(setLongestBook(longestBook));

    const bookWithLeastPages = findShortestBook();
    const shortestBook = bookWithLeastPages[bookWithLeastPages.length - 1];
    dispatch(setShortestBook(shortestBook));

    const sortedByYear = organizeByYear();
    dispatch(setSortedByYear(sortedByYear));
  }, [])


  const findLongestBook = () => {
    let bookWithMostPages = {
      pageCount: 0
    }

    return library.map((book) => {
      if (book.pageCount > bookWithMostPages.pageCount) {
        bookWithMostPages = book
      }
      return bookWithMostPages
    })
  };

  const findShortestBook = () => {
    let bookWithLeastPages = {
      pageCount: 10000000000
    }

    return library.map((book) => {
      if (book.pageCount < bookWithLeastPages.pageCount) {
        bookWithLeastPages = book
      }
      return bookWithLeastPages
    })
  };

  const organizeByYear = () => {
    const sortLibrary = [...library];
    const filterLibrary = sortLibrary.filter((book) => {
      return book.firstPublishYear !== ""
    })
    const sortedArray = filterLibrary.sort((a, b) => parseInt(a.firstPublishYear) - parseInt(b.firstPublishYear));
    return sortedArray;
  }


  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Typography align="center" variant="h2" sx={{padding: "30px"}}>You have read {library.length} books</Typography>
        <Container sx={{paddingBottom: "20px"}}>
        <Grid container spacing={1} >
          <Grid item xs={1} md={6} >
            <Card sx={{height: 450, width: 550}}>
              <PagesReadInsights/>
            </Card>
          </Grid>
          <Grid item xs={1} md={6}>
          <Card sx={{height: 450, width: 550}}>
              <GenreInsights/>
            </Card>
          </Grid>
          <Grid item xs={1} md={6}>
          <Card sx={{height: 450, width: 550}}>
            <PublishYearInsights dashboard={isDashboard}/>
            <Button variant="contained" onClick={() => {
                setIsDashboard(false);
                navigate("year")
              }}>Details</Button>
            </Card>
          </Grid>
          <Grid item xs={1} md={6}>
          <Card sx={{height: 450, width: 550}}>
              <Button color="secondary" onClick={() => navigate("geo")}>Geo Insights</Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      </div>
    )
  }

}

export default Insights;