import NavBar from "../NavBar";
import PublishYearInsights from "./PublishYearInsights";
import GenreInsights from "./GenreInsights";
import PagesReadInsights from "./PagesReadInsights";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLoginHook } from "../../hooks/useLoginHook";
import { useLoadBooksArray } from "../../hooks/useLoadBooksArray"
import { setLongestBook, setShortestBook, setSortedByYear } from "../../reducers/insightsSlice";
import { Typography, Grid, Card, Container, Button, Box } from "@mui/material";
import GeoInsights from "./GeoInsights";
import { styled } from "@mui/material/styles"
import { useGetBookQuery, useGetWishlistQuery } from "../../reducers/libraryApi";

//remember to map semantic headings for accessibility

const StyledCard = styled('div')({
  padding: "10px", 
  paddingBottom: "20px",
  height: 480, 
  width: 550,
  backgroundColor: "#f4f4f0",
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "space-between"
})



//remember to map semantic headings for accessibility



const Insights = () => {
  const usersBooks = useSelector(state => state.user.user.books)
  const usersWishlist = useSelector(state => state.user.user.wishlist)

  const { data: books, error, isLoading } = useGetBookQuery(usersBooks)
  const { data: wishlist } = useGetWishlistQuery(usersWishlist)
  

  
  // const library = useSelector(state => state.books);
  
  const [isDashboard, setIsDashboard] = useState(true);



  const { loggedIn, navigate, dispatch } = useLoginHook();

  console.log(books)

  const library = books

  // useLoadBooksArray();

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
  };

  const totalPages = library.reduce((accumulator, books) =>  accumulator + parseInt(books.pageCount), 0
  ).toLocaleString("en-US");


  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Typography align="center" variant="h2" sx={{padding: "30px"}}>You have read {library.length} books</Typography>
        <Container sx={{paddingBottom: "20px"}}>
        <Grid container spacing={1} >

          <Grid item xs={1} md={6} >
            <Card align="center" sx={{height: 480, width: 550,}}>
            <StyledCard>
              <Typography variant="h4" align="center">Pages Read</Typography>
              <Typography align="center" sx={{fontSize: "70px"}}>{totalPages} pages</Typography>
              <Button variant="contained" color="secondary" sx={{width: "90px", alignSelf: "center"}} onClick={() => navigate("pages", {state: totalPages})}>Details</Button>
              </StyledCard>
            </Card>
          </Grid>
          
          <Grid item xs={1} md={6}>
          <Card align="center" sx={{height: 480, width: 550, backgroundColor: "#f4f4f0", paddingTop: "10px", }}>
              <GenreInsights dashboard={isDashboard}/>
              <Button variant="contained" color="secondary" sx={{width: "90px", marginTop: "15px"}} onClick={() => {
                setIsDashboard(false)
                navigate("genre");
              }}>Details</Button>
            </Card>
          </Grid>

          <Grid item xs={1} md={6}>
          <Card align="center" sx={{height: 480, width: 550,}}>
            <StyledCard sx={{paddingRight: "70px"}}>
            <PublishYearInsights dashboard={isDashboard}/>
            <Button variant="contained" color="secondary" sx={{width: "90px", alignSelf: "center", marginLeft: "70px"}} onClick={() => {
                setIsDashboard(false);
                navigate("year")
              }}>Details</Button>
              </StyledCard>
            </Card>
          </Grid>
         
          <Grid item xs={1} md={6}>
          <Card align="center" sx={{height: 480, width: 550,}}>
            <StyledCard >
              <GeoInsights dashboard={isDashboard}/>
              <Button color="secondary" variant="contained" sx={{width: "90px", alignSelf: "center"}} onClick={() => {
                setIsDashboard(false)
                navigate("geo")
              }}>Details</Button>
              </StyledCard>
            </Card>
          </Grid>

         

        </Grid>
      </Container>

      </div>
    )
  }

}

export default Insights;