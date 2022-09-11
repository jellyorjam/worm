import NavBar from "./NavBar";
import { useLoginHook } from "../hooks/useLoginHook";
import { useSelector } from "react-redux";
import { Container, Skeleton } from "@mui/material";
import { useGetWishlistQuery } from "../reducers/libraryApi";
import ErrorPage from "./ErrorPage";
import YourBooks from "./YourBooks";

const Wishlist = () => {
 
  const books = useSelector(state => state.user.user.wishlist)
  const { loggedIn } = useLoginHook();
  const { data, error, isLoading } = useGetWishlistQuery(books);

  const renderYourBooks = () => {
    if (data) {
      return (
        <YourBooks data={data}/>
      )
    }
    if (isLoading) {
      return (<Skeleton variant="rectangular" height={300} width={200}></Skeleton>)
    }

    if (error) {
      return (<ErrorPage/>)
    }
  }

  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Container >
          {renderYourBooks()}
        </Container>
      </div>
    )
  }
}

export default Wishlist;